import { statistiqueService } from '../services/statistique.service.js';

export const statistiqueActions = {
  getStatsCra,
  getStatsAdmin,
  changeDateStatsDebut,
  changeDateStatsFin,
  getStatsTerritoires,
};

function getStatsCra(dateDebut, dateFin, idUser = null) {
  return dispatch => {
    dispatch(request(dateDebut, dateFin, idUser));

    statistiqueService.getStatsCra(dateDebut, dateFin, idUser)
    .then(
      statsCra => {
        dispatch(success(statsCra));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request(dateDebut, dateFin, idUser) {
    return { type: 'GET_STATS_CRA_REQUEST', dateDebut, dateFin, idUser };
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

function getStatsTerritoires(territoire = 'departement', dateDebut, dateFin, page) {
  return dispatch => {
    dispatch(request(territoire, dateDebut, dateFin, page));

    statistiqueService.getStatsTerritoires(territoire, dateDebut, dateFin, page)
    .then(
      statsTerritoires => {
        dispatch(success(statsTerritoires));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request(territoire, dateDebut, dateFin, page) {
    return { type: 'GET_STATS_CRA_REQUEST', territoire, dateDebut, dateFin, page };
  }
  function success(statsTerritoires) {
    return { type: 'GET_STATS_CRA_SUCCESS', statsTerritoires };
  }
  function failure(error) {
    return { type: 'GET_STATS_CRA_FAILURE', error };
  }
}
