import { structureService } from '../services/structure.service.js';

export const structureActions = {
  get,
  update,
  isFormulaireHorairesAdresseChecked,
  closeFormulaireHorairesAdresse,
};

function get(id) {
  return dispatch => {
    dispatch(request());

    structureService.get(id)
    .then(
      structure => dispatch(success(structure)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_STRUCTURE_REQUEST' };
  }
  function success(structure) {
    return { type: 'GET_STRUCTURE_SUCCESS', structure };
  }
  function failure(error) {
    return { type: 'GET_STRUCTURE_FAILURE', error };
  }
}

function update(structure) {
  return dispatch => {
    dispatch(request());

    structureService.update(structure)
    .then(
      result => dispatch(success(result)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'UPDATE_STRUCTURE_REQUEST' };
  }
  function success(result) {
    return { type: 'UPDATE_STRUCTURE_SUCCESS', result };
  }
  function failure(error) {
    return { type: 'UPDATE_STRUCTURE_FAILURE', error };
  }
}

function isFormulaireHorairesAdresseChecked(info, isHorairesAdresseUpdated) {
  const show = !info || (info && isHorairesAdresseUpdated);
  return { type: 'SHOW_FORMULAIRE_HORAIRES_ADRESSE', show };
}

function closeFormulaireHorairesAdresse() {
  return { type: 'CLOSE_FORMULAIRE_HORAIRES_ADRESSE' };
}
