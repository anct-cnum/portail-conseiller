const initialState = {
  dateDebut: new Date(),
  dateFin: new Date(),
  profil: 'tous',
  ordre: -1
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
    case 'CHANGE_ORDRE':
      return {
        ...state,
        ordre: action.dataOrdre };
    case 'CHANGE_PROFIL':
      return {
        ...state,
        profil: action.dataProfil };
    default:
      return state;
  }
}
