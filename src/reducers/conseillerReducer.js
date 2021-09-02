const initState = {
  loadingPDF: false
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
    case 'SHOW_FORMULAIRE_SEXE_AGE':
      return {
        ...state,
        showFormular: action.show
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
    case 'CLOSE_FORMULAIRE_SEXE_AGE':
      return {
        showFormular: false,
        isUpdated: false
      };
    default:
      return state;
  }
}
