import { craService } from '../services/cra.service.js';
import { history } from '../helpers';

export const craActions = {
  getSearchlist,
  searchInput,
  updateCP,
  updateCanal,
  updateActivite,
  updateNbParticipants,
  updateRecurrence,
  updateAge,
  updateStatut,
  updateThemes,
  updateDuree,
  updateAccompagnement,
  updateOrganisme,
  verifyCra,
  submitCra,
  changeDate,
  datePickerStatus,
  showSelectRedirection,
};

function getSearchlist() {
  return { type: 'GET_SEARCH_LIST' };
}

function searchInput(search) {
  return { type: 'SEARCH_INPUT', search };
}

function updateCP(cp) {
  return { type: 'UPDATE_CP', cp };
}

function updateCanal(canal) {
  return { type: 'UPDATE_CANAL', canal };
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

function updateDuree(duree) {
  return { type: 'UPDATE_DUREE', duree };
}

function updateAccompagnement(accompagnement, nbParticipantsAccompagnement) {
  return { type: 'UPDATE_ACCOMPAGNEMENT', accompagnement, nbParticipantsAccompagnement };
}
function updateOrganisme(organisme) {
  return { type: 'UPDATE_ORGAMNISME', organisme };
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
        history.push({
          pathname: '/compte-rendu-activite',
          printFlashbag: true
        });

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
