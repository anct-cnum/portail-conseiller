const initState = {
  loadingAdresses: false,
  downloadError: false,
  uploadError: false,
  uploading: false,
  adresses: [],
  cpVille: '',
  distance: '',
};

export default function candidat(state = initState, action) {
  switch (action.type) {
    case 'INIT_BOOLEAN':
      return {
        ...state,
        isDownloaded: false,
        isUploaded: false,
        isDeleted: false,
        loadingAdresses: false,
        loadingDeleteCv: false,
        loading: false,
      };
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
        error: action.error,
      };
    case 'GET_ADRESSE_REQUEST':
      return {
        ...state,
        loadingAdresses: true,
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
        error: action.error,
      };
    case 'POST_CURRICULUM_VITAE_REQUEST':
      return {
        ...state,
        uploading: true,
        isUploaded: false,
        uploadError: false,
      };
    case 'POST_CURRICULUM_VITAE_SUCCESS':
      return {
        ...state,
        isUploaded: action.isUploaded,
        uploading: false
      };
    case 'POST_CURRICULUM_VITAE_FAILURE':
      return {
        ...state,
        uploadError: action.error,
        isUploaded: false,
        uploading: false
      };
    case 'GET_CURRICULUM_VITAE_REQUEST':
      return {
        ...state,
        downloading: true,
        isDownloaded: false
      };
    case 'GET_CURRICULUM_VITAE_SUCCESS':
      return {
        ...state,
        blob: action.data,
        isDownloaded: action.download,
        downloading: false,
      };
    case 'GET_CURRICULUM_VITAE_FAILURE':
      return {
        ...state,
        downloadError: action.error,
        downloading: false,
      };
    case 'DELETE_CURRICULUM_VITAE_REQUEST':
      return {
        ...state,
        isUploaded: false,
        isDeleted: false,
        deleteError: false,
        loadingDeleteCv: true
      };
    case 'DELETE_CURRICULUM_VITAE_SUCCESS':
      return {
        ...state,
        isDeleted: action.data,
        isUploaded: true,
        loadingDeleteCv: false
      };
    case 'DELETE_CURRICULUM_VITAE_FAILURE':
      return {
        ...state,
        deleteError: action.error,
        loadingDeleteCv: false
      };
    case 'RESET_FILE':
      return {
        ...state,
        blob: null,
        uploadError: false,
      };
    default:
      return state;
  }
}
