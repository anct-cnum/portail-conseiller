const initialState = {
  error: false,
  informationsManquantes: [],
};

export default function mesInformations(state = initialState, action) {
  switch (action.type) {
    case 'VERIFY_FORMULAIRE':
      return {
        ...state,
        errorsFormulaire: action.errorsForm
      };
    case 'INIT_MES_INFORMATIONS':
      return {
        ...state,
        contratActif: action.contratActif
      };
    case 'UPDATE_TYPECONTRAT':
      delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.typeContrat)[0]?.typeContrat;
      if (action.value === 'CDI') {
        delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.dateFin)[0]?.dateFin;
      }
      return {
        ...state,
        typeContrat: action.value,
        error: false,
      };
    case 'UPDATE_DATEDEBUT':
      delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.dateDebut)[0]?.dateDebut;
      return {
        ...state,
        dateDebut: action.value,
        error: false,
      };
    case 'UPDATE_DATEFIN':
      delete state?.errorsFormulaire?.errors?.filter(erreur => erreur?.dateFin)[0]?.dateFin;
      return {
        ...state,
        dateFin: action.value,
        error: false,
      };
    case 'POST_CONTRAT_ACTIF_REQUEST':
      return {
        ...state,
        error: false,
        success: false,
        loading: true
      };
    case 'POST_CONTRAT_ACTIF_SUCCESS':
      return {
        ...state,
        success: action.success,
        loading: false
      };
    case 'POST_CONTRAT_ACTIF_FAILURE':
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case 'GET_INFORMATIONS_MANQUANTES':
      return {
        ...state,
        informationsManquantes: action.informationsManquantes,
      };
    case 'GET_PLUS_TARD':
      return {
        ...state
      };
    default:
      return state;
  }
}
