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
  nbAccompagnementIndividuel: 0,
  nbAccompagnementAtelier: 0,
  nbAccompagnementRedirection: 0,
  nbOrganisme: 0,
  organisme: null,
  organismes: [],
};

export default function cra(state = initialState, action) {
  switch (action.type) {
    case 'GET_BUTTON_PERMANENCES':
      return {
        ...state,
        buttonPermanences: true,
        buttonCP: false,
        searchCP: false,
        idPermanence: null,
        nomEnseigne: null,
        cp: undefined,
        errorsRequired: {
          ...state.errorsRequired,
          canal: true },
      };
    case 'GET_PERMANENCE':
      return {
        ...state,
        buttonPermanences: false,
        searchCP: false,
        idPermanence: action?.permanence?._id,
        nomEnseigne: action?.permanence?.nomEnseigne,
        cp: action?.permanence?.adresse?.codePostal + ' ' + action?.permanence?.adresse?.ville,
        codeCommune: action?.permanence?.adresse?.codeCommune,
        errorsRequired: {
          ...state.errorsRequired,
          cp: false,
          canal: false },
      };
    case 'GET_BUTTON_CP':
      return {
        ...state,
        idPermanence: null,
        nomEnseigne: null,
        cp: undefined,
        buttonCP: true,
        buttonPermanences: false,
        errorsRequired: {
          ...state.errorsRequired,
          canal: true },
      };
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
          cp: false,
          canal: false },
      };
    case 'UPDATE_CODE_COMMUNE':
      return {
        ...state,
        codeCommune: action.codeCommune,
      };
    case 'UPDATE_CANAL':
      return {
        ...state,
        canal: action.canal,
        errorsRequired: {
          ...state.errorsRequired,
          canal: !state?.cp },
      };
    case 'DELETE_CANAL_VALUE':
      const canal = state?.idPermanence ? 'rattachement' : 'autre lieu';
      return {
        ...state,
        canal: canal,
        errorsRequired: {
          ...state.errorsRequired,
          canal: !state?.cp },
      };
    case 'CLEAR_CANAL':
      return {
        ...state,
        idPermanence: null,
        nomEnseigne: null,
        cp: !state.buttonCP ? undefined : state.cp,
        buttonPermanences: false,
        searchCP: false,
        errorsRequired: {
          ...state.errorsRequired,
          canal: !state?.cp,
          cp: !state.buttonCP
        },
      };
    case 'UPDATE_ACTIVITE':
      return {
        ...state,
        activite: action.activite,
        nbParticipants: action.activite === 'collectif' ? 5 : 1,
        nbParticipantsAccompagnement: 0,
        nbAccompagnementIndividuel: 0,
        nbAccompagnementAtelier: 0,
        nbAccompagnementRedirection: 0,
        nbOrganisme: 0,
        organisme: null,
        organismes: [],
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
        nbAccompagnementIndividuel: 0,
        nbAccompagnementAtelier: 0,
        nbAccompagnementRedirection: 0,
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
        nbOrganisme: 0,
        organisme: null,
        organismes: [],
      };
    case 'UPDATE_NB_RECURRENCE':
      return {
        ...state,
        nbParticipantsRecurrents: action.nbParticipantsRecurrents,
        nbOrganisme: 0
      };
    case 'UPDATE_AGE':
      return {
        ...state,
        age: action.data.age,
        nbParticipantsAge: action.data.nbParticipantsAge,
        nbOrganisme: 0,
        errorsRequired: {
          ...state.errorsRequired,
          age: action.data.nbParticipantsAge !== state.nbParticipants },
      };
    case 'UPDATE_STATUT':
      return {
        ...state,
        statut: action.data.statut,
        nbParticipantsStatut: action.data.nbParticipantsStatut,
        nbOrganisme: 0,
        errorsRequired: {
          ...state.errorsRequired,
          statut: action.data.nbParticipantsStatut !== state.nbParticipants },
      };
    case 'UPDATE_THEMES':
      return {
        ...state,
        themes: action.themes,
        nbOrganisme: 0,
        errorsRequired: {
          ...state.errorsRequired,
          themes: (action.themes.length === 0) },
      };
    case 'UPDATE_MULTIPLE_THEMES':
      return {
        ...state,
        nbOrganisme: 0,
        sousThemes: action.sousThemesList
      };
    case 'UPDATE_DUREE':
      return {
        ...state,
        duree: action.duree,
        nbOrganisme: 0,
        errorsRequired: {
          ...state.errorsRequired,
          duree: false },
      };
    case 'UPDATE_ACCOMPAGNEMENT':
      let nbAccompagnementRedirection = 0;
      const organismeRedirection = state.organismes;
      if (organismeRedirection?.length > 0) {
        organismeRedirection.forEach(orga => {
          nbAccompagnementRedirection += orga[Object.keys(orga)[0]];
        });
      }
      nbAccompagnementRedirection += action.nbOrganisme;
      const nbParticipantsAccompagnement = action.nbAccompagnementIndividuel + action.nbAccompagnementAtelier + nbAccompagnementRedirection;

      return {
        ...state,
        nbParticipantsAccompagnement: nbParticipantsAccompagnement,
        nbAccompagnementIndividuel: action.nbAccompagnementIndividuel,
        nbAccompagnementAtelier: action.nbAccompagnementAtelier,
        nbAccompagnementRedirection: nbAccompagnementRedirection,
        nbOrganisme: action.nbOrganisme,
      };
    case 'UPDATE_ORGANISME':
      return {
        ...state,
        organisme: action.organisme,
      };
    case 'UPDATE_ORGANISMES':
      const updateOrganismeCra = state;
      let redirection = 0;
      action.organismes.forEach(orga => {
        redirection += orga[Object.keys(orga)[0]];
      });
      const nbParticipantsAccompOrga = updateOrganismeCra.nbAccompagnementAtelier + updateOrganismeCra.nbAccompagnementIndividuel + redirection;

      return {
        ...state,
        organisme: null,
        nbOrganisme: nbParticipantsAccompOrga === updateOrganismeCra.nbParticipants ? 0 : 1,
        nbAccompagnementRedirection: redirection,
        nbParticipantsAccompagnement: nbParticipantsAccompOrga,
        organismes: action.organismes,
      };
    case 'DELETE_ORGANISME':
      const organismesDeleteCra = state;
      const organismesFiltres = organismesDeleteCra.organismes.filter(function(item) {
        return item !== action.organisme;
      });
      let nbSuppressionOrganisme = 0;
      organismesDeleteCra.organismes.forEach(orga => {
        nbSuppressionOrganisme = orga[Object.keys(orga)[0]];
      });
      organismesDeleteCra.nbAccompagnementRedirection -= nbSuppressionOrganisme;
      organismesDeleteCra.nbParticipantsAccompagnement -= nbSuppressionOrganisme;
      return {
        ...state,
        nbOrganisme: 1,
        organismes: organismesFiltres,
        nbAccompagnementRedirection: organismesDeleteCra.nbAccompagnementRedirection,
        nbParticipantsAccompagnement: organismesDeleteCra.nbParticipantsAccompagnement,
      };
    case 'INIT_NB_ORGANISME':
      return {
        ...state,
        nbOrganisme: 0,
      };
    case 'UPDATE_DATE':
      return {
        ...state,
        dateAccompagnement: action.date,
        nbOrganisme: 0,
      };
    case 'UPDATE_DATEPICKER_STATUS':
      return {
        ...state,
        datePickerStatus: action.status,
      };
    case 'VERIFY_CRA':
      return {
        ...state,
        nbOrganisme: 0,
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
        error: action.error?.message ?? action.error,
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
      let nbOrganismesCra = 0;
      action.cra?.cra?.organismes?.forEach((organisme, i) => {
        nbOrganismesCra += organisme[Object.keys(organisme)[i]];
      });
      return {
        ...initialState,
        ...action.cra.cra,
        loading: false,
        errorsRequired: {
          cp: false,
          canal: !action.cra?.permanence?.$id && action.cra?.cra?.canal === 'rattachement',
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
        idPermanence: action.cra?.permanence?.$id,
        cp: action.cra.cra?.codePostal + ' ' + action.cra.cra.nomCommune,
        codeCommune: action.cra.cra?.codeCommune,
        dateAccompagnement: new Date(action.cra.cra.dateAccompagnement),
        oldDateAccompagnement: new Date(action.cra.cra.dateAccompagnement),
        nbParticipants: action.cra.cra.nbParticipants,
        nbParticipantsAge: action.cra.cra.nbParticipants,
        nbParticipantsStatut: action.cra.cra.nbParticipants,
        nbParticipantsAccompagnement:
          action.cra.cra.accompagnement.individuel +
          action.cra.cra.accompagnement.atelier +
          action.cra.cra.accompagnement.redirection,
        nbAccompagnementRedirection: nbOrganismesCra,
      };
    case 'GET_CRA_FAILURE':
      return {
        error: action.error?.message ?? action.error,
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
        error: action.error?.message ?? action.error,
        saveInProgress: false,
        printFlashbag: false
      };
    case 'DELETE_CRA_REQUEST':
      return {
        ...state,
        loading: true,
        error: false,
        isDeleted: false,
      };
    case 'DELETE_CRA_SUCCESS':
      return {
        ...state,
        loading: false,
        isDeleted: action.isDeleted,
      };
    case 'DELETE_CRA_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error?.message ?? action.error,
      };
    case 'COUNT_CRA_PERMANENCE_REQUEST':
      return {
        ...state,
        loading: true,
        error: false,
        printFlashbag: false
      };
    case 'COUNT_CRA_PERMANENCE_SUCCESS':
      return {
        ...state,
        loading: false,
        countCra: action.count
      };
    case 'COUNT_CRA_PERMANENCE_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
        printFlashbag: true
      };
    case 'SEARCH_SOUS_THEMES_CRA_REQUEST':
      return {
        ...state,
        loadingSuggestion: true,
        error: false,
        errorSousTheme: null
      };
    case 'SEARCH_SOUS_THEMES_CRA_SUCCESS':
      return {
        ...state,
        loadingSuggestion: false,
        listeSousThemes: action.sousThemes,
      };
    case 'SEARCH_SOUS_THEMES_CRA_FAILURE':
      return {
        ...state,
        loadingSuggestion: false,
        error: action.error?.message ?? action.error,
      };
    case 'CLEAR_SOUS_THEMES':
      return {
        ...state,
        listeSousThemes: [],
      };
    case 'VERIFY_SOUS_THEMES':
      return {
        ...state,
        errorSousTheme: action.error?.message ?? action.error
      };
    case 'UPDATE_SOUS_THEME':
      return {
        ...state,
        sousThemes: action.sousThemes
      };
    default:
      return state;
  }
}
