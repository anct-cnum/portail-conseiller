export const filtersAndSortsActions = {
  updateOrder,
  changeDateDebut,
  changeDateFin,
  changeOrdre,
  changeProfil,
  changeCertifie,
  changeTerritoire,
  changeGroupeCRA
};

function updateOrder(order) {
  return dispatch => {
    dispatch(success(order));
  };

  function success(order) {
    return { type: 'UPDATE_ORDER', order };
  }
}

function changeDateDebut(dateDebut) {
  return { type: 'CHANGE_DATE_DEBUT', dateDebut };
}

function changeDateFin(dateFin) {
  return { type: 'CHANGE_DATE_FIN', dateFin };
}

function changeOrdre(ordreNom) {
  return { type: 'CHANGE_ORDRE', ordreNom };
}

function changeProfil(dataProfil) {
  return { type: 'CHANGE_PROFIL', dataProfil };
}

function changeCertifie(dataCertifie) {
  return { type: 'CHANGE_CERTIFIE', dataCertifie };
}
function changeGroupeCRA(dataGroupeCRA) {
  return { type: 'CHANGE_GROUPECRA', dataGroupeCRA };
}
function changeTerritoire(territoire) {
  return { type: 'CHANGE_TERRITOIRE', territoire };
}

