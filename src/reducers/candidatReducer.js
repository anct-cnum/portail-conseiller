const initState = {
  loadingAdresses: false,
  adresses: [],
  cpVille: '',
  distance: '',
};

export default function candidat(state = initState, action) {
  switch (action.type) {
    case 'INIT_FORM':
      return {
        ...state,
        cpVille: action.conseiller?.codePostal + ' ' + action.conseiller?.nomCommune,
        ville: action.conseiller?.nomCommune,
        codePostal: action.conseiller?.codePostal,
        codeCommune: action.conseiller?.codeCommune,
        location: action.conseiller?.location,
        distance: action.conseiller?.distanceMax,
      };
    case 'VERIFY_FORM':
      return {
        ...state,
        errorsFormulaire: action.errorsForm
      };
    case 'UPDATE_CP_VILLE':
      return {
        ...state,
        cpVille: action.cpVille,
        ville: action.ville,
        codeCommune: action.codeCommune,
        codePostal: action.codePostal,
        location: action.location,
        adresses: [],
      };
    case 'UPDATE_DISTANCE':
      return {
        ...state,
        distance: action.distance,
      };
    case 'POST_CANDIDAT_REQUEST':
      return {
        ...state,
        loading: true,
        success: false,
        error: false
      };
    case 'POST_CANDIDAT_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
      };
    case 'POST_CANDIDAT_FAILURE':
      return {
        ...state,
        loading: false,
        error: true,
      };
    case 'GET_ADRESSE_REQUEST':
      return {
        ...state,
        loadingAdresses: true,
        error: false
      };
    case 'GET_ADRESSE_SUCCESS':
      return {
        ...state,
        loadingAdresses: false,
        adresses: action.adresses
      };
    case 'GET_ADRESSE_FAILURE':
      return {
        ...state,
        loadingAdresses: false,
        error: true
      };

    default:
      return state;
  }
}
