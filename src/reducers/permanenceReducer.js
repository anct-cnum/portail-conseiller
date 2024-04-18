import { formatRue } from '../utils/functionFormats';

const initialState = {
  loading: false,
  fields: [{ name: 'estStructure', value: null }],
  geocodeAdresses: [],
  showLieuSecondaire: Array.from({ length: process.env.REACT_APP_NOMBRE_LIEU_SECONDAIRE }, () => (false)),
  loadingHoraires: Array.from({ length: Number(process.env.REACT_APP_NOMBRE_LIEU_SECONDAIRE) + 1 }, () => (false)),
  disabledFields: [],
  showSiret: [],
  prefixIdLieuEnregistrable: 'principal_',
  isAdresseCachee: true,
  isCreated: false,
  isUpdated: false,
  showError: false,
  suspensionPermanence: false,
  permanencesReservees: [],
  reloadList: false,
  listeAdresses: null,
  erreurAdresse: false,
  existsPermanence: false,
  foundExistedPermanence: false
};

const nettoyageState = form => {
  return form?.filter(field => {
    if (Object.keys(field)?.length !== 0) {
      return true;
    }
    return false;
  });
};

const nettoyageFields = (fields, prefixId, arrayFields) => {
  arrayFields.forEach(field => {
    delete fields?.filter(f => f.name === prefixId + field)[0]?.value;
    delete fields?.filter(f => f.name === prefixId + field)[0]?.name;
  });

  return nettoyageState(fields);
};

const updateGeocode = (geocodeAdresse, prefixId, adresse = null) => {
  if (geocodeAdresse?.length > 0) {
    delete geocodeAdresse?.filter(geocode => geocode.prefixId === prefixId)[0]?.geocodeAdresse;
    delete geocodeAdresse?.filter(geocode => geocode.prefixId === prefixId)[0]?.prefixId;
  }
  if (adresse !== null) {
    geocodeAdresse?.push({ geocodeAdresse: adresse.geometry, prefixId: prefixId });
  }
  return nettoyageState(geocodeAdresse);
};

export default function permanence(state = initialState, action) {

  switch (action.type) {
    case 'GET_MA_PERMANENCE_REQUEST':
      return {
        ...state,
        maPermanenceError: false,
        maPermanenceLoading: true,
        isUpdated: false
      };
    case 'GET_MA_PERMANENCE_SUCCESS':
      return {
        ...state,
        maPermanence: action?.maPermanence,
        maPermanenceLoading: false
      };
    case 'GET_MA_PERMANENCE_FAILURE':
      return {
        ...state,
        maPermanenceError: action.error?.message ?? action.error,
        maPermanenceLoading: false
      };
    case 'GET_MES_PERMANENCES_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'GET_MES_PERMANENCES_SUCCESS':
      return {
        ...state,
        mesPermanences: action?.mesPermanences,
        loading: false
      };
    case 'GET_MES_PERMANENCES_FAILURE':
      return {
        ...state,
        error: action.error?.message ?? action.error,
        loading: false
      };
    case 'GET_PERMANENCES_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'GET_PERMANENCES_SUCCESS':
      return {
        ...state,
        permanences: action?.permanences,
        isAllUpdated: false,
        loading: false
      };
    case 'GET_PERMANENCES_FAILURE':
      return {
        ...state,
        error: action.error?.message ?? action.error,
        loading: false
      };
    case 'SHOW_FORMULAIRE_PERMANENCE':
      return {
        ...state,
        showFormular: action.isPermanenceChecked
      };
    case 'CLOSE_FORMULAIRE_PERMANENCE':
      return {
        hasPermanence: false,
        isUpdated: false
      };
    case 'UPDATE_FIELD':
      let fields = state?.fields ?? [];
      delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.[action.field.name])[0]?.[action.field.name];
      delete fields?.filter(field => field.name === action.field.name)[0]?.value;
      delete fields?.filter(field => field.name === action.field.name)[0]?.name;
      fields?.push(action.field);
      fields = nettoyageState(fields);
      return {
        ...state,
        fields: fields
      };
    case 'DISABLED_FIELD':
      let disabledFields = state?.disabledFields ?? [];
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
    case 'LOADING_HORAIRES':
      return {
        ...state,
        loadingHoraires: action.loadingHoraires,
      };
    case 'VERIFY_SIRET_REQUEST':
      return {
        ...state,
        showError: false,
        loading: true,
      };
    case 'VERIFY_SIRET_SUCCESS':
      let fieldsSiret = state?.fields ?? [];
      let disabledSiret = state?.disabledFields ?? [];

      if (action.adresseParSiret !== null) {

        delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.[action.champ + 'nomEnseigne'])[0]?.[action.champ + 'nomEnseigne'];
        delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.[action.champ + 'adresse'])[0]?.[action.champ + 'adresse'];
        delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.[action.champ + 'adresse'])[0]?.[action.champ + 'location'];

        const rueVoie = formatRue(null, action.adresseParSiret?.type_voie, action.adresseParSiret?.libelle_voie);
        const adresse = action.adresseParSiret?.adresseComplete;

        fieldsSiret = nettoyageFields(
          fieldsSiret,
          action.champ,
          ['adresse', 'nomEnseigne']);
        fieldsSiret?.push({ name: action.champ + 'adresse', value: adresse });
        fieldsSiret?.push({ name: action.champ + 'nomEnseigne', value: action.adresseParSiret?.l1 });
        fieldsSiret = nettoyageState(fieldsSiret);

        delete disabledSiret?.filter(field => field.id === action.champ)[0]?.value;
        delete disabledSiret?.filter(field => field.id === action.champ)[0]?.id;
        disabledSiret?.push({ id: action.champ, value: !(rueVoie?.trim() === '') });
        disabledSiret = nettoyageState(disabledSiret);
      }

      return {
        ...state,
        existsPermanence: action.existsPermanence,
        listeAdresses: action.adresseParSiret?.listeAdresses ?? [],
        disabledFields: disabledSiret,
        loadingAdresses: false,
        fields: fieldsSiret,
        showError: false,
        loading: false,
        error: false,
      };
    case 'VERIFY_SIRET_FAILURE':
      return {
        ...state,
        showError: true,
        error: action.error?.message ?? action.error,
        loading: false,
      };
    case 'GEOCODE_ADRESSE_REQUEST':
      return {
        ...state,
        showError: false,
        loading: true,
      };
    case 'GEOCODE_ADRESSE_SUCCESS':
      let geocodeAdresses = state?.geocodeAdresses ?? [];
      geocodeAdresses = updateGeocode(geocodeAdresses, action.prefixId, action.geocodeAdresse);
      return {
        ...state,
        geocodeAdresses: geocodeAdresses,
        loading: false,
      };
    case 'GEOCODE_ADRESSE_FAILURE':
      return {
        ...state,
        showError: true,
        error: action.error?.message ?? action.error,
        loading: false,
      };
    case 'GET_ADRESSE_REQUEST':
      let initFieldsAdresse = state?.fields ?? [];
      let initgeocodeAdresse = state?.geocodeAdresses ?? [];

      initFieldsAdresse = nettoyageFields(
        initFieldsAdresse,
        action.prefixId,
        ['numeroVoie', 'rueVoie', 'codePostal', 'codeCommune', 'ville', 'location']);

      initgeocodeAdresse = updateGeocode(initgeocodeAdresse, action.prefixId);

      return {
        ...state,
        fields: initFieldsAdresse,
        geocodeAdresse: initgeocodeAdresse,
        loadingAdresses: true,
        errorAdresses: false,
        listeAdresses: [],
      };
    case 'GET_ADRESSE_SUCCESS':
      return {
        ...state,
        loadingAdresses: false,
        foundExistedPermanence: action.foundExistedPermanence,
        listeAdresses: action.adresses,
      };
    case 'GET_ADRESSE_FAILURE':
      return {
        ...state,
        loadingAdresses: false,
        errorAdresses: action.error,
      };
    case 'SET_ADRESSE':
      let fieldsAdresse = state?.fields ?? [];
      let geocodeAdresse = state?.geocodeAdresses ?? [];
      if (action?.adresse?.properties) {
        delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.[action.champ + 'adresse'])[0]?.[action.champ + 'adresse'];
        delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.[action.champ + 'adresse'])[0]?.[action.champ + 'rueVoie'];
        delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.[action.champ + 'adresse'])[0]?.[action.champ + 'location'];

        fieldsAdresse = nettoyageFields(
          fieldsAdresse,
          action.prefixId,
          ['adresse', 'numeroVoie', 'rueVoie', 'codePostal', 'codeCommune', 'ville', 'location']);
        fieldsAdresse.push({ name: action.prefixId + 'adresse', value: action.adresse.properties?.label?.toUpperCase() });
        fieldsAdresse?.push({ name: action.prefixId + 'numeroVoie', value: action?.adresse?.properties?.housenumber });
        fieldsAdresse?.push({ name: action.prefixId + 'rueVoie', value: action?.adresse?.properties?.street ?? action?.adresse?.properties?.locality });
        fieldsAdresse?.push({ name: action.prefixId + 'codePostal', value: action?.adresse?.properties?.postcode });
        fieldsAdresse?.push({ name: action.prefixId + 'ville', value: action?.adresse?.properties?.city?.toUpperCase() });
        fieldsAdresse?.push({ name: action.prefixId + 'codeCommune', value: action?.adresse?.properties?.citycode });
        fieldsAdresse = nettoyageState(fieldsAdresse);

        geocodeAdresse = updateGeocode(geocodeAdresse, action.prefixId, action.adresse);
      }
      return {
        ...state,
        fields: fieldsAdresse,
        geocodeAdresses: geocodeAdresse,
        listeAdresses: null,
      };
    case 'SET_ADRESSE_INTROUVABLE':
      let fieldsAdresseIntrouvable = state?.fields ?? [];
      fieldsAdresseIntrouvable = nettoyageFields(
        fieldsAdresseIntrouvable,
        action.prefixId,
        ['numeroVoie', 'rueVoie', 'codePostal', 'codeCommune', 'ville', 'location']);
      fieldsAdresseIntrouvable = nettoyageState(fieldsAdresseIntrouvable);
      return {
        ...state,
        fields: fieldsAdresseIntrouvable,
        geocodeAdresses: [],
        listeAdresses: null,
      };
    case 'LISTE_ADRESSES_REBOOT': {
      let geocodeAdressesReboot = state?.geocodeAdresses ?? null;
      geocodeAdressesReboot = updateGeocode(geocodeAdressesReboot, action.prefixId);
      return {
        ...state,
        listeAdresses: [],
        geocodeAdresses: geocodeAdressesReboot,
      };
    }
    case 'GEOCODE_ADRESSE_REBOOT':
      let geocodeReboot = state?.geocodeAdresses ?? [];
      geocodeReboot = updateGeocode(geocodeReboot, action.prefixId);
      return {
        ...state,
        geocodeAdresses: geocodeReboot,
      };
    case 'POST_PERMANENCE_REQUEST':
      return {
        ...state,
        loading: true,
        showErrorMessage: false,
        showError: false,
        error: false,
        redirection: null,
      };
    case 'POST_PERMANENCE_SUCCESS':
      return {
        ...state,
        loading: false,
        isCreated: action.isCreated,
        prefixIdLieuEnregistrable: action.prefixId,
        isEnded: action.isEnded,
        redirection: action.redirection ?? String(action.idPermanence),
      };
    case 'POST_PERMANENCE_FAILURE':
      return {
        ...state,
        loading: false,
        isCreated: false,
        showError: true,
        error: action.error?.message ?? action.error,
      };
    case 'UPDATE_PERMANENCE_REQUEST':
      return {
        ...state,
        loading: true,
        showError: false,
        isUpdated: false,
        error: false,
        redirection: null,
      };
    case 'UPDATE_PERMANENCE_SUCCESS':
      return {
        ...state,
        loading: false,
        isUpdated: action.isUpdated,
        prefixIdLieuEnregistrable: action.prefixId,
        isEnded: action.isEnded,
        redirection: action.redirection,
      };
    case 'UPDATE_PERMANENCE_FAILURE':
      return {
        ...state,
        loading: false,
        isUpdated: false,
        showError: true,
        error: action.error?.message ?? action.error,
      };
    case 'SUSPENSION_FORM':
      return {
        ...state,
        isReporter: false
      };
    case 'DELETE_PERMANENCE_REQUEST':
      return {
        ...state,
        isDeleted: false,
        loadingDeleted: true,
        showErrorDeleted: false,
        errorDeleted: false,
      };
    case 'DELETE_PERMANENCE_SUCCESS':
      return {
        ...state,
        isDeleted: action.isDeleted,
        loadingDeleted: false
      };
    case 'DELETE_PERMANENCE_FAILURE':
      return {
        ...state,
        loadingDeleted: false,
        showErrorDeleted: true,
        errorDeleted: action.error?.message ?? action.error,
      };
    case 'DELETE_CONSEILLER_PERMANENCE_REQUEST' :
      return {
        ...state,
        isConseillerDeleted: false,
        loading: true,
        showErrorConseillerDeleted: false,
        errorConseillerDeleted: false,
      };
    case 'DELETE_CONSEILLER_PERMANENCE_SUCCESS' :
      return {
        ...state,
        isConseillerDeleted: action.isConseillerDeleted,
        loading: false,
      };
    case 'DELETE_CONSEILLER_PERMANENCE_FAILURE' :
      return {
        ...state,
        loading: false,
        showErrorConseillerDeleted: true,
        errorConseillerDeleted: action.error?.message ?? action.error,
      };
    case 'RESERVE_LIEU_ACTIVITE':
      const reservation = action.reservationPermanence ?? [];
      if (state?.permanencesReservees?.length === 0) {
        state.permanencesReservees = [reservation];
      } else {
        delete state.permanencesReservees?.filter(perm => perm.prefixId === reservation.prefixId)[0]?.idPermanence;
        delete state.permanencesReservees?.filter(perm => perm.prefixId === reservation.prefixId)[0]?.prefixId;
        state.permanencesReservees?.push(reservation);
        state.permanencesReservees = nettoyageState(state.permanencesReservees);
      }

      return {
        ...state,
      };
    case 'UPDATE_LIEU_ENREGISTRABLE':
      return {
        ...state,
        prefixIdLieuEnregistrable: action.prefixId,
      };
    case 'REPORTER_PERMANENCE_REQUEST':
      return {
        ...state,
        showErrorReporter: false,
      };
    case 'REPORTER_PERMANENCE_SUCCESS':
      return {
        ...state,
        isReporter: action.isReporter,
        showErrorReporter: false,
        errorReporter: false,
      };
    case 'REPORTER_PERMANENCE_FAILURE':
      return {
        ...state,
        isReporter: false,
        showErrorReporter: true,
        errorReporter: action.error?.message ?? action.error,
      };
    case 'UPDATE_STATUT_FORM_REQUEST':
      return {
        ...state,
        showError: false,
        error: false
      };
    case 'UPDATE_STATUT_FORM_SUCCESS':
      return {
        ...state,
        isUpdated: action.isUpdated,
        isEnded: true,
        redirection: '/accueil'
      };
    case 'UPDATE_STATUT_FORM_FAILURE':
      return {
        ...state,
        error: action.error?.message ?? action.error,
        isUpdated: false,
        showError: true,
        isEnded: false
      };
    case 'FILL_CHAMPS_MA_PERMANENCE':
      const loadingHoraires = state?.loadingHoraires ?? Array.from({ length: 1 }, () => (false));
      loadingHoraires[0] = true;
      return {
        ...state,
        fields: action.fields,
        loadingHoraires: loadingHoraires
      };
    case 'REINITIALISER_STATUT_PERMANENCE':
      return {
        ...state,
        isUpdated: false,
        isCreated: false,
        isEnded: false,
        error: false,
        showError: false,
        isDeleted: false,
        isConseillerDeleted: false,
        maPermanence: null,
        permanencesReservees: [],
      };
    case 'RELOAD_LIST_PERMANENCE':
      return {
        ...state,
        reloadList: action.bool,
      };
    default:
      return state;
  }
}
