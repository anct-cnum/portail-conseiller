export const filtersAndSortsActions = {
  updateOrder,
  changeDateDebut,
  changeDateFin,
  changeOrdre,
  changeProfil
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

function changeOrdre(dataOrdre) {
  return { type: 'CHANGE_ORDRE', dataOrdre };
}

function changeProfil(dataProfil) {
  return { type: 'CHANGE_PROFIL', dataProfil };
}
