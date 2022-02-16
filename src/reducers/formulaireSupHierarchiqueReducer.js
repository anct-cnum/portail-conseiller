
const initialState = {
    isCreated: false,
    isUpdated: false,
    showError: false,
};

export default function formulaireSupHierarchique(state = initialState, action) {
    switch (action.type) {
        case 'VERIFY_FORMULAIRE':
            return {
                ...state,
                isUpdated: false,
                showError: true,
                errorsFormulaire: action.errorsForm
            };
        case 'INIT_FORM_SUP_HIERARCHIQUE':
            return {
                ...state,
                numeroTelephone: action.formSupHierarchique?.numeroTelephone,
                email: action.formSupHierarchique?.email,
                prenom: action.formSupHierarchique?.prenom,
                nom: action.formSupHierarchique?.nom,
            };
        case 'UPDATE_NUMEROTELEPHONE':
            console.log(state);
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
        default:
            return state;
    }
}
