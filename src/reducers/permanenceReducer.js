
const initialState = {
  isAdresseCachee: true,
  isCreated: false,
  isUpdated: false,
  showError: false,
  showLieuSecondaire: false,
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
    case 'INIT_PERMANENCE':
      return {
        ...state,
        adresseExact: true,
        lieuActivite: action.permanence?.nomEnseigne,
        siret: String(action.permanence?.siret),
        numeroTelephone: action.permanence?.numeroTelephone,
        email: action.permanence?.email,
        siteWeb: action.permanence.siteWeb ?? '',
        itinerance: String(action.permanence?.itinerant),

        numeroVoie: action.permanence?.adresse.numeroRue,
        rueVoie: action.permanence?.adresse.rue,
        codePostal: action.permanence?.adresse.codePostal,
        ville: action.permanence?.adresse?.ville,
        horaires: action.permanence?.horaires
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

    /* Partie Informations */
    case 'CACHER_ADRESSE':
      delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.adresseExact)[0]?.adresseExact;
      return {
        ...state,
        isAdresseCachee: action.hide,
        adresseExact: true,
        showError: false,
      };
    case 'MONTRER_ADRESSE':
      delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.adresseExact)[0]?.adresseExact;
      return {
        ...state,
        isAdresseCachee: action.hide,
        numeroVoie: '',
        rueVoie: '',
        codePostal: '',
        ville: '',
        siret: '',
        adresseExact: true,
        showError: false,
      };
    case 'INIT_ADRESSE':
      return {
        ...state,
        numeroVoie: action?.adresse?.numeroRue ? action?.adresse?.numeroRue : action?.adresse?.numero_voie,
        rueVoie: action?.adresse?.rue ? action.adresse?.rue : action?.adresse?.type_voie + ' ' + action?.adresse?.nom_voie,
        codePostal: action?.adresse?.codePostal ? action?.adresse?.codePostal : action?.adresse?.code_postal,
        ville: action?.adresse?.ville ? action?.adresse?.ville : action?.adresse?.localite,
        siret: action?.adresse?.siret
      };
    case 'UPDATE_LIEUACTIVITE':
      delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.lieuActivite)[0]?.lieuActivite;
      return {
        ...state,
        lieuActivite: action.value,
        showError: false,
      };
    case 'UPDATE_SIRET':
      delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.siret)[0]?.siret;
      return {
        ...state,
        siret: action.value,
        showError: false,
      };
    case 'UPDATE_NUMEROTELEPHONE':
      delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.numeroTelephone)[0]?.numeroTelephone;
      return {
        ...state,
        numeroTelephone: action.value,
        showError: false,
      };
    case 'UPDATE_EMAIL':
      delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.email)[0]?.email;
      return {
        ...state,
        email: action.value,
        showError: false,
      };
    case 'UPDATE_SITEWEB':
      delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.siteWeb)[0]?.siteWeb;
      return {
        ...state,
        siteWeb: action.value,
        showError: false,
      };

    /* Partie Adresse */
    case 'UPDATE_NUMEROVOIE':
      delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.numeroVoie)[0]?.numeroVoie;
      return {
        ...state,
        numeroVoie: action.value,
        showError: false,
      };
    case 'UPDATE_RUEVOIE':
      delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.rueVoie)[0]?.rueVoie;
      return {
        ...state,
        rueVoie: action.value,
        showError: false,
      };
    case 'UPDATE_CODEPOSTAL':
      delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.codePostal)[0]?.codePostal;
      return {
        ...state,
        codePostal: action.value,
        showError: false,
      };
    case 'UPDATE_VILLE':
      delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.ville)[0]?.ville;
      return {
        ...state,
        ville: action.value,
        showError: false,
      };

    /* Partie Horaires */
    case 'UPDATE_HORAIRES':
      return {
        ...state,
        horaires: action.horaires
      };

    case 'HAVE_LIEU_SECONDAIRE':
      return {
        ...state,
        showLieuSecondaire: action.show
      };

    case 'UPDATE_TYPE_ACCES':
      return {
        ...state,
        typeAcces: action.typeAcces
      };

    /* Partie Itinerance */
    case 'UPDATE_ITINERANCE':
      delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.itinerance)[0]?.itinerance;
      return {
        ...state,
        itinerance: action.itinerance,
        showError: false,
      };
    default:
      return state;
  }
}
