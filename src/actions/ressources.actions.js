import { ressourcesService } from '../services/ressources.service';

export const ressourcesActions = {
  getTags,
  getRessources,
};

function getTags() {
  return dispatch => {
    dispatch(request());

    ressourcesService.getTags()
    .then(
      results => {
        dispatch(success(results.tags));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_TAGS_REQUEST' };
  }
  function success(tags) {
    return { type: 'GET_TAGS_SUCCESS', tags };
  }
  function failure(error) {
    return { type: 'GET_TAGS_FAILURE', error };
  }
}

function getRessources(tags) {
  return dispatch => {
    dispatch(request());
    ressourcesService.getRessources(tags)
    .then(
      results => {
        dispatch(success(results?.data));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_RESSOURCES_REQUEST' };
  }
  function success(ressources) {
    return { type: 'GET_RESSOURCES_SUCCESS', ressources };
  }
  function failure(error) {
    return { type: 'GET_RESSOURCES_FAILURE', error };
  }
}
