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
        statistiquesPDF: action.pdf
      };
    case 'GET_STATS_PDF_FAILURE':
      return {
        error: action.error
      };
    default:
      return state;
  }
}
