
const initialState = {
  fields: [{ name: 'estLieuPrincipal', value: null }],
  showLieuSecondaire: Array.from({ length: process.env.REACT_APP_NOMBRE_LIEU_SECONDAIRE }, () => (false)),
  showSiret: [],

  isAdresseCachee: true,
  isCreated: false,
  isUpdated: false,
  showError: false,
};

export default function permanence(state = initialState, action) {
  switch (action.type) {
    case 'GET_PERMANENCE_REQUEST':
      return {
        ...state,
        loading: true
      };
    case 'GET_PERMANENCE_SUCCESS':
      return {
        ...state,
        permanence: action?.permanence
      };
    case 'GET_PERMANENCE_FAILURE':
      return {
        ...state,
        error: action.error
      };
    case 'GET_PERMANENCES_REQUEST':
      return {
        ...state,
        loading: true
      };
    case 'GET_PERMANENCES_SUCCESS':
      return {
        ...state,
        permanences: action?.permanences
      };
    case 'GET_PERMANENCES_FAILURE':
      return {
        ...state,
        error: action.error
      };
    case 'SHOW_FORMULAIRE_PERMANENCE':
      return {
        ...state,
        showFormulairePermanence: !action.hasPermanence
      };
    case 'CLOSE_FORMULAIRE_PERMANENCE':
      return {
        showFormulairePermanence: false,
        isUpdated: false
      };

    case 'UPDATE_FIELD':
      delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.[action.field.name])[0]?.[action.field.name];
      let fields = state?.fields;
      delete fields?.filter(field => field.name === action.field.name)[0]?.value;
      delete fields?.filter(field => field.name === action.field.name)[0]?.name;

      fields?.push(action.field);

      fields = fields?.filter(field => {
        if (Object.keys(field).length !== 0) {
          return true;
        }
        return false;
      });
      return {
        ...state,
        fields: fields
      };

    case 'INIT_ADRESSE':

      return {
        ...state,
        numeroVoie: action?.adresse?.numeroRue ? action?.adresse?.numeroRue : action?.adresse?.numero_voie,
        rueVoie: action?.adresse?.rue ? action.adresse?.rue : action?.adresse?.type_voie + ' ' + action?.adresse?.nom_voie,
        codePostal: action?.adresse?.codePostal ? action?.adresse?.codePostal : action?.adresse?.code_postal,
        ville: action?.adresse?.ville ? action?.adresse?.ville : action?.adresse?.localite,
      };
    case 'HAVE_LIEU_SECONDAIRE':
      return {
        ...state,
        showLieuSecondaire: action.show
      };
    case 'VERIFY_FORMULAIRE':
      return {
        ...state,
        isUpdated: false,
        showError: true,
        errorsFormulaire: action.errorsForm
      };
    case 'POST_PERMANENCE_REQUEST':
      return {
        ...state,
        showError: false,
      };
    case 'POST_PERMANENCE_SUCCESS':
      return {
        ...state,
        isCreated: action.isCreated,
        showError: false,
        error: false,
      };
    case 'POST_PERMANENCE_FAILURE':
      return {
        ...state,
        isCreated: false,
        showError: true,
        error: action.error,
      };
    case 'UPDATE_PERMANENCE_REQUEST':
      return {
        ...state,
        showError: false,
      };
    case 'UPDATE_PERMANENCE_SUCCESS':
      return {
        ...state,
        isUpdated: action.isUpdated,
        showError: false,
        error: false,
      };
    case 'UPDATE_PERMANENCE_FAILURE':
      return {
        ...state,
        isUpdated: false,
        showError: true,
        error: action.error,
      };

    default:
      return state;
  }
}
