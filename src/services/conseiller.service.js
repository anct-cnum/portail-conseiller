import dayjs from 'dayjs';
import { authHeader, history } from '../helpers';
import { userService } from './user.service';

const apiUrlRoot = process.env.REACT_APP_API;

export const conseillerService = {
  get,
  getAll,
  getStatistiquesPDF,
  getStatistiquesAdminCoopPDF,
  getStatistiquesCSV,
  getStatistiquesAdminCoopCSV,
  createSexeAge,
  getExportDonneesCnfs,
  getStatistiquesHubCSV
};

function get(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${apiUrlRoot}/conseillers/${id}`, requestOptions).then(handleResponse);
}

function cnfsQueryStringParameters(nomOrdre, ordre, dateDebut, dateFin, filtreProfil, filtreGroupeCRA, filtreParNom, filtreCertifie, idStructure) {
  const ordreColonne = nomOrdre ? '&$sort[' + nomOrdre + ']=' + ordre : '';
  const filterDateStart = (dayjs(new Date(dateDebut)).format('DD/MM/YYYY') !== dayjs(new Date()).format('DD/MM/YYYY') && dateDebut !== '') ?
    `&datePrisePoste[$gt]=${new Date(dateDebut).toISOString()}` : '';
  const filterDateEnd = (dateFin !== '') ? `&datePrisePoste[$lt]=${new Date(dateFin).toISOString()}` : '';
  const filterStructureId = idStructure ? `&structureId=${idStructure}` : '';
  const filterByName = filtreParNom ? `&nom=${filtreParNom.toUpperCase()}` : '';
  let profil = '';
  switch (filtreProfil) {
    case 'tous':
      profil = '';
      break;
    case 'active':
      profil = `&isUserActif=true`;
      break;
    case 'inactive':
      profil = `&isUserActif=false`;
      break;
    default:
      break;
  }
  let certifie = '';
  switch (filtreCertifie) {
    case 'tous':
      certifie = '';
      break;
    case 'active':
      certifie = `&certifie=true`;
      break;
    case 'inactive':
      certifie = `&certifie=false`;
      break;
    default:
      break;
  }
  let groupeCRA = '';
  if (filtreGroupeCRA !== 'tous' && filtreGroupeCRA !== undefined) {
    const numeroGroupe = /\d/.exec(filtreGroupeCRA)[0];
    groupeCRA = `&groupeCRA=${numeroGroupe}`;
  }

  return { ordreColonne, filterDateStart, filterDateEnd, filterStructureId, profil, groupeCRA, filterByName, certifie };
}

function getAll(page, dateDebut, dateFin, filtreProfil, filtreCertifie, filtreGroupeCRA, filtreParNom, nomOrdre, ordre, idStructure = null) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  let {
    ordreColonne,
    filterDateStart,
    filterDateEnd,
    profil,
    groupeCRA,
    filterByName,
    certifie,
    filterStructureId
  } = cnfsQueryStringParameters(nomOrdre, ordre, dateDebut, dateFin, filtreProfil, filtreGroupeCRA, filtreParNom, filtreCertifie, idStructure);
  // eslint-disable-next-line max-len
  let uri = `${apiUrlRoot}/conseillers?$skip=${page}&statut=RECRUTE${profil}${certifie}${groupeCRA}${filterByName}${filterDateStart}${filterDateEnd}${filterStructureId}${ordreColonne}`;

  return fetch(uri, requestOptions).then(handleResponse);
}

function getStatistiquesPDF(idConseiller, dateDebut, dateFin, codePostal) {
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
  };

  return fetch(
    `${apiUrlRoot}/conseillers/${idConseiller}/statistiques.pdf?dateDebut=${dateDebut}&dateFin=${dateFin}&codePostal=${codePostal}`,
    requestOptions).then(response => !response.ok ? handleResponse(response) : handleFileResponse(response));
}

function getStatistiquesAdminCoopPDF(dateDebut, dateFin, type, idType, codePostal) {
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
  };

  // eslint-disable-next-line max-len
  return fetch(`${apiUrlRoot}/stats/admincoop/statistiques.pdf?dateDebut=${dateDebut}&dateFin=${dateFin}&type=${type}&idType=${idType}&codePostal=${codePostal}`,
    requestOptions).then(response => !response.ok ? handleResponse(response) : handleFileResponse(response));
}

function getStatistiquesCSV(dateDebut, dateFin, codePostal) {
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
  };

  return fetch(`${apiUrlRoot}/conseillers/statistiques.csv?dateDebut=${dateDebut}&dateFin=${dateFin}&codePostal=${codePostal}`,
    requestOptions).then(handleFileResponse);
}

function getStatistiquesAdminCoopCSV(dateDebut, dateFin, type, idType, conseillerIds, codePostal) {
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
  };

  // eslint-disable-next-line max-len
  return fetch(`${apiUrlRoot}/stats/admincoop/statistiques.csv?dateDebut=${dateDebut}&dateFin=${dateFin}&type=${type}&idType=${idType}&codePostal=${codePostal}&conseillerIds=${conseillerIds}`,
    requestOptions).then(handleFileResponse);
}

function getStatistiquesHubCSV() {
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
  };

  return fetch(`${apiUrlRoot}/exports/hubcoop/cnfs.csv`,
    requestOptions).then(handleFileResponse);
}

function createSexeAge(user) {
  const requestOptions = {
    method: 'POST',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      sexe: user.sexe,
      dateDeNaissance: user.dateDeNaissance
    })
  };

  return fetch(`${apiUrlRoot}/conseillers/createSexeAge`, requestOptions).then(handleResponse);
}

function getExportDonneesCnfs(dateDebut, dateFin, filtreProfil, filtreCertifie, filtreGroupeCRA, filtreParNom, nomOrdre, ordre, idStructure = null) {
  const requestOptions = {
    method: 'GET',
    headers: {
      ...authHeader(),
      'Accept': 'text/plain',
      'Content-Type': 'text/plain'
    }
  };

  let {
    ordreColonne,
    filterDateStart,
    filterDateEnd,
    profil,
    groupeCRA,
    filterByName,
    certifie,
    filterStructureId
  } = cnfsQueryStringParameters(nomOrdre, ordre, dateDebut, dateFin, filtreProfil, filtreGroupeCRA, filtreParNom, filtreCertifie, idStructure);

  const exportCnfsRoute = '/exports/cnfs.csv';
  // eslint-disable-next-line max-len
  return fetch(`${apiUrlRoot}${exportCnfsRoute}?statut=RECRUTE${profil}${certifie}${groupeCRA}${filterByName}${filterDateStart}${filterDateEnd}${filterStructureId}${ordreColonne}`,
    requestOptions
  ).then(handleFileResponse);
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
