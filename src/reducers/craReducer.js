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
    default:
      return state;
  }
}
