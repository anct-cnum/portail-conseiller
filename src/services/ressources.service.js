import { authHeader, history } from '../helpers';
import { userService } from './user.service';

const apiUrlRoot = process.env.REACT_APP_API;

export const ressourcesService = {
  getTags,
  getRessources,
};

function getTags() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${apiUrlRoot}/ressources/tags`, requestOptions).then(handleResponse);
}
function getRessources(tags, search) {

  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  let tagsIn = '';
  if (tags?.length > 0) {
    tagsIn = '?tags[$in][]=' + tags.join('&tags[$in][]=');
  }

  let searchText = '';
  if (search) {
    searchText += tags?.length > 0 ? '&' : '?';
    searchText += `$search=${search}`;
  }

  return fetch(`${apiUrlRoot}/ressources${tagsIn}${searchText}`, requestOptions).then(handleResponse);
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
