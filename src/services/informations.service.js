import { authHeader, history } from '../helpers';
import { userService } from './user.service';

const apiUrlRoot = process.env.REACT_APP_API;

export const informationsService = {
  updateInformations,
  confirmConseillerEmail
};

function updateInformations(informations, idConseiller) {
  const requestOptions = {
    method: 'PATCH',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      'telephone': informations.telephone,
      'telephonePro': informations.telephonePro,
      'emailPro': informations.emailPro,
      'email': informations.email,
      'dateDeNaissance': informations.dateDeNaissance,
      'sexe': informations.sexe
    })
  };

  return fetch(`${apiUrlRoot}/conseillers/updateInfosConseiller/${idConseiller}`, requestOptions).then(handleResponse);
}

function confirmConseillerEmail(token) {
  const requestOptions = {
    method: 'PATCH',
    headers: authHeader(),
  };
  let uri = `${apiUrlRoot}/conseillers/confirmation-email/${token}`;
  return fetch(uri, requestOptions).then(handleResponse);
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
