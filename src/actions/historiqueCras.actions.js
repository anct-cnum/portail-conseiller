import { historiqueCras } from '../services/historiqueCras.service.js';

export const historiqueCrasActions = {
  getHistoriqueCrasListe,
  getHistoriqueCrasThematiques,
  changeDateCraDebut,
  changeDateCraFin,
  changeCraCodePostal
};

function getHistoriqueCrasListe(theme = null, canal = null, type = null, sort = null,
  dateDebutCra = null, dateFinCra = null, codePostal = null, ville = null, page) {
  return dispatch => {
    dispatch(request());
    historiqueCras.getHistoriqueCrasListe(theme, canal, type, sort, dateDebutCra, dateFinCra, codePostal, ville, page)
    .then(
      result => {
        dispatch(success(result.items));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_HISTORIQUE_CRAS_LIST_REQUEST' };
  }
  function success(items) {
    return { type: 'GET_HISTORIQUE_CRAS_LIST_SUCCESS', items };
  }
  function failure(error) {
    return { type: 'GET_HISTORIQUE_CRAS_LIST_FAILURE', error };
  }
}

function getHistoriqueCrasThematiques() {
  return dispatch => {
    dispatch(request());
    historiqueCras.getHistoriqueCrasThematiques()
    .then(
      result => {
        dispatch(success(result.themes));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_HISTORIQUE_CRAS_THEMES_REQUEST' };
  }
  function success(themes) {
    return { type: 'GET_HISTORIQUE_CRAS_THEMES_SUCCESS', themes };
  }
  function failure(error) {
    return { type: 'GET_HISTORIQUE_CRAS_THEMES_FAILURE', error };
  }
}

function changeDateCraDebut(dateDebut) {
  return { type: 'CHANGE_DATE_CRA_DEBUT', dateDebut };
}

function changeDateCraFin(dateFin) {
  return { type: 'CHANGE_DATE_CRA_FIN', dateFin };
}

function changeCraCodePostal(codePostal, ville, selected) {
  return { type: 'CHANGE_CODE_POSTAL_CRA', codePostal, ville, selected };

}
