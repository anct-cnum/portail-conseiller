import { authHeader, history, userEntityId } from '../helpers';
import { userService } from './user.service';

export const statistiqueService = {
  getStatsCra,
  getStatsAdmin,
  getStatsTerritoires
};

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

function getStatsTerritoires(territoire, dateDebut, dateFin, page) {
  const apiUrlRoot = process.env.REACT_APP_API;
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
  };

  return fetch(
    `${apiUrlRoot}/stats/admincoop/territoires?territoire=${territoire}&dateDebut=${dateDebut}&dateFin=${dateFin}&page=${page}`,
    requestOptions
  ).then(handleResponse);
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
