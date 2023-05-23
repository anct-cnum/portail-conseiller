import Joi from 'joi';
import { userService } from '../services/user.service';
import { candidatService } from '../services/candidat.service';

export const candidatActions = {
  initForm,
  updateCPVille,
  updateDistance,
  verifyForm,
  updateCandidat,
  searchVilleCP,
};

function initForm(conseiller) {
  return { type: 'INIT_FORM', conseiller };
}

function updateCPVille(cpVille, ville, codeCommune, codePostal, location) {
  return { type: 'UPDATE_CP_VILLE', cpVille, ville, codeCommune, codePostal, location };
}

function updateDistance(distance) {
  return { type: 'UPDATE_DISTANCE', distance };
}

function verifyForm(form) {
  let errors = [];

  errors.push({
    cpVille: (Joi.object({
      cpVille: Joi.string().trim().required().min(8).max(65)
    }).validate({ cpVille: form?.cpVille }).error) ?
      'Une ville et un code postal valide doivent obligatoirement être saisis' : null
  });
  errors.push({
    ville: (Joi.object({
      ville: Joi.string().trim().required().min(2).max(59)
    }).validate({ ville: form?.ville }).error) ?
      'Une ville valide doit obligatoirement être saisie' : null
  });
  errors.push({
    codeCommune: (Joi.object({
      codeCommune: Joi.string().trim().required().min(4).max(5)
    }).validate({ codeCommune: form?.codeCommune }).error) ?
      'Un code postal valide doit obligatoirement être saisi' : null
  });
  errors.push({
    codePostal: (Joi.object({
      codePostal: Joi.string().trim().required().min(5).max(5)
    }).validate({ codePostal: form?.codePostal }).error) ?
      'Un code postal valide doit obligatoirement être saisi' : null
  });
  errors.push({
    location: (Joi.object({
      location: Joi.object().required()
    }).validate({ location: form?.location }).error) ?
      'Une localisation valide doit obligatoirement être saisi' : null
  });
  errors.push({
    distance: (Joi.object({
      distance: Joi.string().trim().required().allow(5, 10, 15, 20, 40, 100, 2000)
    }).validate({ distance: form?.distance }).error) ?
      'Une distance valide doit obligatoirement être cochée' : null
  });

  let nbErrors = 0;
  errors.forEach(error => {
    if (error[Object.keys(error)[0]]) {
      nbErrors++;
    }
  });

  const errorsForm = { errors: errors, lengthError: nbErrors };
  return { type: 'VERIFY_FORM', errorsForm };
}

function updateCandidat(form, conseillerId, username, password) {

  return dispatch => {
    dispatch(request());
    userService.login(username, password).then(
      () => {
        candidatService.updateCandidat(form, conseillerId)
        .then(
          result => {
            dispatch(success());
            dispatch(successConseiller(result.conseiller));
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
    return { type: 'POST_CANDIDAT_REQUEST' };
  }
  function success() {
    return { type: 'POST_CANDIDAT_SUCCESS' };
  }
  function successConseiller(conseiller) {
    return { type: 'GET_CONSEILLER_SUCCESS', conseiller };
  }
  function failure(error) {
    return { type: 'POST_CANDIDAT_FAILURE', error };
  }
}

function searchVilleCP(adresse) {
  return dispatch => {
    dispatch(request());
    candidatService.searchVilleCP(adresse.trim())
    .then(
      result => {
        dispatch(success(result.adresseApi));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_ADRESSE_REQUEST' };
  }
  function success(adresses) {
    return { type: 'GET_ADRESSE_SUCCESS', adresses };
  }
  function failure(error) {
    return { type: 'GET_ADRESSE_FAILURE', error };
  }
}
