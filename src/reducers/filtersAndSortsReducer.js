const initialState = {
  dateDebut: new Date(1605571200000),
  dateFin: new Date(),
  profil: 'tous',
  nom: undefined,
  ordre: true,
  ordreNom: undefined,
  structureId: null,
  nomStructure: undefined,
  territoire: 'codeDepartement',
};

export default function filtersAndSorts(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_DATE_DEBUT':
      return {
        ...state,
        dateDebut: action.dateDebut,
      };
    case 'CHANGE_NOM':
      return {
        ...state,
        nom: action.nom,
        structureId: undefined,
        nomStructure: undefined
      };
    case 'CHANGE_STRUCTURE_ID':
      return {
        ...state,
        structureId: action.structureId,
        nomStructure: action.nomStructure,
        nom: undefined
      };
    case 'CHANGE_DATE_FIN':
      return {
        ...state,
        dateFin: action.dateFin,
      };
    case 'CHANGE_ORDRE':
      return {
        ...state,
        ordre: !state.ordre,
        ordreNom: action.ordreNom
      };
    case 'CHANGE_PROFIL':
      return {
        ...state,
        profil: action.dataProfil
      };
    case 'CHANGE_CERTIFIE':
      return {
        ...state,
        certifie: action.dataCertifie
      };
    case 'CHANGE_GROUPECRA':
      return {
        ...state,
        groupeCRA: action.dataGroupeCRA
      };
    case 'CHANGE_TERRITOIRE':
      return {
        ...state,
        territoire: action.territoire
      };
    case 'RESET_FILTER_AND_SORTS':
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
