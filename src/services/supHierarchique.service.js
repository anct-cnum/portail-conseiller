import { authHeader } from '../helpers';
import { userService } from './user.service';

const apiUrlRoot = import.meta.env.VITE_APP_API;

export const supHierarchiqueService = {
  createSupHierarchique,
};

function createSupHierarchique(supHierarchique, idConseiller) {
  const requestOptions = {
    method: 'PATCH',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      supHierarchique
    })
  };

  return fetch(`${apiUrlRoot}/conseillers/superieur_hierarchique/${idConseiller}`, requestOptions).then(handleResponse);
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
