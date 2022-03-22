
const initialState = {
  fields: [{ name: 'estLieuPrincipal', value: null }],
  showLieuSecondaire: Array.from({ length: process.env.REACT_APP_NOMBRE_LIEU_SECONDAIRE }, () => (false)),
  disabledFields: [],
  showSiret: [],
  prefixIdLieuEnregistrable: 'principal_',
  isAdresseCachee: true,
  isCreated: false,
  isUpdated: false,
  showError: false,
};

const nettoyageState = form => {
  return form?.filter(field => {
    if (Object.keys(field).length !== 0) {
      return true;
    }
    return false;
  });
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

      fields = nettoyageState(fields);

      return {
        ...state,
        fields: fields
      };
    case 'DISABLED_FIELD':
      let disabledFields = state?.disabledFields;
      delete disabledFields?.filter(field => field.id === action.field.id)[0]?.value;
      delete disabledFields?.filter(field => field.id === action.field.id)[0]?.id;

      disabledFields?.push(action.field);

      disabledFields = nettoyageState(disabledFields);
      return {
        ...state,
        disabledFields: disabledFields,
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
        showError: action.showError,
        showErrorMessage: action.errorMessage,
        errorsFormulaire: action.errorsForm
      };
    case 'VERIFY_SIRET_REQUEST':
      return {
        ...state,
        showError: false,
      };
    case 'VERIFY_SIRET_SUCCESS':

      let fieldsAdresse = state?.fields;
      let disabledAdresse = state?.disabledFields;

      if (action.adresseParSiret !== null) {
        delete fieldsAdresse?.filter(field => field.name === action.champ + 'nomEnseigne')[0]?.value;
        delete fieldsAdresse?.filter(field => field.name === action.champ + 'numeroVoie')[0]?.value;
        delete fieldsAdresse?.filter(field => field.name === action.champ + 'rueVoie')[0]?.value;
        delete fieldsAdresse?.filter(field => field.name === action.champ + 'codePostal')[0]?.value;
        delete fieldsAdresse?.filter(field => field.name === action.champ + 'ville')[0]?.value;
        delete fieldsAdresse?.filter(field => field.name === action.champ + 'nomEnseigne')[0]?.name;
        delete fieldsAdresse?.filter(field => field.name === action.champ + 'numeroVoie')[0]?.name;
        delete fieldsAdresse?.filter(field => field.name === action.champ + 'rueVoie')[0]?.name;
        delete fieldsAdresse?.filter(field => field.name === action.champ + 'codePostal')[0]?.name;
        delete fieldsAdresse?.filter(field => field.name === action.champ + 'ville')[0]?.name;
        fieldsAdresse.push({ name: action.champ + 'nomEnseigne', value: action.adresseParSiret?.l1 });
        fieldsAdresse.push({ name: action.champ + 'numeroVoie', value: action.adresseParSiret?.numero_voie });
        fieldsAdresse.push({ name: action.champ + 'rueVoie', value: action.adresseParSiret?.type_voie + ' ' + action.adresseParSiret?.nom_voie });
        fieldsAdresse.push({ name: action.champ + 'codePostal', value: action.adresseParSiret?.code_postal });
        fieldsAdresse.push({ name: action.champ + 'ville', value: action.adresseParSiret?.localite.toUpperCase() });
        fieldsAdresse = nettoyageState(fieldsAdresse);

        delete disabledAdresse?.filter(field => field.id === action.champ)[0]?.value;
        delete disabledAdresse?.filter(field => field.id === action.champ)[0]?.id;
        disabledAdresse?.push({ id: action.champ, value: true });
        disabledAdresse = nettoyageState(disabledAdresse);
      }

      return {
        ...state,
        fields: fieldsAdresse,
        disabledFields: disabledAdresse,
        showError: false,
        error: false,
      };
    case 'VERIFY_SIRET_FAILURE':
      return {
        ...state,
        showError: true,
        error: action.error,
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
        isEnded: action.isEnded,
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
        isEnded: action.isEnded,
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
