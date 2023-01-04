import Joi from 'joi';
import { userService } from '../services/user.service';
import { mesInformationsService } from '../services/mesInformations.service';

export const mesInformationsActions = {
  verifyFormulaire,
  getContratActif,
  updateField,
  updateContratActif,
  getInformationsManquantes,
  getPlusTard,
};

function verifyFormulaire(form) {
  let errors = [];
  // eslint-disable-next-line max-len
  let { typeContrat, dateDebut, dateFin } = form;

  errors.push({
    typeContrat: (Joi.object({
      typeContrat: Joi.string().trim().required()
    }).validate({ typeContrat: typeContrat }).error) ?
      'Un type de contrat doit obligatoirement être saisi' : null
  });

  errors.push({
    dateDebut: (Joi.object({
      dateDebut: Joi.date().required()
    }).validate({ dateDebut: dateDebut }).error) ?
      'Une date de début de contrat doit obligatoirement être saisi' : null
  });

  if (typeContrat !== 'CDI') {
    errors.push({
      dateFin: (Joi.object({
        dateFin: Joi.date().required()
      }).validate({ dateFin: dateFin }).error) ?
        'Une date de fin de contrat doit obligatoirement être saisi' : null
    });
  }

  let nbErrors = 0;
  errors.forEach(error => {
    if (error[Object.keys(error)[0]]) {
      nbErrors++;
    }
  });

  const errorsForm = { errors: errors, lengthError: nbErrors };

  return { type: 'VERIFY_FORMULAIRE', errorsForm };
}

function updateField(name, value) {
  return { type: 'UPDATE_' + name?.toUpperCase(), value };
}

function getContratActif(contrats) {
  let contratActif = null;
  if (contrats) {
    for (let contrat of contrats) {
      if (contrat.typeContrat === 'CDI') {
        contratActif = contrat;
      } else if (new Date(contrat.dateDebut) <= new Date() && new Date(contrat.dateFin) >= new Date()) {
        contratActif = contrat;
      }
    }
  }
  return { type: 'INIT_MES_INFORMATIONS', contratActif };
}

function updateContratActif(contratActif, conseillerId, username, password) {
  return dispatch => {
    dispatch(request());
    userService.login(username, password).then(
      () => {
        mesInformationsService.updateContratActif(contratActif, conseillerId)
        .then(
          result => {
            dispatch(success(result.success));
          },
          error => {
            dispatch(failure(error));
          }
        );
      },
      error => {
        dispatch(failure(error.error));
        history.push('/login');
      }
    );
  };
  function request() {
    return { type: 'POST_CONTRAT_ACTIF_REQUEST' };
  }
  function success(success) {
    return { type: 'POST_CONTRAT_ACTIF_SUCCESS', success };
  }
  function failure(error) {
    return { type: 'POST_CONTRAT_ACTIF_FAILURE', error };
  }
}

function getInformationsManquantes(conseiller) {
  const informationsManquantes = [];
  if (conseiller?.contrats) {
    let boolInfoManquante = true;
    for (let contrat of conseiller?.contrats) {
      if (contrat.typeContrat === 'CDI') {
        boolInfoManquante = false;
      } else if (new Date(contrat.dateDebut) <= new Date() && new Date(contrat.dateFin) >= new Date()) {
        boolInfoManquante = false;
      }
    }
    if (boolInfoManquante) {
      informationsManquantes.push('Mon contrat de travail');
    }
  } else {
    informationsManquantes.push('Mon contrat de travail');
  }
  if (!conseiller?.supHierarchique) {
    informationsManquantes.push('Contact de mon responsable');
  }
  return { type: 'GET_INFORMATIONS_MANQUANTES', informationsManquantes };
}

function getPlusTard() {
  localStorage.setItem('plusTard', true);
  return { type: 'GET_PLUS_TARD' };
}
