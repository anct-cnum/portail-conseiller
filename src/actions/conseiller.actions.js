import { conseillerService } from '../services/conseiller.service.js';
import download from 'downloadjs';

export const conseillerActions = {
  get,
  getStatistiquesPDF
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

function getStatistiquesPDF(dates) {
  return dispatch => {
    dispatch(request({}));
    conseillerService.getStatistiquesPDF(dates)
    .then(
      data => {
        dispatch(success(data, download(data, 'Mes_statistiques' + dates.dateDebut + '_' + dates.dateFin + '.pdf')));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_STATS_PDF_REQUEST' };
  }
  function success(data, download) {
    return { type: 'GET_STATS_PDF_SUCCESS', data, download };
  }
  function failure(error) {
    return { type: 'GET_STATS_PDF_FAILURE', error };
  }
}
