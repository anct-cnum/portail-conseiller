import { authHeader, history } from '../helpers';
import { userService } from './user.service';

const apiUrlRoot = process.env.REACT_APP_API;

export const permanenceService = {
  get,
  getListePermanences,
  createPermanence,
  updatePermanence,
  verifySiret,
};

function get(idConseiller) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${apiUrlRoot}/permanences/conseiller/${idConseiller}`, requestOptions).then(handleResponse);
}

function getListePermanences(idStructure) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${apiUrlRoot}/permanences/structure/${idStructure}`, requestOptions).then(handleResponse);
}

function createPermanence(idConseiller, permanence) {

  const requestOptions = {
    method: 'POST',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      permanence
    })
  };
  return fetch(`${apiUrlRoot}/permanences/conseiller/${idConseiller}/create`, requestOptions).then(handleResponse);
}

function updatePermanence(idPermanence, idConseiller, permanence) {
  const requestOptions = {
    method: 'PATCH',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      permanence
    })
  };
  return fetch(`${apiUrlRoot}/permanences/conseiller/${idConseiller}/update/${idPermanence}`, requestOptions).then(handleResponse);
}

function verifySiret(siret) {
  const requestOptions = {
    method: 'POST',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      siret
    })
  };
  return fetch(`${apiUrlRoot}/permanences/verifySiret`, requestOptions).then(handleResponse);

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
