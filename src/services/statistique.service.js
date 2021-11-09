import { authHeader, history, userEntityId } from '../helpers';
import { userService } from './user.service';

export const statistiqueService = {
  getStatsCra,
  getStatsAdmin,
  getTerritoire,
  getStatsTerritoires,
  getStatsCraTerritoire,
  getStatsCraNationale,
  getExportDonneesTerritoire,
};

function territoireQueryString(nomOrdre, territoire, ordre, dateDebut, dateFin, page) {
  if (nomOrdre === 'code' || nomOrdre === 'nom') {
    nomOrdre = nomOrdre + territoire.charAt(0).toUpperCase() + territoire.slice(1);
  }
  const ordreColonne = nomOrdre ? '&nomOrdre=' + nomOrdre + '&ordre=' + ordre : '';
  const pageIfDefined = page ? '&page=' + page : '';

  return `?territoire=${territoire}&dateDebut=${dateDebut}&dateFin=${dateFin}${pageIfDefined}${ordreColonne}`;
}

function getStatsCra(dateDebut, dateFin, idUser) {
  const apiUrlRoot = process.env.REACT_APP_API;
  const requestOptions = {
    method: 'POST',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      'dateDebut': dateDebut,
      'dateFin': dateFin,
      'idConseiller': idUser ?? userEntityId()
    })
  };

  return fetch(`${apiUrlRoot}/stats/cra`, requestOptions).then(handleResponse);
}

function getStatsAdmin() {
  const apiUrlRoot = process.env.REACT_APP_API;
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' })
  };

  return fetch(`${apiUrlRoot}/stats/admincoop/dashboard`, requestOptions).then(handleResponse);
}

function getTerritoire(typeTerritoire, idTerritoire, date) {
  const apiUrlRoot = process.env.REACT_APP_API;
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
  };
  return fetch(
    `${apiUrlRoot}/stats/admincoop/territoire?typeTerritoire=${typeTerritoire}&idTerritoire=${idTerritoire}&dateFin=${date}`,
    requestOptions
  ).then(handleResponse);
}

function getStatsTerritoires(territoire, dateDebut, dateFin, page, nomOrdre, ordre) {
  const apiUrlRoot = process.env.REACT_APP_API;
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
  };

  return fetch(
    `${apiUrlRoot}/stats/admincoop/territoires${territoireQueryString(nomOrdre, territoire, ordre, dateDebut, dateFin, page)}`,
    requestOptions
  ).then(handleResponse);
}

function getStatsCraTerritoire(dateDebut, dateFin, typeTerritoire, conseillerIds) {
  const apiUrlRoot = process.env.REACT_APP_API;
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
  };
  conseillerIds = JSON.stringify(conseillerIds);
  return fetch(`${apiUrlRoot}/stats/territoire/cra?dateDebut=${dateDebut}&dateFin=${dateFin}&typeTerritoire=${typeTerritoire}&conseillerIds=${conseillerIds}`,
    requestOptions).then(handleResponse);
}

function getStatsCraNationale(dateDebut, dateFin) {
  const apiUrlRoot = process.env.REACT_APP_API;
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${apiUrlRoot}/stats/nationales/cra?dateDebut=${dateDebut}&dateFin=${dateFin}`,
    requestOptions).then(handleResponse);
}

async function getExportDonneesTerritoire(territoire, dateDebut, dateFin, nomOrdre, ordre) {
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(
      authHeader(), {
        'Accept': 'text/plain',
        'Content-Type': 'text/plain'
      })
  };

  const apiUrlRoot = process.env.REACT_APP_API;
  const exportTerritoiresRoute = '/exports/territoires.csv/';

  return handleFileResponse(
    await fetch(`${apiUrlRoot}${exportTerritoiresRoute}${territoireQueryString(nomOrdre, territoire, ordre, dateDebut, dateFin)}`, requestOptions)
  );
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        userService.logout();
        history.push('/');
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

function handleFileResponse(response) {
  return response.blob().then(blob => {
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        userService.logout();
        history.push('/');
      }
      const error = (blob && blob.message) || response.statusText;
      return Promise.reject(error);
    }
    return blob;
  });
}
