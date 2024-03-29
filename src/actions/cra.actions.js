import Joi from 'joi';
import { craService } from '../services/cra.service.js';

export const craActions = {
  getButtonPermanences,
  getPermanence,
  getButtonCP,
  getSearchlist,
  searchInput,
  updateCP,
  updateCodeCommune,
  updateCanal,
  deleteCanalValue,
  clearCanal,
  updateActivite,
  updateNbParticipants,
  updateRecurrence,
  updateAge,
  updateStatut,
  updateThemes,
  updateMultipleThemes,
  updateDuree,
  updateAccompagnement,
  updateOrganisme,
  updateOrganismes,
  deleteOrganisme,
  initNbOrganisme,
  verifyCra,
  submitCra,
  changeDate,
  datePickerStatus,
  showSelectRedirection,
  getCra,
  updateCra,
  deleteCra,
  countByPermanence,
  searchSuggestion,
  clearListeSousThemes,
  verifySuggestion,
};

function getButtonPermanences() {
  return { type: 'GET_BUTTON_PERMANENCES' };
}
function getPermanence(permanence) {
  return { type: 'GET_PERMANENCE', permanence };
}
function getButtonCP() {
  return { type: 'GET_BUTTON_CP' };
}
function getSearchlist() {
  return { type: 'GET_SEARCH_LIST' };
}

function searchInput(search) {
  return { type: 'SEARCH_INPUT', search };
}

function updateCP(cp) {
  return { type: 'UPDATE_CP', cp };
}
function updateCodeCommune(codeCommune) {
  return { type: 'UPDATE_CODE_COMMUNE', codeCommune };
}

function updateCanal(canal) {
  return { type: 'UPDATE_CANAL', canal };
}
function deleteCanalValue() {
  return { type: 'DELETE_CANAL_VALUE' };
}
function clearCanal() {
  return { type: 'CLEAR_CANAL' };
}
function updateActivite(activite) {
  return { type: 'UPDATE_ACTIVITE', activite };
}

function updateNbParticipants(nbParticipants) {
  return { type: 'UPDATE_NB_PARTICIPANTS', nbParticipants };
}

function updateRecurrence(nbParticipantsRecurrents) {
  return { type: 'UPDATE_NB_RECURRENCE', nbParticipantsRecurrents };
}
function updateAge(age, nbParticipantsAge) {
  return { type: 'UPDATE_AGE', data: { age, nbParticipantsAge } };
}

function updateStatut(statut, nbParticipantsStatut) {
  return { type: 'UPDATE_STATUT', data: { statut, nbParticipantsStatut } };
}

function updateThemes(themes) {
  return { type: 'UPDATE_THEMES', themes };
}

function updateMultipleThemes(sousThemesList) {
  return { type: 'UPDATE_MULTIPLE_THEMES', sousThemesList };
}

function updateDuree(duree) {
  return { type: 'UPDATE_DUREE', duree };
}

function updateAccompagnement(nbAccompagnementIndividuel, nbAccompagnementAtelier, nbAccompagnementRedirection, nbOrganisme) {
  return { type: 'UPDATE_ACCOMPAGNEMENT', nbAccompagnementIndividuel, nbAccompagnementAtelier, nbAccompagnementRedirection, nbOrganisme };
}

function updateOrganisme(organisme) {
  return { type: 'UPDATE_ORGANISME', organisme };
}

function updateOrganismes(organismes) {
  return { type: 'UPDATE_ORGANISMES', organismes };
}

function deleteOrganisme(organisme) {
  return { type: 'DELETE_ORGANISME', organisme };
}

function initNbOrganisme() {
  return { type: 'INIT_NB_ORGANISME' };
}
function changeDate(date) {
  return { type: 'UPDATE_DATE', date };
}

function datePickerStatus(status) {
  return { type: 'UPDATE_DATEPICKER_STATUS', status };
}

function verifyCra(errors) {
  let hasErrors = false;
  errors.forEach(error => {
    if (error === true) {
      hasErrors = true;
    }
  });
  return { type: 'VERIFY_CRA', hasErrors };
}

function submitCra(cra) {
  return dispatch => {
    dispatch(request(cra));

    craService.createCra(cra)
    .then(
      cra => {
        dispatch(success(cra));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request(cra) {
    return { type: 'SUBMIT_CRA_REQUEST', cra };
  }
  function success(cra) {
    return { type: 'SUBMIT_CRA_SUCCESS', cra };
  }
  function failure(error) {
    return { type: 'SUBMIT_CRA_FAILURE', error };
  }
}

function showSelectRedirection(show) {
  return { type: 'SHOW_SELECT_REDIRECTION', show };
}

function getCra(id) {
  return dispatch => {
    dispatch(request());

    craService.getCra(id)
    .then(
      result => {
        dispatch(success(result.cra));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_CRA_REQUEST' };
  }
  function success(cra) {
    return { type: 'GET_CRA_SUCCESS', cra };
  }
  function failure(error) {
    return { type: 'GET_CRA_FAILURE', error };
  }
}

function updateCra(cra, conseillerId) {
  return dispatch => {
    dispatch(request(cra));

    craService.updateCra(cra, conseillerId)
    .then(
      cra => {
        dispatch(success(cra));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request(cra) {
    return { type: 'SET_CRA_REQUEST', cra };
  }
  function success(cra) {
    return { type: 'SET_CRA_SUCCESS', cra };
  }
  function failure(error) {
    return { type: 'SET_CRA_FAILURE', error };
  }
}

function deleteCra(craId) {
  return dispatch => {
    dispatch(request());

    craService.deleteCra(craId)
    .then(
      isDeleted => {
        dispatch(success(isDeleted));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'DELETE_CRA_REQUEST' };
  }
  function success(isDeleted) {
    return { type: 'DELETE_CRA_SUCCESS', isDeleted };
  }
  function failure(error) {
    return { type: 'DELETE_CRA_FAILURE', error };
  }
}

function countByPermanence(permanenceId) {
  return dispatch => {
    dispatch(request());

    craService.countByPermanence(permanenceId)
    .then(
      result => {
        dispatch(success(result));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'COUNT_CRA_PERMANENCE_REQUEST' };
  }
  function success(count) {
    return { type: 'COUNT_CRA_PERMANENCE_SUCCESS', count };
  }
  function failure(error) {
    return { type: 'COUNT_CRA_PERMANENCE_FAILURE', error };
  }
}

function searchSuggestion(sousTheme) {
  return dispatch => {
    dispatch(request(sousTheme));
    craService.searchSuggestion(sousTheme)
    .then(
      result => {
        dispatch(success(result.sousThemes));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'SEARCH_SOUS_THEMES_CRA_REQUEST' };
  }
  function success(sousThemes) {
    return { type: 'SEARCH_SOUS_THEMES_CRA_SUCCESS', sousThemes };
  }
  function failure(error) {
    return { type: 'SEARCH_SOUS_THEMES_CRA_FAILURE', error };
  }
}

function clearListeSousThemes() {
  return { type: 'CLEAR_SOUS_THEMES' };
}

function verifySuggestion(suggestion) {
  const error = {
    sousTheme: (Joi.object({
      sousTheme: Joi.string().min(3).max(35)
    }).validate({ sousTheme: suggestion }).error) ?
      'La proposition de sous-thème doit comporter entre 3 et 35 caractères' : null
  };
  return { type: 'VERIFY_SOUS_THEMES', error };
}

