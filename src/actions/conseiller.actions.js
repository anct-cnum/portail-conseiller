import { conseillerService } from '../services/conseiller.service.js';
import download from 'downloadjs';
import dayjs from 'dayjs';

export const conseillerActions = {
  get,
  getAll,
  getStatistiquesPDF,
  getStatistiquesAdminCoopPDF,
  resetStatistiquesPDFFile,
  exportDonneesCnfs,
  resetExportDonneesCnfs,
  isFormulaireChecked,
  closeFormulaire,
  isUserActif
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

function getAll(page, dateDebut, dateFin, filtreProfil, filtreCertifie, nomOrdre = 'prenom', ordre = 1) {
  return dispatch => {
    dispatch(request());
    let promises = [];
    let promise = conseillerService.getAll(page, dateDebut, dateFin, filtreProfil, filtreCertifie, nomOrdre, ordre);
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

function getStatistiquesPDF(idConseiller, dateDebut, dateFin) {
  return dispatch => {
    dispatch(request());
    conseillerService.getStatistiquesPDF(idConseiller, dateDebut, dateFin)
    .then(
      data => {
        dispatch(success(data, download(data, 'Mes_statistiques_' + dayjs(dateDebut).format('DD-MM-YYYY') + '_' +
        dayjs(dateFin).format('DD-MM-YYYY') + '.pdf')));
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

function getStatistiquesAdminCoopPDF(dateDebut, dateFin, type, idType) {
  return dispatch => {
    dispatch(request());
    conseillerService.getStatistiquesAdminCoopPDF(dateDebut, dateFin, type, idType)
    .then(
      data => {
        dispatch(success(data, download(data, 'Statistiques_' + (type !== 'nationales' ? type.substring(4) : type) + '_' +
        dayjs(dateDebut).format('DD-MM-YYYY') + '_' +
        dayjs(dateFin).format('DD-MM-YYYY') + '.pdf')));
      },
      error => {
        dispatch(failure(error));
      }
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

function exportDonneesCnfs(dateDebut, dateFin, filtreProfil, filtreCertifie, nomOrdre = 'prenom', ordre = 1) {
  return dispatch => {
    dispatch(request());

    conseillerService.getExportDonneesCnfs(dateDebut, dateFin, filtreProfil, filtreCertifie, nomOrdre, ordre).then(
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
  return { type: 'CLOSE_FORMULAIRE_SEXE_AGE' };
}

function isUserActif(conseiller) {
  const isUserActif = conseiller?.emailCNError !== undefined;
  return { type: 'IS_USER_CREATED', isUserActif };
}
