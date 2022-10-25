import { historiqueCras } from '../services/historiqueCras.service.js';

export const historiqueCrasActions = {
  getHistoriqueCrasListe,
  getHistoriqueCrasThematiques,
};

function getHistoriqueCrasListe(theme = null) {
  return dispatch => {
    dispatch(request());
    historiqueCras.getHistoriqueCrasListe(theme)
    .then(
      result => {
        dispatch(success(result.cras));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_HISTORIQUE_CRAS_LIST_REQUEST' };
  }
  function success(listeCras) {
    return { type: 'GET_HISTORIQUE_CRAS_LIST_SUCCESS', listeCras };
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
