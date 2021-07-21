import { authHeader, history } from '../helpers';
import { userService } from './user.service';
import axios from 'axios';

const apiUrlRoot = process.env.REACT_APP_API;

export const conseillerService = {
  get,
  getStatistiquesPDF,
};

function get(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${apiUrlRoot}/conseillers/${id}`, requestOptions).then(handleResponse);
}

function getStatistiquesPDF() {

  return axios(`${apiUrlRoot}/conseillers/statistiquesPDF`, {
    responseType: 'arraybuffer',
    headers: Object.assign(authHeader(), { 'Accept': 'application/pdf' })
  });
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
