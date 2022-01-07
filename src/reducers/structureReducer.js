export default function structure(state = null, action) {
  switch (action.type) {
    case 'GET_STRUCTURE_REQUEST':
      return {
        loading: true
      };
    case 'GET_STRUCTURE_SUCCESS':
      return {
        ...state,
        structure: action.structure
      };
    case 'GET_STRUCTURE_FAILURE':
      return {
        error: action.error
      };
    case 'UPDATE_STRUCTURE_REQUEST':
      return {
        loading: true
      };
    case 'UPDATE_STRUCTURE_SUCCESS':
      return {
        ...state,
        isUpdated: action.isUpdated
      };
    case 'UPDATE_STRUCTURE_FAILURE':
      return {
        error: action.error,
        isUpdated: false
      };
    default:
      return state;
  }
}
