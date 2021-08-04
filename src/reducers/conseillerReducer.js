export default function conseiller(state = null, action) {
  switch (action.type) {
    case 'GET_CONSEILLER_REQUEST':
      return {
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
        loadingPDF: true
      };
    case 'GET_STATS_PDF_SUCCESS':
      return {
        ...state,
        blob: action.data,
        statistiquesPDF: action.download,
        loadingPDF: false
      };
    case 'GET_STATS_PDF_FAILURE':
      return {
        error: action.error
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
    default:
      return state;
  }
}
