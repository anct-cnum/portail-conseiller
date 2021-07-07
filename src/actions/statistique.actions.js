import { statistiqueService } from '../services/statistique.service.js';

export const statistiqueActions = {
  getStatsCra,
  changeDateStatsDebut,
  changeDateStatsFin,
};

function getStatsCra(dateDebut, dateFin) {
  return dispatch => {
    dispatch(request(dateDebut, dateFin));

    statistiqueService.getStatsCra(dateDebut, dateFin)
    .then(
      statsCra => {
        dispatch(success(statsCra));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_STATS_CRA_REQUEST', dateDebut, dateFin };
  }
  function success(statsCra) {
    return { type: 'GET_STATS_CRA_SUCCESS', statsCra };
  }
  function failure(error) {
    return { type: 'GET_STATS_CRA_FAILURE', error };
  }
}

function changeDateStatsDebut(dateDebut) {
  return { type: 'CHANGE_DATE_DEBUT_STATS', dateDebut };
}

function changeDateStatsFin(dateFin) {
  return { type: 'CHANGE_DATE_FIN_STATS', dateFin };
}
