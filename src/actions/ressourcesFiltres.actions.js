export const ressourcesFiltresActions = {
  getTagSelectionnes
};
function getTagSelectionnes(tags) {
  return dispatch => {
    dispatch(request(tags));
  };

  function request(tags) {
    return { type: 'GET_TAGS_SELECTED_REQUEST', tags };
  }
}
