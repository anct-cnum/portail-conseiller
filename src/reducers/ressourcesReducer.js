export default function ressources(state = null, action) {

  switch (action.type) {
    case 'GET_TAGS_REQUEST':
      return {
        ...state,
        tagsListLoading: true,
        tagsListError: false,
      };
    case 'GET_TAGS_SUCCESS':
      return {
        ...state,
        tagsList: action.tags,
        tagsListLoading: false,
      };
    case 'GET_TAGS_FAILURE':
      return {
        ...state,
        tagsListError: action.error,
        tagsListLoading: false,
      };
    case 'GET_RESSOURCES_REQUEST':
      return {
        ...state,
        ressourcesLoading: true,
        ressourcesError: false,
      };
    case 'GET_RESSOURCES_SUCCESS':
      return {
        ...state,
        ressources: action.ressources,
        ressourcesLoading: false,
      };
    case 'GET_RESSOURCES_FAILURE':
      return {
        ...state,
        ressourcesError: action.error,
        ressourcesLoading: false,
      };
    case 'GET_RESSOURCES_BY_TAG_REQUEST':
      return {
        ...state,
        ressourcesLoading: true,
        ressourcesError: false,
      };
    case 'GET_RESSOURCES_BY_TAG_SUCCESS':
      return {
        ...state,
        ressources: action.ressources,
        ressourcesLoading: false,
      };
    case 'GET_RESSOURCES_BY_TAG_FAILURE':
      return {
        ...state,
        ressourcesError: action.error,
        ressourcesLoading: false,
      };
    default:
      return state;
  }
}
