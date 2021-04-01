export const craActions = {
  getSearchlist,
  searchInput,
  updateCP,
  updateCanal,
  updateActivite,
};

function getSearchlist() {
  return { type: 'GET_SEARCH_LIST' };
}

function searchInput(search) {
  return { type: 'SEARCH_INPUT', search };
}

function updateCP(cp) {
  return { type: 'UPDATE_CP', cp };
}

function updateCanal(canal) {
  return { type: 'UPDATE_CANAL', canal };
}

function updateActivite(activite) {
  return { type: 'UPDATE_ACTIVITE', activite };
}
