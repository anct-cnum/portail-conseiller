import { statistiqueService } from '../services/statistique.service.js';
import dayjs from 'dayjs';

export const statistiqueActions = {
  getStatsCra,
  getStatsAdmin,
  changeDateStatsDebut,
  changeDateStatsFin,
  changeCodePostalStats,
  getTerritoire,
  getStatsTerritoires,
  getStatsCraTerritoire,
  getStatsCraNationale,
  exportDonneesTerritoire,
  resetExportDonneesTerritoire,
  getCodesPostauxCrasConseiller,
  updateListeAutresReorientations,
  getStatsCraStructure,
  getCodesPostauxCrasConseillerStructure
};

const formatDate = date => {
  return dayjs(date).format('YYYY-MM-DD');
};

function getStatsCra(dateDebut, dateFin, idUser = null, codePostal = null, ville = null, codeCommune = null) {
  return dispatch => {
    dispatch(request(dateDebut, dateFin, idUser, codePostal));

    statistiqueService.getStatsCra(formatDate(dateDebut), formatDate(dateFin), idUser, codePostal, ville, codeCommune)
    .then(
      statsCra => {
        dispatch(success(statsCra));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request(dateDebut, dateFin, idUser, codePostal) {
    return { type: 'GET_STATS_CRA_REQUEST', dateDebut, dateFin, idUser, codePostal };
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

function changeCodePostalStats(codePostal, ville, codeCommune) {
  return { type: 'CHANGE_CODE_POSTAL_STATS', codePostal, ville, codeCommune };
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

function getStatsCraStructure(dateDebut, dateFin, idStructure, codePostal = null) {
  return dispatch => {
    dispatch(request());
    statistiqueService.getStatsCraStructure(formatDate(dateDebut), formatDate(dateFin), idStructure, codePostal)
    .then(
      statsStructure => {
        dispatch(success(statsStructure));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_STATS_CRA_STRUCTURE_REQUEST' };
  }
  function success(statsStructure) {
    return { type: 'GET_STATS_CRA_STRUCTURE_SUCCESS', statsStructure };
  }
  function failure(error) {
    return { type: 'GET_STATS_CRA_STRUCTURE_FAILURE', error };
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

function getCodesPostauxCrasConseiller() {

  return dispatch => {
    dispatch(request());

    statistiqueService.getCodesPostauxCrasConseiller()
    .then(
      listeCodesPostaux => {
        dispatch(success(listeCodesPostaux));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_CODES_POSTAUX_CRA_REQUEST' };
  }
  function success(listeCodesPostaux) {
    return { type: 'GET_CODES_POSTAUX_CRA_SUCCESS', listeCodesPostaux };
  }
  function failure(error) {
    return { type: 'GET_CODES_POSTAUX_CRA_FAILURE', error };
  }
}

function getCodesPostauxCrasConseillerStructure(idStructure) {

  return dispatch => {
    dispatch(request());

    statistiqueService.getCodesPostauxCrasConseillerStructure(idStructure)
    .then(
      listeCodesPostaux => {
        dispatch(success(listeCodesPostaux));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_CODES_POSTAUX_CRA_REQUEST' };
  }
  function success(listeCodesPostaux) {
    return { type: 'GET_CODES_POSTAUX_CRA_SUCCESS', listeCodesPostaux };
  }
  function failure(error) {
    return { type: 'GET_CODES_POSTAUX_CRA_FAILURE', error };
  }
}

function updateListeAutresReorientations(listeAutresReorientations) {
  return { type: 'UPDATE_AUTRES_REORIENTATIONS', listeAutresReorientations };
}
