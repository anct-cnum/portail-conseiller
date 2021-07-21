import { conseillerService } from '../services/conseiller.service.js';

export const conseillerActions = {
  get,
  getPDF
};

function get(id) {
  return dispatch => {
    dispatch(request());

    conseillerService.get(id)
    .then(
      conseiller => dispatch(success(conseiller)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_CONSEILLER_REQUEST' };
  }
  function success(conseiller) {
    return { type: 'GET_CONSEILLER_SUCCESS', conseiller };
  }
  function failure(error) {
    return { type: 'GET_CONSEILLER_FAILURE', error };
  }
}

function getPDF() {
  return dispatch => {
    dispatch(request({}));
    conseillerService.getStatistiquesPDF()
    .then(
      pdf => {
        dispatch(success(pdf));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_STATS_PDF_REQUEST' };
  }
  function success(pdf) {
    return { type: 'GET_STATS_PDF_SUCCESS', pdf };
  }
  function failure(error) {
    return { type: 'GET_STATS_PDF_FAILURE', error };
  }
}
