const initialState = {
  isUpdated: false,
  showError: false,
};

export default function formulaireInformations(state = initialState, action) {
  switch (action.type) {
    case 'VERIFY_FORMULAIRE':
      return {
        ...state,
        errorsFormulaire: action.errorsForm
      };
    case 'INIT_FORM_INFORMATIONS':
      return {
        ...state,
        telephone: action.telephone,
        telephonePro: action.telephonePro,
        emailPro: action.emailPro,
        email: action.email,
        dateDeNaissance: action.dateDeNaissance,
        sexe: action.sexe
      };
    case 'INIT_FORM_INFORMATIONS_MESSAGE':
      return {
        ...state,
        isUpdated: false,
        showConfirmationMail: null,
        showConfirmationMailPro: null
      };
    case 'UPDATE_CONSEILLERTELEPHONE':
      delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.telephone)[0]?.telephone;
      return {
        ...state,
        telephone: action.value,
      };
    case 'UPDATE_CONSEILLERSEXE':
      delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.sexe)[0]?.sexe;
      return {
        ...state,
        sexe: action.value,
      };
    case 'UPDATE_CONSEILLERDATEDENAISSANCE':
      delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.dateDeNaissance)[0]?.dateDeNaissance;
      return {
        ...state,
        dateDeNaissance: action.value,
      };
    case 'UPDATE_CONSEILLERTELEPHONEPRO':
      delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.telephonePro)[0]?.telephonePro;
      return {
        ...state,
        telephonePro: action.value,
      };
    case 'UPDATE_CONSEILLEREMAILPRO':
      delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.emailPro)[0]?.emailPro;
      return {
        ...state,
        emailPro: action.value,
      };
    case 'UPDATE_CONSEILLEREMAIL':
      delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.email)[0]?.email;
      return {
        ...state,
        email: action.value,
      };
    case 'POST_INFORMATIONS_REQUEST':
      return {
        ...state,
        isUpdated: false,
        showError: false,
      };
    case 'POST_INFORMATIONS_SUCCESS':
      return {
        ...state,
        'isUpdated': true,
        'showError': false,
        'conseiller.prenom': action.conseiller.prenom,
        'conseiller.nom': action.conseiller.nom,
        'conseiller.telephone': action.conseiller.telephone,
        'conseiller.telephonePro': action.conseiller.telephonePro,
        'conseiller.dateDeNaissance': action.conseiller.dateDeNaissance,
        'conseiller.sexe': action.conseiller.sexe,
        'showConfirmationMail': action.initModifMailPersoConseiller,
        'showConfirmationMailPro': action.initModifMailProConseiller,
        'error': false,
      };
    case 'POST_INFORMATIONS_FAILURE':
      return {
        ...state,
        showError: true,
        error: action.error,
      };
    case 'CONFIRMATION_UPDATE_CONSEILLER_EMAIL_REQUEST':
      return {
        ...state,
        loading: true,
        flashMessage: false
      };
    case 'CONFIRMATION_UPDATE_CONSEILLER_EMAIL_PERSO_SUCCESS':
      return {
        ...state,
        'conseiller.email': action.email,
        'tokenError': false,
        'flashMessage': true
      };
    case 'CONFIRMATION_UPDATE_CONSEILLER_EMAIL_PRO_SUCCESS':
      return {
        ...state,
        'conseiller.emailPro': action.emailPro,
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
