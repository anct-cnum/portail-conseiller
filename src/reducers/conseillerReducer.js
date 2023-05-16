const initState = {
  loadingCSV: false,
  loadingPDF: false,
  loadingExcel: false,
  errorPDF: false,
  errorCSV: false,
  errorExcel: false,
  downloadingExportCnfs: false,
  initConseiller: false,
  conseillersBeforeFilter: []
};

export default function conseiller(state = initState, action) {
  switch (action.type) {
    case 'GET_CONSEILLER_REQUEST':
      return {
        ...state,
        loading: true
      };
    case 'GET_CONSEILLER_SUCCESS':
      return {
        ...state,
        conseiller: action.conseiller
      };
    case 'GET_ALL_CONSEILLER_SEARCH_BAR':
      return {
        ...state,
        initConseiller: true,
        conseillersBeforeFilter: action.conseillers?.data
      };
    case 'GET_CONSEILLER_FAILURE':
      return {
        error: action.error
      };
    case 'GET_STATS_PDF_REQUEST':
      return {
        ...state,
        loadingPDF: true,
        errorPDF: false
      };
    case 'GET_STATS_PDF_SUCCESS':
      return {
        ...state,
        blob: action.data,
        statistiquesPDF: action.download,
        loadingPDF: false,
        errorPDF: false
      };
    case 'GET_STATS_PDF_FAILURE':
      return {
        ...state,
        blob: null,
        loadingPDF: false,
        errorPDF: action.error
      };
    case 'GET_STATS_ADMINCOOP_PDF_REQUEST':
      return {
        ...state,
        loadingPDF: true,
        errorPDF: false
      };
    case 'GET_STATS_ADMINCOOP_PDF_SUCCESS':
      return {
        ...state,
        blob: action.data,
        statistiquesPDF: action.download,
        loadingPDF: false,
      };
    case 'GET_STATS_ADMINCOOP_PDF_FAILURE':
      return {
        ...state,
        errorPDF: action.error,
        loadingPDF: false
      };
    case 'GET_STATS_ADMINCOOP_EXCEL_REQUEST':
      return {
        ...state,
        loadingExcel: true,
        errorExcel: false
      };
    case 'GET_STATS_ADMINCOOP_EXCEL_SUCCESS':
      return {
        ...state,
        blob: action.data,
        loadingExcel: false,
      };
    case 'GET_STATS_ADMINCOOP_EXCEL_FAILURE':
      return {
        ...state,
        errorExcel: action.error,
        loadingExcel: false
      };
    case 'GET_STATS_HUB_CSV_REQUEST':
      return {
        ...state,
        loadingCSV: true,
        errorCSV: false
      };
    case 'GET_STATS_HUB_CSV_SUCCESS':
      return {
        ...state,
        blob: action.data,
        loadingCSV: false,
      };
    case 'GET_STATS_HUB_CSV_FAILURE':
      return {
        ...state,
        errorCSV: action.error,
        loadingCSV: false
      };
    case 'GET_STATS_CSV_REQUEST':
      return {
        ...state,
        loadingCSV: true,
        errorCSV: false
      };
    case 'GET_STATS_CSV_SUCCESS':
      return {
        ...state,
        blob: action.data,
        loadingCSV: false
      };
    case 'GET_STATS_CSV_FAILURE':
      return {
        ...state,
        errorCSV: action.error,
        loadingCSV: false
      };
    case 'GET_STATS_EXCEL_REQUEST':
      return {
        ...state,
        loadingExcel: true,
        errorExcel: false
      };
    case 'GET_STATS_EXCEL_SUCCESS':
      return {
        ...state,
        blob: action.data,
        loadingExcel: false,
      };
    case 'GET_STATS_EXCEL_FAILURE':
      return {
        ...state,
        errorExcel: action.error,
        loadingExcel: false
      };

    case 'GET_STATS_ADMINCOOP_CSV_REQUEST':
      return {
        ...state,
        loadingCSV: true,
        errorCSV: false
      };
    case 'GET_STATS_ADMINCOOP_CSV_SUCCESS':
      return {
        ...state,
        blob: action.data,
        loadingCSV: false,
      };
    case 'GET_STATS_ADMINCOOP_CSV_FAILURE':
      return {
        ...state,
        errorCSV: action.error,
        loadingCSV: false
      };
    case 'RESET_FILE':
      return {
        ...state,
        blob: null,
      };
    case 'POST_SEXE_AGE_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'POST_SEXE_AGE_SUCCESS':
      return {
        ...state,
        isUpdated: action.isUpdated,
        loading: false
      };
    case 'POST_SEXE_AGE_FAILURE':
      return {
        error: action.error,
        isUpdated: false,
        loading: false
      };
    case 'SHOW_FORMULAIRE_SEXE_AGE':
      return {
        ...state,
        showFormular: action.show
      };
    case 'CLOSE_FORMULAIRE_SEXE_AGE':
      return {
        showFormular: false,
        isUpdated: false
      };
    case 'GETALL_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'GETALL_SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.conseillers
      };
    case 'GETALL_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'GET_SUBORDONES_REQUEST':
      return {
        ...state,
        loading: true,
        error: false,
      };
    case 'GET_SUBORDONES_SUCCESS':
      return {
        ...state,
        loading: false,
        subordonnes: action.conseillers
      };
    case 'GET_SUBORDONES_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'IS_SUBORDONE_REQUEST':
      return {
        ...state,
        loading: true,
        loaded: false,
        error: false,
      };
    case 'IS_SUBORDONE_SUCCESS':
      return {
        ...state,
        loading: false,
        loaded: true,
        isSubordonne: action.bool
      };
    case 'IS_SUBORDONE_FAILURE':
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action.error
      };
    case 'RESET_IS_SUBORDONE':
      return {
        ...state,
        loaded: false
      };
    case 'GET_EXPORT_CNFS_REQUEST':
      return {
        ...state,
        downloadingExportCnfs: true,
      };
    case 'GET_EXPORT_CNFS_WITHOUT_CRA_REQUEST':
      return {
        ...state,
        loadingCSV: true,
        errorCSV: false
      };
    case 'GET_EXPORT_CNFS_WITHOUT_CRA_SUCCESS':
      return {
        ...state,
        blob: action.data,
        exportCnfsFileWithoutCRA: action.download,
        loadingCSV: false
      };
    case 'GET_EXPORT_CNFS_WITHOUT_CRA_FAILURE':
      return {
        ...state,
        errorCSV: action.error,
        loadingCSV: false
      };
    case 'GET_EXPORT_CNFS_SUCCESS':
      return {
        ...state,
        exportCnfsFileBlob: action.exportCnfsFileBlob,
        downloadingExportCnfs: false
      };
    case 'GET_EXPORT_CNFS_FAILURE':
      return {
        ...state,
        exporCnfsFileError: action.error,
        downloadingExportCnfs: false
      };
    case 'EXPORT_CNFS_RESET': {
      const {
        exportCnfsFileBlob: _file,
        exporCnfsFileError: _error,
        ...nextState
      } = state;

      return nextState;
    }
    case 'IS_USER_ACTIF':
      return {
        ...state,
        isUserActif: action.isUserActif,
      };
    case 'POST_DISPONIBILITE_REQUEST':
      return {
        ...state,
        errorDisponibilite: false
      };
    case 'POST_DISPONIBILITE_SUCCESS':
      return {
        ...state,
        conseiller: {
          ...state.conseiller,
          disponible: action.conseiller.disponible
        }
      };
    case 'POST_DISPONIBILITE_FAILURE':
      return {
        ...state,
        errorDisponibilite: action.error
      };
    case 'POST_DATE_DISPONIBILITE_REQUEST':
      return {
        ...state,
        errorDateDisponibilite: false
      };
    case 'POST_DATE_DISPONIBILITE_SUCCESS':
      return {
        ...state,
        conseiller: {
          ...state.conseiller,
          dateDisponibilite: action.conseiller.dateDisponibilite
        }
      };
    case 'POST_DATE_DISPONIBILITE_FAILURE':
      return {
        ...state,
        errorDateDisponibilite: action.error
      };
    default:
      return state;
  }
}
