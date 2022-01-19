const initialState = {
  errorsRequired: {
    cp: true,
    canal: true,
    activite: true,
    age: true,
    statut: true,
    themes: true,
    duree: true,
  },
};

export default function cra(state = initialState, action) {
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
        errorsRequired: {
          ...state.errorsRequired,
          cp: false },
      };
    case 'UPDATE_CANAL':
      return {
        ...state,
        canal: action.canal,
        errorsRequired: {
          ...state.errorsRequired,
          canal: false },
      };
    case 'UPDATE_ACTIVITE':
      return {
        ...state,
        activite: action.activite,
        nbParticipants: action.activite === 'collectif' ? 5 : 1,
        errorsRequired: {
          ...state.errorsRequired,
          activite: false },
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
        errorsRequired: {
          ...state.errorsRequired,
          age: false },
      };
    case 'UPDATE_STATUT':
      return {
        ...state,
        statut: action.statut,
        errorsRequired: {
          ...state.errorsRequired,
          statut: false },
      };
    case 'UPDATE_THEMES':
      return {
        ...state,
        themes: action.themes,
        errorsRequired: {
          ...state.errorsRequired,
          themes: (action.themes.length === 0) },
      };
    case 'UPDATE_DUREE':
      return {
        ...state,
        duree: action.duree,
        errorsRequired: {
          ...state.errorsRequired,
          duree: false },
      };
    case 'UPDATE_ACCOMPAGNEMENT':
      return {
        ...state,
        accompagnement: action.accompagnement,
      };
    case 'VERIFY_CRA':
      return {
        ...state,
        printError: action.hasErrors,
      };
    case 'SUBMIT_CRA_REQUEST':
      return {
        ...state,
        saveInProgress: true,
      };
    case 'SUBMIT_CRA_SUCCESS':
      return {
        errorsRequired: initialState.errorsRequired //retour à l'état initial
      };
    case 'SUBMIT_CRA_FAILURE':
      return {
        ...state,
        error: action.error,
        saveInProgress: false,
      };
    default:
      return state;
  }
}
