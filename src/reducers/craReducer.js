const initialState = {
  dateAccompagnement: new Date(),
  nbParticipantsRecurrents: null,
  errorsRequired: {
    cp: true,
    canal: true,
    activite: true,
    age: true,
    statut: true,
    themes: true,
    duree: true
  },
  age: {
    moins12ans: 0,
    de12a18ans: 0,
    de18a35ans: 0,
    de35a60ans: 0,
    plus60ans: 0,
  },
  nbParticipantsAge: 0,
  statut: {
    etudiant: 0,
    sansEmploi: 0,
    enEmploi: 0,
    retraite: 0,
    heterogene: 0
  },
  nbParticipantsStatut: 0,
  accompagnement: null,
  organisme: null
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
        age: { ...initialState.age },
        statut: { ...initialState.statut },
        nbParticipantsStatut: initialState.nbParticipantsStatut,
        nbParticipantsAge: initialState.nbParticipantsAge,
        errorsRequired: {
          ...state.errorsRequired,
          activite: false,
          age: true,
          statut: true },
      };
    case 'UPDATE_NB_PARTICIPANTS':
      return {
        ...state,
        nbParticipants: action.nbParticipants,
      };
    case 'UPDATE_NB_RECURRENCE':
      return {
        ...state,
        nbParticipantsRecurrents: action.nbParticipantsRecurrents
      };
    case 'UPDATE_AGE':
      return {
        ...state,
        age: action.data.age,
        nbParticipantsAge: action.data.nbParticipantsAge,
        errorsRequired: {
          ...state.errorsRequired,
          age: action.data.nbParticipantsAge !== state.nbParticipants },
      };
    case 'UPDATE_STATUT':
      return {
        ...state,
        statut: action.data.statut,
        nbParticipantsStatut: action.data.nbParticipantsStatut,
        errorsRequired: {
          ...state.errorsRequired,
          statut: action.data.nbParticipantsStatut !== state.nbParticipants },
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
        organisme: action.organisme
      };
    case 'UPDATE_DATE':
      return {
        ...state,
        dateAccompagnement: action.date,
      };
    case 'UPDATE_DATEPICKER_STATUS':
      return {
        ...state,
        datePickerStatus: action.status,
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
      //retour à l'état initial
      return initialState;
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
