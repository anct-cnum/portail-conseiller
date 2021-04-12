export default function cra(state = null, action) {
  switch (action.type) {
    case 'GET_SEARCH_LIST':
      return {
        ...state,
        searchCP: true,
      };
    case 'SEARCH_INPUT':
      return {
        ...state,
        searchInput: action.search,
      };
    case 'UPDATE_CP':
      return {
        ...state,
        searchCP: false,
        searchInput: false,
        cp: action.cp,
      };
    case 'UPDATE_CANAL':
      return {
        ...state,
        canal: action.canal,
      };
    case 'UPDATE_ACTIVITE':
      return {
        ...state,
        activite: action.activite,
        nbParticipants: action.activite === 'collectif' ? 5 : null
      };
    case 'UPDATE_NB_PARTICIPANTS':
      return {
        ...state,
        nbParticipants: action.nbParticipants,
      };
    case 'UPDATE_AGE':
      return {
        ...state,
        age: action.age,
      };
    case 'UPDATE_STATUT':
      return {
        ...state,
        statut: action.statut,
      };
    case 'UPDATE_THEMES':
      return {
        ...state,
        themes: action.themes,
      };
    case 'UPDATE_DUREE':
      return {
        ...state,
        duree: action.duree,
      };
    default:
      return state;
  }
}
