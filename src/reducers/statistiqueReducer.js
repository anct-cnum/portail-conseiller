const initialState = {
  dateDebutStats: new Date(),
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
    default:
      return state;
  }
}
