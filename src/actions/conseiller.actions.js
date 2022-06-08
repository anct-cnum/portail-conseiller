import { conseillerService } from '../services/conseiller.service.js';
import download from 'downloadjs';
import { history } from '../helpers';
import dayjs from 'dayjs';

export const conseillerActions = {
  get,
  getAll,
  getStatistiquesPDF,
  getStatistiquesAdminCoopPDF,
  getStatistiquesCSV,
  getStatistiquesAdminCoopCSV,
  getStatistiquesHubCSV,
  resetStatistiquesPDFFile,
  exportDonneesCnfs,
  resetExportDonneesCnfs,
  isFormulaireChecked,
  closeFormulaire,
  isUserActif
};

const formatDate = date => dayjs(date).format('DD-MM-YYYY');

const statistiquesCnfsFileName = (dateDebut, dateFin) =>
  `Mes_statistiques_${formatDate(dateDebut)}_${formatDate(dateFin)}`;

const removeCodePrefix = type =>
  type.startsWith('code') ? type.substring('code'.length) : type;

const statistiquesAdminFileName = (dateDebut, dateFin, type, idType, codePostal) =>
  // eslint-disable-next-line max-len
  `Statistiques_${removeCodePrefix(type)}${codePostal ? `_${codePostal}` : ''}${idType ? `_${idType}` : ''}_${formatDate(dateDebut)}_${formatDate(dateFin)}`;

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

function getAll(page, dateDebut, dateFin, filtreProfil, filtreCertifie, filtreGroupeCRA, filtreParNom, nomOrdre = 'prenom', ordre = 1, filtreParStructureId) {
  return dispatch => {
    dispatch(request());
    let promises = [];
    // eslint-disable-next-line max-len
    let promise = conseillerService.getAll(page, dateDebut, dateFin, filtreProfil, filtreCertifie, filtreGroupeCRA, filtreParNom, nomOrdre, ordre, filtreParStructureId);
    promises.push(promise);

    let conseillers = null;
    Promise.all(promises).then(items => {
      conseillers = items[0];
      if (items.length > 1) {
        conseillers.data = [...items[0].data];
      }
      dispatch(success(conseillers));
    }).catch(error => {
      dispatch(failure(error));
    });
  };

  function request() {
    return { type: 'GETALL_REQUEST' };
  }
  function success(conseillers) {
    return { type: 'GETALL_SUCCESS', conseillers };
  }
  function failure(error) {
    return { type: 'GETALL_FAILURE', error };
  }
}

function getStatistiquesPDF(idConseiller, dateDebut, dateFin, codePostal) {
  return dispatch => {
    dispatch(request());
    conseillerService.getStatistiquesPDF(idConseiller, dateDebut, dateFin, codePostal)
    .then(
      data => {
        dispatch(success(data, download(data, `${statistiquesCnfsFileName(dateDebut, dateFin)}.pdf`)));
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

function getStatistiquesAdminCoopPDF(dateDebut, dateFin, type, idType, codePostal) {
  return dispatch => {
    dispatch(request());
    conseillerService.getStatistiquesAdminCoopPDF(dateDebut, dateFin, type, idType, codePostal)
    .then(
      data => dispatch(success(data, download(data, `${statistiquesAdminFileName(dateDebut, dateFin, type, codePostal)}.pdf`))),
      error => dispatch(failure(error))
    );
  };

  function request() {
    return { type: 'GET_STATS_ADMINCOOP_PDF_REQUEST' };
  }
  function success(data, download) {
    return { type: 'GET_STATS_ADMINCOOP_PDF_SUCCESS', data, download };
  }
  function failure(error) {

    return { type: 'GET_STATS_ADMINCOOP_PDF_FAILURE', error };
  }
}

function getStatistiquesCSV(dateDebut, dateFin, codePostal) {
  return dispatch => {
    dispatch(request());
    conseillerService.getStatistiquesCSV(dateDebut, dateFin, codePostal)
    .then(
      data => dispatch(success(data, download(data, `${statistiquesCnfsFileName(dateDebut, dateFin)}.csv`))),
      error => dispatch(failure(error))
    );
  };

  function request() {
    return { type: 'GET_STATS_CSV_REQUEST' };
  }
  function success(data, download) {
    return { type: 'GET_STATS_CSV_SUCCESS', data, download };
  }
  function failure(error) {
    return { type: 'GET_STATS_CSV_FAILURE', error };
  }
}

function getStatistiquesAdminCoopCSV(dateDebut, dateFin, type, idType, conseillerIds, codePostal) {
  return dispatch => {
    dispatch(request());
    conseillerService.getStatistiquesAdminCoopCSV(dateDebut, dateFin, type, idType, conseillerIds, codePostal)
    .then(
      data => dispatch(success(data, download(data, `${statistiquesAdminFileName(dateDebut, dateFin, type, idType, codePostal)}.csv`))),
      error => dispatch(failure(error))
    );
  };

  function request() {
    return { type: 'GET_STATS_ADMINCOOP_CSV_REQUEST' };
  }
  function success(data, download) {
    return { type: 'GET_STATS_ADMINCOOP_CSV_SUCCESS', data, download };
  }
  function failure(error) {
    return { type: 'GET_STATS_ADMINCOOP_CSV_FAILURE', error };
  }
}

function getStatistiquesHubCSV(hub) {
  return dispatch => {
    dispatch(request());
    conseillerService.getStatistiquesHubCSV()
    .then(
      data => dispatch(success(data, download(data, `export-cnfs_${dayjs(new Date()).format('YYYY-MM-DD')}_${hub}.csv`))),
      error => dispatch(failure(error))
    );
  };

  function request() {
    return { type: 'GET_STATS_HUB_CSV_REQUEST' };
  }
  function success(data, download) {
    return { type: 'GET_STATS_HUB_CSV_SUCCESS', data, download };
  }
  function failure(error) {
    return { type: 'GET_STATS_HUB_CSV_FAILURE', error };
  }
}

// eslint-disable-next-line max-len
function exportDonneesCnfs(dateDebut, dateFin, filtreProfil, filtreCertifie, filtreGroupeCRA, filtreParNom, nomOrdre = 'prenom', ordre = 1, idStructure) {
  return dispatch => {
    dispatch(request());

    conseillerService.getExportDonneesCnfs(dateDebut, dateFin, filtreProfil, filtreCertifie, filtreGroupeCRA, filtreParNom, nomOrdre, ordre, idStructure).then(
      exportCnfsFileBlob => dispatch(success(exportCnfsFileBlob)),
      exportCnfsFileError => dispatch(failure(exportCnfsFileError))
    );
  };

  function request() {
    return { type: 'GET_EXPORT_CNFS_REQUEST' };
  }
  function success(exportCnfsFileBlob) {
    return { type: 'GET_EXPORT_CNFS_SUCCESS', exportCnfsFileBlob };
  }
  function failure(exportCnfsFileError) {
    return { type: 'GET_EXPORT_CNFS_FAILURE', exportCnfsFileError };
  }
}

function resetExportDonneesCnfs() {
  return { type: 'EXPORT_CNFS_RESET' };
}

function resetStatistiquesPDFFile() {
  return { type: 'RESET_FILE' };
}

function isFormulaireChecked(sexe, isUpdated) {
  const show = !sexe || (sexe && isUpdated);
  return { type: 'SHOW_FORMULAIRE_SEXE_AGE', show };
}

function closeFormulaire() {
  history.push('/accueil');
  return { type: 'CLOSE_FORMULAIRE_SEXE_AGE' };
}

function isUserActif(conseiller) {
  const isUserActif = conseiller?.emailCNError !== undefined && conseiller?.mattermost !== undefined;
  return { type: 'IS_USER_ACTIF', isUserActif };
}
