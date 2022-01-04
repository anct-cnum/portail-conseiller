import { conseillerService } from '../services/conseiller.service';

export const formulaireHorairesAdresseActions = {
  createHorairesAdresse,
  cacherAdresse,
  isFormulaireValide,
};
function createHorairesAdresse(userId, infoCartographie) {
  return dispatch => {
    dispatch(request());
    conseillerService.createHorairesAdresse(userId, infoCartographie)
    .then(
      result => {
        dispatch(success(result.isUpdated));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
  function request() {
    return { type: 'POST_HORAIRES_ADRESSE_REQUEST' };
  }
  function success(isUpdated) {
    return { type: 'POST_HORAIRES_ADRESSE_SUCCESS', isUpdated };
  }
  function failure(error) {
    return { type: 'POST_HORAIRES_ADRESSE_FAILURE', error };
  }
}

function isFormulaireValide(inputs) {
  let hasErrors = false;
  if (inputs?.lieuActivite === '') {

  }

  console.log(inputs);
  return { type: 'VERIFY_FORM_HORAIRES_ADRESSE', hasErrors };
}

function cacherAdresse(input) {
  return { type: 'CACHER_ADRESSE', input };
}
