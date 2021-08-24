const initialState = {
  dateDebut: new Date(),
  dateFin: new Date(),
};

export default function filtersAndSorts(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_DATE_DEBUT':
      return {
        ...state,
        dateDebut: action.dateDebut,
      };
    case 'CHANGE_DATE_FIN':
      return {
        ...state,
        dateFin: action.dateFin,
      };
    default:
      return state;
  }
}
