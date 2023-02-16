const initialState = {
  liste: [],
  total: 0,
  limit: 30,
  loading: false,
  themes: undefined,
  dateCraDebut: new Date('2021/01/01'),
  dateCraFin: new Date(),
  codePostalCra: '',
  villeCra: '',
};

export default function historiqueCras(state = initialState, action) {
  switch (action.type) {
    case 'GET_HISTORIQUE_CRAS_LIST_REQUEST':
      return {
        ...state,
        loading: true,
        error: false
      };
    case 'GET_HISTORIQUE_CRAS_LIST_SUCCESS':
      return {
        ...state,
        liste: action.items.data,
        total: action.items.total,
        limit: action.items.limit,
        loading: false,
      };
    case 'GET_HISTORIQUE_CRAS_LIST_FAILURE':
      return {
        ...state,
        error: action.error?.message ?? action.error,
        loading: false,
      };
    case 'GET_HISTORIQUE_CRAS_THEMES_REQUEST':
      return {
        ...state,
        loading: true,
        error: false
      };
    case 'GET_HISTORIQUE_CRAS_THEMES_SUCCESS':
      return {
        ...state,
        themes: action.themes,
        loading: false,
      };
    case 'GET_HISTORIQUE_CRAS_THEMES_FAILURE':
      return {
        ...state,
        error: action.error?.message ?? action.error,
        loading: false,
      };

    case 'CHANGE_DATE_CRA_DEBUT':
      return {
        ...state,
        dateCraDebut: action.dateDebut
      };
    case 'CHANGE_DATE_CRA_FIN':
      return {
        ...state,
        dateCraFin: action.dateFin
      };
    case 'CHANGE_CODE_POSTAL_CRA':
      return {
        ...state,
        codePostalCra: action.codePostal,
        villeCra: action.ville,
        selectedCra: action.selected,
      };
    default:
      return state;
  }
}
