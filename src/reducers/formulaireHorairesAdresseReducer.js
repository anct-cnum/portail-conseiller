
const initialState = {
  isAdresseCachee: true,
  isUpdated: false,
  showError: false,
};

export default function formulaireHorairesAdresse(state = initialState, action) {
  switch (action.type) {
    case 'VERIFY_FORMULAIRE':
      return {
        ...state,
        isUpdated: false,
        showError: true,
        errorsFormulaire: action.errorsForm
      };
    case 'POST_HORAIRES_ADRESSE_REQUEST':
      return {
        ...state,
        showError: false,
      };
    case 'POST_HORAIRES_ADRESSE_SUCCESS':
      return {
        ...state,
        isUpdated: action.isUpdated,
        showError: false,
        error: false,
      };
    case 'POST_HORAIRES_ADRESSE_FAILURE':
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
        isAdresseCachee: action.input,
        adresseExact: true,
      };
    case 'MONTRER_ADRESSE':
      delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.adresseExact)[0]?.adresseExact;
      return {
        ...state,
        isAdresseCachee: action.input,
        numeroVoie: '',
        rueVoie: '',
        codePostal: '',
        ville: '',
        siret: '',
        adresseExact: true,
      };
    case 'INIT_ADRESSE':
      return {
        ...state,
        numeroVoie: action.adresse.numeroRue ? action.adresse.numeroRue : action.adresse.numero_voie,
        rueVoie: action.adresse?.rue ? action.adresse?.rue : action.adresse.type_voie + ' ' + action.adresse?.nom_voie,
        codePostal: action.adresse.codePostal ? action.adresse.codePostal : action.adresse.code_postal,
        ville: action.adresse.ville ? action.adresse.ville : action.adresse.localite,
        siret: Number(action.adresse.siret)
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
        siret: Number(action.value),
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
    /* Partie Itinerance */
    case 'UPDATE_ITINERANCE':
      delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.itinerance)[0]?.itinerance;
      return {
        ...state,
        itinerance: action.itinerance,
        showError: false,
      };
    /* Partie Horaires */
    case 'UPDATE_HORAIRES':
      return {
        ...state,
        horaires: action.horaires
      };
      /* init du formulaire de mise à jour des informations */
    case 'INIT_INFORMATION':
      return {
        ...state,
        adresseExact: true,
        lieuActivite: action.informations.nomEnseigne,
        siret: Number(action.informations.siret),
        numeroTelephone: action.informations.numeroTelephone,
        email: action.informations.email,
        siteWeb: action.informations.siteWeb ? action.informations.siteWeb : '',
        itinerance: String(action.informations.itinerant),

        numeroVoie: action.informations.adresse.numeroRue,
        rueVoie: action.informations.adresse?.rue,
        codePostal: action.informations.adresse.codePostal,
        ville: action.informations.adresse.ville,
        horaires: action.informations.horaires

      };
    default:
      return state;
  }
}
