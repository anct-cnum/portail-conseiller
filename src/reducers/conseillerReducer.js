const initState = {
  loadingPDF: false,
  errorPDF: false
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
        errorPDF: false
      };
    case 'GET_STATS_ADMINCOOP_PDF_FAILURE':
      return {
        ...state,
        errorPDF: action.error,
        loadingPDF: false
      };
    case 'GET_STATS_CSV_REQUEST':
      return {
        ...state,
        loadingCSV: true,
        error: false
      };
    case 'GET_STATS_CSV_SUCCESS':
      return {
        ...state,
        blob: action.data,
        statistiquesCSV: action.download,
        loadingCSV: false
      };
    case 'GET_STATS_CSV_FAILURE':
      return {
        ...state,
        error: action.error
      };
    case 'GET_STATS_ADMINCOOP_CSV_REQUEST':
      return {
        ...state,
        loadingCSV: true,
        error: false
      };
    case 'GET_STATS_ADMINCOOP_CSV_SUCCESS':
      return {
        ...state,
        blob: action.data,
        statistiquesCSV: action.download,
        loadingCSV: false,
      };
    case 'GET_STATS_ADMINCOOP_CSV_FAILURE':
      return {
        ...state,
        error: action.error,
        loadingCSV: false
      };
    case 'RESET_FILE':
      return {
        ...state,
        blob: null,
      };
    case 'POST_SEXE_AGE_REQUEST':
      return {
        loading: true
      };
    case 'POST_SEXE_AGE_SUCCESS':
      return {
        ...state,
        isUpdated: action.isUpdated
      };
    case 'POST_SEXE_AGE_FAILURE':
      return {
        error: action.error,
        isUpdated: false
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
        error: action.error
      };
    case 'GET_EXPORT_CNFS_REQUEST':
      return {
        ...state,
        downloading: true,
      };
    case 'GET_EXPORT_CNFS_SUCCESS':
      return {
        ...state,
        exportCnfsFileBlob: action.exportCnfsFileBlob,
        downloading: false,
      };
    case 'GET_EXPORT_CNFS_FAILURE':
      return {
        ...state,
        exporCnfsFileError: action.error,
        downloading: false,
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
    case 'SHOW_FORMULAIRE_HORAIRES_ADRESSE':
      return {
        ...state,
        showFormularHorairesAdresse: action.show
      };
    case 'CLOSE_FORMULAIRE_HORAIRES_ADRESSE':
      return {
        showFormularHorairesAdresse: false,
        isUpdated: false
      };
    default:
      return state;
  }
}
