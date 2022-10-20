const initialState = {};

export default function historiqueCras(state = initialState, action) {
  switch (action.type) {
    case 'GET_HISTORIQUE_CRAS_LIST_REQUEST':
      return {
        ...state,
        loading: true,
        error: false
      };
    case 'GET_HISTORIQUE_CRAS_LIST_SUCCESS':
      return {
        ...state,
        liste: action.listeCras,
        loading: false,
      };
    case 'GET_HISTORIQUE_CRAS_LIST_FAILURE':
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case 'GET_HISTORIQUE_CRAS_THEMES_REQUEST':
      return {
        ...state,
        loading: true,
        error: false
      };
    case 'GET_HISTORIQUE_CRAS_THEMES_SUCCESS':
      return {
        ...state,
        themes: action.themes,
        loading: false,
      };
    case 'GET_HISTORIQUE_CRAS_THEMES_FAILURE':
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}
