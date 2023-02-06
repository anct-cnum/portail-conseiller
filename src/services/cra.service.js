import { authHeader, history, userEntityId } from '../helpers';
import { userService } from './user.service';

export const craService = {
  createCra,
  getCra,
  updateCra,
  deleteCra,
  countByPermanence,
  searchSuggestion,
};

const apiUrlRoot = process.env.REACT_APP_API;

function createCra(cra) {
  // eslint-disable-next-line no-unused-vars
  const { idStructure, ...craObj } = cra;

  const requestOptions = {
    method: 'POST',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      cra: craObj,
      idConseiller: userEntityId(),
      idStructure: cra.idStructure
    })
  };

  return fetch(`${apiUrlRoot}/cras`, requestOptions).then(handleResponse);
}

function getCra(id) {

  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${apiUrlRoot}/cras/cra?id=${id}`, requestOptions).then(handleResponse);
}

function updateCra(cra, conseillerId) {
  const requestOptions = {
    method: 'PATCH',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      cra,
      conseillerId
    })
  };
  return fetch(`${apiUrlRoot}/cras`, requestOptions).then(handleResponse);
}

function deleteCra(craId) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  };
  return fetch(`${apiUrlRoot}/cras?craId=${craId}`, requestOptions).then(handleResponse);
}

function countByPermanence(permanenceId) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  return fetch(`${apiUrlRoot}/cras/countByPermanence?permanenceId=${permanenceId}`, requestOptions).then(handleResponse);
}

function searchSuggestion(sousTheme) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  return fetch(`${apiUrlRoot}/cras/searchSousThemes?sousTheme=${sousTheme}`, requestOptions).then(handleResponse);
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
