import { authHeader } from '../helpers';
import { userService } from './user.service';

const apiUrlRoot = process.env.REACT_APP_API;

export const candidatService = {
  updateCandidat,
  searchVilleCP
};

function updateCandidat(candidat, idConseiller) {
  const requestOptions = {
    method: 'PATCH',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      'distanceMax': candidat.distanceMax,
      'codeCommune': candidat.codeCommune,
      'codePostal': candidat.codePostal,
      'location': candidat.location,
      'ville': candidat.ville,
    })
  };

  return fetch(`${apiUrlRoot}/conseiller/candidat/zoneGeographique/${idConseiller}`, requestOptions).then(handleResponse);
}

function searchVilleCP(adresse) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  return fetch(`${apiUrlRoot}/conseiller/candidat/searchZoneGeographique/${JSON.stringify({ adresse })}`, requestOptions).then(handleResponse);
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
