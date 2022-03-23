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
        dateDeNaissance: action.dateDeNaissance,
        sexe: action.sexe
      };
    case 'UPDATE_CONSEILLERTELEPHONE':
      delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.telephone)[0]?.telephone;
      return {
        ...state,
        telephone: action.value,
        showError: false,
      };
    case 'UPDATE_CONSEILLERSEXE':
      delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.sexe)[0]?.sexe;
      return {
        ...state,
        sexe: action.value,
        showError: false,
      };
    case 'UPDATE_CONSEILLERDATEDENAISSANCE':
      delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.dateDeNaissance)[0]?.dateDeNaissance;
      return {
        ...state,
        dateDeNaissance: action.value,
        showError: false,
      };
    case 'UPDATE_CONSEILLERTELEPHONEPRO':
      delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.telephonePro)[0]?.telephonePro;
      return {
        ...state,
        telephonePro: action.value,
        showError: false,
      };
    case 'UPDATE_CONSEILLEREMAIL':
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
        'isCreated': true,
        'showError': false,
        'conseiller.telephone': action.conseiller.telephone,
        'conseiller.telephonePro': action.conseiller.telephonePro,
        'conseiller.dateDeNaissance': action.conseiller.dateDeNaissance,
        'conseiller.sexe': action.conseiller.sexe,
        'showConfirmationMail': action.initModifMailPersoConseiller,
        'error': false,
      };
    case 'POST_INFO_PERSONNEL_FAILURE':
      return {
        ...state,
        isCreated: false,
        showError: true,
        error: action.error,
      };
    case 'CONFIRMATION_UPDATE_CONSEILLER_EMAIL_REQUEST':
      return {
        ...state,
        loading: true,
        flashMessage: false
      };
    case 'CONFIRMATION_UPDATE_CONSEILLER_EMAIL_SUCCESS':
      return {
        ...state,
        'conseiller.email': action.email,
        'tokenError': false,
        'flashMessage': true
      };
    case 'CONFIRMATION_UPDATE_CONSEILLER_EMAIL_FAILURE':
      return {
        ...state,
        patchError: action.error,
        tokenError: true,
        flashMessage: true
      };
    default:
      return state;
  }
}
