const initialState = {
  isCreated: false,
  showError: false,
};

export default function formulaireInfoPersonnel(state = initialState, action) {
  switch (action.type) {
    case 'VERIFY_FORMULAIRE':
      return {
        ...state,
        errorsFormulaire: action.errorsForm
      };
    case 'INIT_FORM_INFO_PERSONNEL':
      return {
        ...state,
        telephone: action.telephone,
        telephonePro: action.telephonePro,
        email: action.email,
      };
    case 'UPDATE_TELEPHONE':
      delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.telephone)[0]?.telephone;
      return {
        ...state,
        telephone: action.value,
        showError: false,
      };
    case 'UPDATE_TELEPHONEPRO':
      delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.telephonePro)[0]?.telephonePro;
      return {
        ...state,
        telephonePro: action.value,
        showError: false,
      };
    case 'UPDATE_EMAIL':
      delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.email)[0]?.email;
      return {
        ...state,
        email: action.value,
        showError: false,
      };
    case 'POST_INFO_PERSONNEL_REQUEST':
      return {
        ...state,
        isCreated: false,
        showError: false,
      };
    case 'POST_INFO_PERSONNEL_SUCCESS':
      return {
        ...state,
        isCreated: true,
        showError: false,
        error: false,
      };
    case 'POST_INFO_PERSONNEL_FAILURE':
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
