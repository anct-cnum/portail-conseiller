import { authHeader, userEntityId } from '../helpers';
import { userService } from './user.service';

export const statistiqueService = {
  getStatsCra,
  getStatsAdmin,
  getTerritoire,
  getStatsTerritoires,
  getStatsCraTerritoire,
  getStatsCraNationale,
  getExportDonneesTerritoire,
  getCodesPostauxCrasConseiller,
  getStatsCraStructure,
  getCodesPostauxCrasConseillerStructure
};

function territoireQueryString(nomOrdre, territoire, ordre, dateDebut, dateFin, page) {
  if (nomOrdre === 'code') {
    nomOrdre = territoire;
  } else if (nomOrdre === 'nom') {
    //Afin d'obtenir nomDepartemement ou nomRegion
    nomOrdre += territoire.slice(4);
  }
  const ordreColonne = nomOrdre ? '&nomOrdre=' + nomOrdre + '&ordre=' + ordre : '';
  const pageIfDefined = page ? '&page=' + page : '';

  return `?territoire=${territoire}&dateDebut=${dateDebut}&dateFin=${dateFin}${pageIfDefined}${ordreColonne}`;
}

function getStatsCra(dateDebut, dateFin, idUser, codePostal, codeCommune) {
  const apiUrlRoot = import.meta.env.VITE_APP_API;
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  const idConseiller = idUser ?? userEntityId();

  // eslint-disable-next-line max-len
  return fetch(`${apiUrlRoot}/stats/cra?dateDebut=${dateDebut}&dateFin=${dateFin}&idConseiller=${idConseiller}&codePostal=${codePostal}&codeCommune=${codeCommune}`,
    requestOptions).then(handleResponse);
}

function getStatsAdmin() {
  const apiUrlRoot = import.meta.env.VITE_APP_API;
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' })
  };

  return fetch(`${apiUrlRoot}/stats/admincoop/dashboard`, requestOptions).then(handleResponse);
}

function getTerritoire(typeTerritoire, idTerritoire, date) {
  const apiUrlRoot = import.meta.env.VITE_APP_API;
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
  const apiUrlRoot = import.meta.env.VITE_APP_API;
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
  const apiUrlRoot = import.meta.env.VITE_APP_API;
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
  };
  conseillerIds = JSON.stringify(conseillerIds);
  return fetch(`${apiUrlRoot}/stats/territoire/cra?dateDebut=${dateDebut}&dateFin=${dateFin}&typeTerritoire=${typeTerritoire}&conseillerIds=${conseillerIds}`,
    requestOptions).then(handleResponse);
}

function getStatsCraStructure(dateDebut, dateFin, idStructure, codePostal) {
  const apiUrlRoot = import.meta.env.VITE_APP_API;
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
  };
  return fetch(`${apiUrlRoot}/stats/structure/cra?dateDebut=${dateDebut}&dateFin=${dateFin}&idStructure=${idStructure}&codePostal=${codePostal}`,
    requestOptions).then(handleResponse);
}

function getStatsCraNationale(dateDebut, dateFin) {
  const apiUrlRoot = import.meta.env.VITE_APP_API;
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

  const apiUrlRoot = import.meta.env.VITE_APP_API;
  const exportTerritoiresRoute = '/exports/territoires.csv/';

  return handleFileResponse(
    await fetch(`${apiUrlRoot}${exportTerritoiresRoute}${territoireQueryString(nomOrdre, territoire, ordre, dateDebut, dateFin)}`, requestOptions)
  );
}

function getCodesPostauxCrasConseiller() {
  const apiUrlRoot = import.meta.env.VITE_APP_API;
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${apiUrlRoot}/stats/cra/codesPostaux/conseiller/${userEntityId()}`, requestOptions).then(handleResponse);
}

function getCodesPostauxCrasConseillerStructure(idStructure) {
  const apiUrlRoot = import.meta.env.VITE_APP_API;
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${apiUrlRoot}/stats/cra/codesPostaux/structure/${idStructure}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        userService.logout();
        window.location.pathname = '/';
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
        window.location.pathname = '/';
      }
      const error = (blob && blob.message) || response.statusText;
      return Promise.reject(error);
    }
    return blob;
  });
}
