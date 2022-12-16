import { authHeader, history } from '../helpers';
import { userService } from './user.service';

const apiUrlRoot = process.env.REACT_APP_API;

export const historiqueCras = {
  getHistoriqueCrasListe,
  getHistoriqueCrasThematiques,
};

function getHistoriqueCrasListe(theme, canal, type, page) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  console.log(canal);
  console.log(type);
  return fetch(`${apiUrlRoot}/historique-cras/liste?theme=${theme}&canal=${canal}&type=${type}&page=${page}`, requestOptions).then(handleResponse);
}

function getHistoriqueCrasThematiques() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${apiUrlRoot}/historique-cras/thematiques`, requestOptions).then(handleResponse);
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
