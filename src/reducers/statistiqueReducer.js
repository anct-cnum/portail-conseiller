const anneeEnCours = new Date().getFullYear();
const moisEnCours = new Date().getMonth() + 1;
const initialState = {
  dateDebutStats: new Date(anneeEnCours + '/' + moisEnCours + '/01'),
  dateFinStats: new Date(),
  labelSelectPrint: 'Tous les codes Postaux',
  codePostalStats: '',
  villeStats: '',
  codeCommune: '',
  listeAutresReorientations: [],
};
export default function statistique(state = initialState, action) {
  switch (action.type) {
    case 'GET_STATS_CRA_REQUEST':
      return {
        ...state,
        statsDataLoading: true,
        statsDataError: false,
      };
    case 'GET_STATS_CRA_SUCCESS':
      return {
        ...state,
        statsData: action.statsCra,
        statsDataLoading: false,
      };
    case 'GET_STATS_CRA_FAILURE':
      return {
        ...state,
        statsDataError: action.error,
        statsDataLoading: false,
      };
    case 'CHANGE_DATE_DEBUT_STATS':
      return {
        ...state,
        dateDebutStats: action.dateDebut,
      };
    case 'CHANGE_DATE_FIN_STATS':
      return {
        ...state,
        dateFinStats: action.dateFin,
      };
    case 'CHANGE_CODE_POSTAL_STATS':
      return {
        ...state,
        codePostalStats: action.codePostal,
        villeStats: action.ville,
        codeCommune: action?.codeCommune
      };
    case 'CHANGE_LABEL_SELECT_STATS':
      return {
        ...state,
        labelSelectPrint: action.labelSelectPrint
      };
    case 'GET_CODES_POSTAUX_CRA_REQUEST':
      return {
        ...state,
        codesPostauxLoading: true,
        codesPostauxError: false,
      };
    case 'GET_CODES_POSTAUX_CRA_SUCCESS':
      return {
        ...state,
        listeCodesPostaux: action.listeCodesPostaux,
        codesPostauxLoading: false,
      };
    case 'GET_CODES_POSTAUX_CRA_FAILURE':
      return {
        ...state,
        codesPostauxLoading: false,
        codesPostauxError: true,
      };
    case 'GET_STATS_ADMIN_REQUEST':
      return {
        ...state,
      };
    case 'GET_STATS_ADMIN_SUCCESS':
      return {
        ...state,
        statsAdmin: action.statsAdmin,
        statsAdminError: false
      };
    case 'GET_STATS_ADMIN_FAILURE':
      return {
        ...state,
        statsAdminError: action.error,
      };
    case 'GET_STATS_TERRITOIRES_REQUEST':
      return {
        ...state,
        statsTerritoiresLoading: true,
        statsTerritoiresError: false,
      };
    case 'GET_STATS_TERRITOIRES_SUCCESS':
      return {
        ...state,
        statsTerritoires: action.statsTerritoires,
        statsTerritoiresLoading: false,
      };
    case 'GET_STATS_TERRITOIRES_FAILURE':
      return {
        ...state,
        statsTerritoiresError: action.error,
        statsTerritoiresLoading: false,
      };
    case 'GET_TERRITOIRE_REQUEST':
      return {
        ...state,
        territoireLoading: true,
        territoireError: false,
      };
    case 'GET_TERRITOIRE_SUCCESS':
      return {
        ...state,
        territoire: action.territoire,
        territoireLoading: false,
      };
    case 'GET_TERRITOIRE_FAILURE':
      return {
        ...state,
        territoireError: action.error,
        territoireLoading: false,
      };
    case 'GET_STATS_CRA_TERRITOIRE_REQUEST':
      return {
        ...state,
        statsDataLoading: true,
        statsDataError: false,
      };
    case 'GET_STATS_CRA_TERRITOIRE_SUCCESS':
      return {
        ...state,
        statsData: action.statsTerritoire,
        statsDataLoading: false,
      };
    case 'GET_STATS_CRA_TERRITOIRE_FAILURE':
      return {
        ...state,
        statsDataError: action.error,
        statsDataLoading: false,
      };
    case 'GET_STATS_CRA_STRUCTURE_REQUEST':
      return {
        ...state,
        statsDataLoading: true,
        statsDataError: false,
      };
    case 'GET_STATS_CRA_STRUCTURE_SUCCESS':
      return {
        ...state,
        statsData: action.statsStructure,
        statsDataLoading: false,
      };
    case 'GET_STATS_CRA_STRUCTURE_FAILURE':
      return {
        ...state,
        statsDataError: action.error,
        statsDataLoading: false,
      };
    case 'GET_STATS_CRA_NATIONALES_REQUEST':
      return {
        ...state,
        statsDataLoading: true,
        statsDataError: false,
      };
    case 'GET_STATS_CRA_NATIONALES_SUCCESS':
      return {
        ...state,
        statsData: action.statsNationales,
        statsDataLoading: false,
      };
    case 'GET_STATS_CRA_NATIONALES_FAILURE':
      return {
        ...state,
        statsDataError: action.error,
        statsDataLoading: false,
      };
    case 'GET_EXPORT_TERRITOIRE_REQUEST':
      return {
        ...state,
        downloading: true,
      };
    case 'GET_EXPORT_TERRITOIRE_SUCCESS':
      return {
        ...state,
        exportTerritoireFileBlob: action.exportTerritoireFileBlob,
        downloading: false,
      };
    case 'GET_EXPORT_TERRITOIRE_FAILURE':
      return {
        ...state,
        exportTerritoireFileError: action.error,
        downloading: false,
      };
    case 'EXPORT_TERRITOIRE_RESET': {
      const {
        exportTerritoireFileBlob: _file,
        exportTerritoireFileError: _error,
        ...nextState
      } = state;

      return nextState;
    }
    case 'UPDATE_AUTRES_REORIENTATIONS':
      return {
        ...state,
        listeAutresReorientations: action.listeAutresReorientations
      };
    default:
      return state;
  }
}
