import Joi from 'joi';
import download from 'downloadjs';
import { userService } from '../services/user.service';
import { candidatService } from '../services/candidat.service';
import { conseillerService } from '../services/conseiller.service';

export const candidatActions = {
  updateDisponibilite,
  updateDateDisponibilite,
  initForm,
  initBoolean,
  updateCPVille,
  updateDistance,
  verifyForm,
  updateCandidat,
  searchVilleCP,
  uploadCurriculumVitae,
  getCurriculumVitae,
  deleteCurriculumVitae,
  resetCVFile,
};

function updateDisponibilite(idConseiller, disponible) {

  return dispatch => {
    dispatch(request());
    conseillerService.updateDisponibilite(idConseiller, disponible)
    .then(
      result => {
        dispatch(success(result.disponible));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
  function request() {
    return { type: 'POST_DISPONIBILITE_REQUEST' };
  }
  function success(disponible) {
    return { type: 'POST_DISPONIBILITE_SUCCESS', disponible };
  }
  function failure(error) {
    return { type: 'POST_DISPONIBILITE_FAILURE', error };
  }
}

function updateDateDisponibilite(idConseiller, dateDisponibilite) {

  return dispatch => {
    dispatch(request());
    conseillerService.updateDateDisponibilite(idConseiller, dateDisponibilite)
    .then(
      result => {
        dispatch(success(result.dateDisponibilite));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
  function request() {
    return { type: 'POST_DATE_DISPONIBILITE_REQUEST' };
  }
  function success(dateDisponibilite) {
    return { type: 'POST_DATE_DISPONIBILITE_SUCCESS', dateDisponibilite };
  }
  function failure(error) {
    return { type: 'POST_DATE_DISPONIBILITE_FAILURE', error };
  }
}

function initForm(conseiller) {
  return { type: 'INIT_FORM', conseiller };
}

function initBoolean() {
  return { type: 'INIT_BOOLEAN' };
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
      'Un code postal et une commune valides doivent obligatoirement être selectionnés dans la liste' : null
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

function uploadCurriculumVitae(fileCV) {
  return dispatch => {
    dispatch(request());
    candidatService.uploadCurriculumVitae(fileCV)
    .then(
      data => dispatch(success(data.isUploaded)),
      error => dispatch(failure(error))
    );
  };

  function request() {
    return { type: 'POST_CURRICULUM_VITAE_REQUEST' };
  }
  function success(isUploaded) {
    return { type: 'POST_CURRICULUM_VITAE_SUCCESS', isUploaded };
  }
  function failure(error) {
    return { type: 'POST_CURRICULUM_VITAE_FAILURE', error };
  }
}

function getCurriculumVitae(id, candidat) {
  return dispatch => {
    dispatch(request());

    candidatService.getCurriculumVitae(id)
    .then(
      data => dispatch(success(data, download(data, candidat?.nom + '_' + candidat?.prenom + '.' + candidat?.cv?.extension))),
      error => dispatch(failure(error))
    );
  };

  function request() {
    return { type: 'GET_CURRICULUM_VITAE_REQUEST' };
  }
  function success(data, download) {
    return { type: 'GET_CURRICULUM_VITAE_SUCCESS', data, download };
  }
  function failure(error) {
    return { type: 'GET_CURRICULUM_VITAE_FAILURE', error };
  }
}

function deleteCurriculumVitae(id) {
  return dispatch => {
    dispatch(request());

    candidatService.deleteCurriculumVitae(id)
    .then(
      data => dispatch(success(data?.deleteSuccess)),
      error => dispatch(failure(error))
    );
  };

  function request() {
    return { type: 'DELETE_CURRICULUM_VITAE_REQUEST' };
  }
  function success(data) {
    return { type: 'DELETE_CURRICULUM_VITAE_SUCCESS', data };
  }
  function failure(error) {
    return { type: 'DELETE_CURRICULUM_VITAE_FAILURE', error };
  }
}

function resetCVFile() {
  return { type: 'RESET_FILE' };
}
