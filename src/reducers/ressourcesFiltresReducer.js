export default function ressourcesfiltres(state = null, action) {

  switch (action.type) {
    case 'GET_TAGS_SELECTED_REQUEST':
      return {
        ...state,
        tagsListSelected: action.tags
      };
    default:
      return state;
  }
}
