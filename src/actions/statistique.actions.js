import { statistiqueService } from '../services/statistique.service.js';
import dayjs from 'dayjs';

export const statistiqueActions = {
  getStatsCra,
  getStatsAdmin,
  changeDateStatsDebut,
  changeDateStatsFin,
  getTerritoire,
  getStatsTerritoires,
  getStatsCraTerritoire,
  getStatsCraNationale,
  exportDonneesTerritoire,
  resetExportDonneesTerritoire,
};

const formatDate = date => {
  return dayjs(date).format('YYYY-MM-DD');
};

function getStatsCra(dateDebut, dateFin, idUser = null) {
  return dispatch => {
    dispatch(request(dateDebut, dateFin, idUser));

    statistiqueService.getStatsCra(formatDate(dateDebut), formatDate(dateFin), idUser)
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

function getStatsTerritoires(territoire = 'departement', dateDebut, dateFin, page, nomOrdre = 'code', ordre = 1) {
  return dispatch => {
    dispatch(request());
    statistiqueService.getStatsTerritoires(territoire, formatDate(dateDebut), formatDate(dateFin), page, nomOrdre, ordre)
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

function getTerritoire(typeTerritoire, idTerritoire, date) {
  return dispatch => {
    dispatch(request());

    statistiqueService.getTerritoire(typeTerritoire, idTerritoire, date)
    .then(
      territoire => dispatch(success(territoire)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_TERRITOIRE_REQUEST' };
  }
  function success(territoire) {
    return { type: 'GET_TERRITOIRE_SUCCESS', territoire };
  }
  function failure(error) {
    return { type: 'GET_TERRITOIRE_FAILURE', error };
  }
}

function getStatsCraTerritoire(dateDebutStats, dateFinStats, typeTerritoire, conseillerIds) {
  return dispatch => {
    dispatch(request());

    statistiqueService.getStatsCraTerritoire(formatDate(dateDebutStats), formatDate(dateFinStats), typeTerritoire, conseillerIds)
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

function getStatsCraNationale(dateDebutStats, dateFinStats) {
  return dispatch => {
    dispatch(request());

    statistiqueService.getStatsCraNationale(formatDate(dateDebutStats), formatDate(dateFinStats))
    .then(
      statsNationales => {
        dispatch(success(statsNationales));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_STATS_CRA_NATIONALES_REQUEST' };
  }
  function success(statsNationales) {
    return { type: 'GET_STATS_CRA_NATIONALES_SUCCESS', statsNationales };
  }
  function failure(error) {
    return { type: 'GET_STATS_CRA_NATIONALES_FAILURE', error };
  }
}

function exportDonneesTerritoire(territoire = 'departement', dateDebut, dateFin, nomOrdre = 'code', ordre = 1) {
  return async dispatch => {
    dispatch(request());

    await statistiqueService.getExportDonneesTerritoire(territoire, formatDate(dateDebut), formatDate(dateFin), nomOrdre, ordre)
    .then(exportTerritoireFileBlob => dispatch(success(exportTerritoireFileBlob)))
    .catch(exportTerritoireFileError => dispatch(failure(exportTerritoireFileError)));
  };

  function request() {
    return { type: 'GET_EXPORT_TERRITOIRE_REQUEST' };
  }
  function success(exportTerritoireFileBlob) {
    return { type: 'GET_EXPORT_TERRITOIRE_SUCCESS', exportTerritoireFileBlob };
  }
  function failure(exportTerritoireFileError) {
    return { type: 'GET_EXPORT_TERRITOIRE_FAILURE', exportTerritoireFileError };
  }
}

function resetExportDonneesTerritoire() {
  return { type: 'EXPORT_TERRITOIRE_RESET' };
}
