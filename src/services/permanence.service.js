import { authHeader, history } from '../helpers';
import { userService } from './user.service';

const apiUrlRoot = process.env.REACT_APP_API;

export const permanenceService = {
  get,
  createPermanence,
  updatePermanence,
};

function get(idConseiller) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${apiUrlRoot}/permanence-conseillers/conseiller/${idConseiller}`, requestOptions).then(handleResponse);
}

function createPermanence(permanence) {

  const requestOptions = {
    method: 'POST',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      permanence
    })
  };

  return fetch(`${apiUrlRoot}/permanence-conseillers/create`, requestOptions).then(handleResponse);
}

function updatePermanence(permanenceId, permanence) {
  const requestOptions = {
    method: 'POST',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      permanence
    })
  };
  return fetch(`${apiUrlRoot}/permanence-conseillers/${permanenceId}`, requestOptions).then(handleResponse);
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
