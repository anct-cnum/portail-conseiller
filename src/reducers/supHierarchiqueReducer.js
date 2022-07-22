const initialState = {
  isCreated: false,
  showError: false,
};

export default function formulaireSupHierarchique(state = initialState, action) {
  switch (action.type) {
    case 'VERIFY_FORMULAIRE':
      return {
        ...state,
        errorsFormulaire: action.errorsForm
      };
    case 'INIT_FORM_SUP_HIERARCHIQUE':
      return {
        ...state,
        numeroTelephone: action.formSupHierarchique.numeroTelephone,
        email: action.formSupHierarchique.email,
        prenom: action.formSupHierarchique.prenom,
        nom: action.formSupHierarchique.nom,
        fonction: action.formSupHierarchique.fonction
      };
    case 'INIT_FORM_SUP_HIERARCHIQUE_MESSAGE':
      return {
        ...state,
        isCreated: false,
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
    case 'UPDATE_NOM':
      delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.nom)[0]?.nom;
      return {
        ...state,
        nom: action.value,
        showError: false,
      };
    case 'UPDATE_PRENOM':
      delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.prenom)[0]?.prenom;
      return {
        ...state,
        prenom: action.value,
        showError: false,
      };
    case 'UPDATE_FONCTION':
      delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.fonction)[0]?.fonction;
      return {
        ...state,
        fonction: action.value,
        showError: false,
      };
    case 'POST_SUP_HIERARCHIQUE_REQUEST':
      return {
        ...state,
        isCreated: false,
        showError: false,
      };
    case 'POST_SUP_HIERARCHIQUE_SUCCESS':
      return {
        ...state,
        isCreated: true,
        showError: false,
        error: false,
      };
    case 'POST_SUP_HIERARCHIQUE_FAILURE':
      return {
        ...state,
        isCreated: false,
        showError: true,
        error: action.error,
      };
    default:
      return state;
  }
}
