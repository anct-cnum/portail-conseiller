import { authHeader, history } from '../helpers';
import { userService } from './user.service';

const apiUrlRoot = process.env.REACT_APP_API;

export const permanenceService = {
  getMaPermanence,
  getMesPermanences,
  getListePermanences,
  createPermanence,
  updatePermanence,
  validationFormulaire,
  verifySiret,
  getGeocodeAdresse,
  deletePermanence,
  deleteConseillerPermanence,
  reporterPermanence,
};

function getMaPermanence(idPermanence) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${apiUrlRoot}/permanences/${idPermanence}`, requestOptions).then(handleResponse);
}

function getMesPermanences(idConseiller) {
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

function validationFormulaire(idConseiller) {
  const requestOptions = {
    method: 'PATCH',
    headers: authHeader()
  };
  return fetch(`${apiUrlRoot}/permanences/conseiller/${idConseiller}/statut`, requestOptions).then(handleResponse);
}

function verifySiret(siret) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  return fetch(`${apiUrlRoot}/permanences/verifySiret/${siret}`, requestOptions).then(handleResponse);

}

function getGeocodeAdresse(adresse) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  return fetch(`${apiUrlRoot}/permanences/verifyAdresse/${JSON.stringify({
    numero: adresse.numero, rue: adresse.rue, ville: adresse.ville, codePostal: adresse.codePostal })}`, requestOptions).then(handleResponse);
}

function deletePermanence(idPermanence) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  };

  return fetch(`${apiUrlRoot}/permanence/${idPermanence}`, requestOptions).then(handleResponse);
}

function deleteConseillerPermanence(idPermanence) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  };

  return fetch(`${apiUrlRoot}/permanence/${idPermanence}/conseiller`, requestOptions).then(handleResponse);
}

function reporterPermanence() {
  const requestOptions = {
    method: 'POST',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
  };
  return fetch(`${apiUrlRoot}/permanences/reporter`, requestOptions).then(handleResponse);
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
