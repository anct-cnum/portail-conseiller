export const craActions = {
  getSearchlist,
  searchInput,
  updateCP,
  updateCanal,
  updateActivite,
  updateNbParticipants,
  updateAge,
  updateStatut,
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

function updateNbParticipants(nbParticipants) {
  return { type: 'UPDATE_NB_PARTICIPANTS', nbParticipants };
}

function updateAge(age) {
  return { type: 'UPDATE_AGE', age };
}

function updateStatut(statut) {
  return { type: 'UPDATE_STATUT', statut };
}
