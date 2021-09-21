import dayjs from 'dayjs';
import { authHeader, history } from '../helpers';
import { userService } from './user.service';

const apiUrlRoot = process.env.REACT_APP_API;

export const conseillerService = {
  get,
  getAll,
  getStatistiquesPDF,
  createSexeAge
};

function get(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${apiUrlRoot}/conseillers/${id}`, requestOptions).then(handleResponse);
}

function getAll(page, dateDebut, dateFin, filtreProfil, nomOrdre, ordre) {

  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  const ordreColonne = nomOrdre ? '&$sort[' + nomOrdre + ']=' + ordre : '';
  const filterDateStart = (dayjs(new Date(dateDebut)).format('DD/MM/YYYY') !== dayjs(new Date()).format('DD/MM/YYYY') && dateDebut !== '') ?
    `&datePrisePoste[$gt]=${new Date(dateDebut).toISOString()}` : '';

  const filterDateEnd = (dateFin !== '') ? `&datePrisePoste[$lt]=${new Date(dateFin).toISOString()}` : '';

  /*
  const filterSort = `&$sort[datePrisePoste]=${sortOrder}`;

  let filterProfil = '';
  switch (profil) {
    case 'inactifs':
      filterProfil = `&userCreated=false`;
      break;
    case 'actifs':
      filterProfil = `&userCreated=true`;
      break;
    case 'certifies':
      filterProfil = `&certifie=true`;
      break;
    default:
      break;
  }
*/
  //let uri = `${apiUrlRoot}/conseillers?$skip=${page}&statut=RECRUTE${filterSort}${filterProfil}${filterDateStart}${filterDateEnd}`;
  //`${apiUrlRoot}/stats/admincoop/territoires?territoire=${territoire}&dateDebut=${dateDebut}&dateFin=${dateFin}&page=${page}${ordreColonne}`,
  let uri = `${apiUrlRoot}/conseillers?$skip=${page}&statut=RECRUTE${filterDateStart}${filterDateEnd}${ordreColonne}`;

  return fetch(uri, requestOptions).then(handleResponse);
}

function getStatistiquesPDF(dates) {
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
  };

  return fetch(`${apiUrlRoot}/conseillers/statistiques.pdf?dateDebut=${dates.dateDebut}&dateFin=${dates.dateFin}`, requestOptions).then(handleFileResponse);
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
