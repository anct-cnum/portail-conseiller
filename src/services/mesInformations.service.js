import { authHeader, history } from '../helpers';
import { userService } from './user.service';

const apiUrlRoot = process.env.REACT_APP_API;

export const mesInformationsService = {
  updateContratActif,
};

function updateContratActif(contratActif, idConseiller) {
  const requestOptions = {
    method: 'PATCH',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      typeContrat: contratActif.typeContrat,
      dateDebut: contratActif.dateDebut,
      dateFin: contratActif.dateFin,
    })
  };

  return fetch(`${apiUrlRoot}/conseillers/updateContratActif/${idConseiller}`, requestOptions).then(handleResponse);
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
