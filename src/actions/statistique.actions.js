import { statistiqueService } from '../services/statistique.service.js';

export const statistiqueActions = {
  getStatsCra,
  getStatsAdmin,
  changeDateStatsDebut,
  changeDateStatsFin,
  getStatsTerritoires,
  getStatsCraTerritoire,
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

function getStatsTerritoires(territoire = 'departement', dateDebut, dateFin, page, nomOrdre = null, ordre = -1) {
  return dispatch => {
    dispatch(request());

    statistiqueService.getStatsTerritoires(territoire, dateDebut, dateFin, page, nomOrdre, ordre)
    .then(
      statsTerritoires => {
        dispatch(success(statsTerritoires));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_STATS_TERRITOIRES_REQUEST' };
  }
  function success(statsTerritoires) {
    return { type: 'GET_STATS_TERRITOIRES_SUCCESS', statsTerritoires };
  }
  function failure(error) {
    return { type: 'GET_STATS_TERRITOIRES_FAILURE', error };
  }
}

function getStatsCraTerritoire(dateDebutStats, dateFinStats, typeTerritoire, conseillerIds) {
  return dispatch => {
    dispatch(request());

    statistiqueService.getStatsCraTerritoire(dateDebutStats, dateFinStats, typeTerritoire, conseillerIds)
    .then(
      statsTerritoire => {
        dispatch(success(statsTerritoire));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_STATS_CRA_TERRITOIRE_REQUEST' };
  }
  function success(statsTerritoire) {
    return { type: 'GET_STATS_CRA_TERRITOIRE_SUCCESS', statsTerritoire };
  }
  function failure(error) {
    return { type: 'GET_STATS_CRA_TERRITOIRE_FAILURE', error };
  }
}
