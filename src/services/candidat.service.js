import axios from 'axios';
import { authHeader } from '../helpers';
import { userService } from './user.service';

const apiUrlRoot = process.env.REACT_APP_API;

export const candidatService = {
  updateCandidat,
  searchVilleCP,
  uploadCurriculumVitae,
  getCurriculumVitae,
  deleteCurriculumVitae
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

function uploadCurriculumVitae(fileCV) {
  return axios({
    method: 'post',
    url: `${apiUrlRoot}/conseillers/cv`,
    data: fileCV,
    headers: Object.assign(authHeader(), { 'Content-Type': 'multipart/form-data' })
  }).then(handleResponse).catch(error => {
    if (error.response) {
      error = error.response?.data?.message;
    } else if (error.request) {
      error = error?.request;
    } else {
      error = error?.message;
    }
    return Promise.reject(error);
  });
}

function getCurriculumVitae(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${apiUrlRoot}/conseillers/${id}/cv`, requestOptions).then(handleFileResponse);
}

function deleteCurriculumVitae(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  };

  return fetch(`${apiUrlRoot}/conseillers/${id}/cv`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  if (response.data) {
    return response.data;
  } else {
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
