import { statistiqueService } from '../services/statistique.service.js';

export const statistiqueActions = {
  getStatsCra,
  getStatsAdmin,
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

  function request(dateDebut, dateFin) {
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

function getStatsAdmin() {
  return dispatch => {
    dispatch(request());

    statistiqueService.getStatsAdmin()
    .then(
      statsAdmin => {
        dispatch(success(statsAdmin));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_STATS_ADMIN_REQUEST' };
  }
  function success(statsAdmin) {
    return { type: 'GET_STATS_ADMIN_SUCCESS', statsAdmin };
  }
  function failure(error) {
    return { type: 'GET_STATS_ADMIN_FAILURE', error };
  }
}
