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
  accompagnement: {
    individuel: 0,
    atelier: 0,
    redirection: 0,
  },
  nbParticipantsAccompagnement: 0,
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
        nbParticipantsAccompagnement: 0,
        nbParticipantsAge: 0,
        nbParticipantsStatut: 0,
        age: {
          moins12ans: 0,
          de12a18ans: 0,
          de18a35ans: 0,
          de35a60ans: 0,
          plus60ans: 0,
        },
        statut: {
          etudiant: 0,
          sansEmploi: 0,
          enEmploi: 0,
          retraite: 0,
          heterogene: 0
        },
        accompagnement: {
          individuel: 0,
          atelier: 0,
          redirection: 0,
        },
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
        nbParticipantsAccompagnement: 0,
        nbParticipantsAge: 0,
        nbParticipantsStatut: 0,
        age: {
          moins12ans: 0,
          de12a18ans: 0,
          de18a35ans: 0,
          de35a60ans: 0,
          plus60ans: 0,
        },
        statut: {
          etudiant: 0,
          sansEmploi: 0,
          enEmploi: 0,
          retraite: 0,
          heterogene: 0
        },
        accompagnement: {
          individuel: 0,
          atelier: 0,
          redirection: 0,
        },
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
        nbParticipantsAccompagnement: action.nbParticipantsAccompagnement
      };
    case 'UPDATE_ORGAMNISME':
      return {
        ...state,
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
        printFlashbag: false
      };
    case 'SUBMIT_CRA_SUCCESS':
      //retour à l'état initial
      return {
        ...initialState,
        printFlashbag: true,
      };
    case 'SUBMIT_CRA_FAILURE':
      return {
        ...state,
        error: action.error,
        saveInProgress: false,
        printFlashbag: false
      };
    case 'SHOW_SELECT_REDIRECTION':
      return {
        ...state,
        showSelectRedirection: action.show
      };
    case 'GET_CRA_REQUEST' :
      return {
        ...initialState,
        error: false,
        loading: true,
      };
    case 'GET_CRA_SUCCESS':
      return {
        ...initialState,
        loading: false,
        errorsRequired: {
          cp: false,
          canal: false,
          activite: false,
          age: false,
          statut: false,
          themes: false,
          duree: false
        },
        id: action.cra._id,
        updatedAt: action.cra.updatedAt ?? action.cra.createdAt,
        searchCP: false,
        searchInput: false,
        cp: action.cra.cra.codePostal + ' ' + action.cra.cra.nomCommune,
        dateAccompagnement: new Date(action.cra.cra.dateAccompagnement),
        oldDateAccompagnement: new Date(action.cra.cra.dateAccompagnement),
        canal: action.cra.cra.canal,
        activite: action.cra.cra.activite,
        nbParticipantsRecurrents: action.cra.cra.nbParticipantsRecurrents,
        age: {
          moins12ans: action.cra.cra.age.moins12ans,
          de12a18ans: action.cra.cra.age.de12a18ans,
          de18a35ans: action.cra.cra.age.de18a35ans,
          de35a60ans: action.cra.cra.age.de35a60ans,
          plus60ans: action.cra.cra.age.plus60ans,
        },
        nbParticipantsAge: action.cra.cra.nbParticipants,
        statut: {
          etudiant: action.cra.cra.statut.etudiant,
          sansEmploi: action.cra.cra.statut.sansEmploi,
          enEmploi: action.cra.cra.statut.enEmploi,
          retraite: action.cra.cra.statut.retraite,
          heterogene: action.cra.cra.statut.heterogene
        },
        nbParticipantsStatut: action.cra.cra.nbParticipants,
        themes: action.cra.cra.themes,
        duree: action.cra.cra.duree,
        accompagnement: {
          individuel: action.cra.cra.accompagnement.individuel,
          atelier: action.cra.cra.accompagnement.atelier,
          redirection: action.cra.cra.accompagnement.redirection,
        },
        nbParticipantsAccompagnement: action.cra.cra.nbParticipants,
        organisme: action.cra.cra.organisme,
        nbParticipants: action.cra.cra.nbParticipants,

      };
    case 'GET_CRA_FAILURE':
      return {
        error: action.error,
        loading: false,
      };
    case 'SET_CRA_REQUEST':
      return {
        ...state,
        saveInProgress: true,
        printFlashbag: false
      };
    case 'SET_CRA_SUCCESS':
      //retour à l'état initial
      return {
        ...initialState,
        printFlashbag: true,
      };
    case 'SET_CRA_FAILURE':
      return {
        ...state,
        error: action.error,
        saveInProgress: false,
        printFlashbag: false
      };
    default:
      return state;
  }
}
