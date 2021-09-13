const anneeEnCours = new Date().getFullYear();
const initialState = {
  dateDebutStats: new Date(anneeEnCours + '/01/01'),
  dateFinStats: new Date(),
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
        statsTerritoiresError: false,
      };
    case 'GET_STATS_TERRITOIRES_FAILURE':
      return {
        ...state,
        statsTerritoiresError: action.error,
        statsTerritoiresLoading: false,
      };
    default:
      return state;
  }
}
