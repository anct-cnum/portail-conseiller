import dayjs from 'dayjs';
import { authHeader } from '../helpers';
import { userService } from './user.service';

const apiUrlRoot = import.meta.env.VITE_APP_API;

export const conseillerService = {
  get,
  getAll,
  getConseillersSubordonnes,
  getStatistiquesPDF,
  getStatistiquesAdminCoopPDF,
  getStatistiquesCSV,
  getStatistiquesExcel,
  getStatistiquesAdminCoopCSV,
  getStatistiquesAdminCoopExcel,
  createSexeAge,
  getExportDonneesCnfs,
  exportDonneesSubordonnes,
  getStatistiquesHubCSV,
  isSubordonne,
  getExportDonneesCnfsWithoutCRA,
  updateDisponibilite,
  updateDateDisponibilite,
};

function get(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${apiUrlRoot}/conseillers/${id}`, requestOptions).then(handleResponse);
}

function cnfsQueryStringParameters(nomOrdre, ordre, dateDebut, dateFin, filtreProfil, filtreGroupeCRA, filtreParNom,
  filtreCertifie, idStructure, idCoordinateur = null, region) {

  const ordreColonne = nomOrdre ? '&$sort[' + nomOrdre + ']=' + ordre : '';
  const filterDateStart = (dayjs(new Date(dateDebut)).format('DD/MM/YYYY') !== dayjs(new Date()).format('DD/MM/YYYY') && dateDebut !== '') ?
    `&datePrisePoste[$gt]=${new Date(dateDebut).toISOString()}` : '';
  const filterDateEnd = (dateFin !== '') ? `&datePrisePoste[$lt]=${new Date(dateFin).toISOString()}` : '';
  const filterStructureId = idStructure ? `&structureId=${idStructure}` : '';
  const filterCoordinateurId = idCoordinateur ? `&coordinateurId=${idCoordinateur}` : '';
  const filterByName = filtreParNom ? `&$search=${filtreParNom}` : '';
  const filterRegion = region !== null && region !== 'tous' ? `&codeRegionStructure=${region}` : '';

  let profil = '';
  switch (filtreProfil) {
    case 'tous':
      profil = '';
      break;
    case 'active':
      profil = `&isUserActif=true`;
      break;
    case 'inactive':
      profil = `&isUserActif=false`;
      break;
    default:
      break;
  }
  let certifie = '';
  switch (filtreCertifie) {
    case 'tous':
      certifie = '';
      break;
    case 'active':
      certifie = `&certifie=true`;
      break;
    case 'inactive':
      certifie = `&certifie=false`;
      break;
    default:
      break;
  }
  let groupeCRA = '';
  if (filtreGroupeCRA !== 'tous' && filtreGroupeCRA !== undefined && filtreGroupeCRA !== null) {
    const numeroGroupe = /\d/.exec(filtreGroupeCRA)[0];
    groupeCRA = `&groupeCRA=${numeroGroupe}`;
  }

  return { ordreColonne, filterDateStart, filterDateEnd, filterStructureId, profil, groupeCRA, filterByName, certifie, filterCoordinateurId, filterRegion };

}

function getAll(page, dateDebut, dateFin, filtreProfil, filtreCertifie, filtreGroupeCRA, filtreParNom, nomOrdre, ordre, idStructure = null, region) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  let {
    ordreColonne,
    filterDateStart,
    filterDateEnd,
    profil,
    groupeCRA,
    filterByName,
    certifie,
    filterStructureId,
    filterRegion
  } = cnfsQueryStringParameters(nomOrdre, ordre, dateDebut, dateFin, filtreProfil, filtreGroupeCRA, filtreParNom, filtreCertifie, idStructure, null, region);
  // eslint-disable-next-line max-len
  const uri = `${apiUrlRoot}/conseillers?$skip=${page}&statut=RECRUTE${profil}${certifie}${groupeCRA}${filterByName}${filterDateStart}${filterDateEnd}${filterStructureId}${ordreColonne}${filterRegion}`;

  return fetch(uri, requestOptions).then(handleResponse);
}

function getConseillersSubordonnes(page, dateDebut, dateFin, filtreProfil, ordreNom, ordre, idCoordinateur) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  // eslint-disable-next-line max-len
  const uri = `${apiUrlRoot}/conseillers/subordonnes?page=${page}&dateDebut=${dateDebut}&dateFin=${dateFin}&filtreProfil=${filtreProfil}&ordreNom=${ordreNom}&ordre=${ordre}&idCoordinateur=${idCoordinateur}`;

  return fetch(uri, requestOptions).then(handleResponse);
}

function getStatistiquesPDF(idConseiller, dateDebut, dateFin, codePostal, ville) {
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
  };

  return fetch(
    `${apiUrlRoot}/conseillers/${idConseiller}/statistiques.pdf?dateDebut=${dateDebut}&dateFin=${dateFin}&codePostal=${codePostal}&ville=${ville}`,
    requestOptions).then(response => !response.ok ? handleResponse(response) : handleFileResponse(response));
}

function getStatistiquesAdminCoopPDF(dateDebut, dateFin, type, idType, codePostal) {
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
  };

  return fetch(
    `${apiUrlRoot}/stats/admincoop/statistiques.pdf?dateDebut=${dateDebut}&dateFin=${dateFin}&type=${type}&idType=${idType}&codePostal=${codePostal}`,
    requestOptions).then(response => !response.ok ? handleResponse(response) : handleFileResponse(response));
}

function getStatistiquesCSV(dateDebut, dateFin, codePostal, ville, codeCommune, idSubordonne) {
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
  };

  return fetch(
    // eslint-disable-next-line max-len
    `${apiUrlRoot}/conseillers/statistiques.csv?dateDebut=${dateDebut}&dateFin=${dateFin}&codePostal=${codePostal}&ville=${ville}&codeCommune=${codeCommune}&idSubordonne=${idSubordonne}`,
    requestOptions).then(handleFileResponse);
}

function getStatistiquesExcel(dateDebut, dateFin, codePostal, ville, codeCommune, idSubordonne) {
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
  };

  return fetch(
    // eslint-disable-next-line max-len
    `${apiUrlRoot}/conseillers/statistiques.xlsx?dateDebut=${dateDebut}&dateFin=${dateFin}&codePostal=${codePostal}&ville=${ville}&codeCommune=${codeCommune}&idSubordonne=${idSubordonne}`,
    requestOptions).then(handleFileResponse);
}

function getStatistiquesAdminCoopCSV(dateDebut, dateFin, type, idType, conseillerIds, codePostal) {
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
  };

  return fetch(
    // eslint-disable-next-line max-len
    `${apiUrlRoot}/stats/admincoop/statistiques.csv?dateDebut=${dateDebut}&dateFin=${dateFin}&type=${type}&idType=${idType}&codePostal=${codePostal}&conseillerIds=${conseillerIds}`,
    requestOptions).then(handleFileResponse);
}

function getStatistiquesAdminCoopExcel(dateDebut, dateFin, type, idType, conseillerIds, codePostal) {
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
  };

  return fetch(
    // eslint-disable-next-line max-len
    `${apiUrlRoot}/stats/admincoop/statistiques.xlsx?dateDebut=${dateDebut}&dateFin=${dateFin}&type=${type}&idType=${idType}&codePostal=${codePostal}&conseillerIds=${conseillerIds}`,
    requestOptions).then(handleFileResponse);
}

function getStatistiquesHubCSV() {
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
  };

  return fetch(`${apiUrlRoot}/exports/hubcoop/cnfs.csv`,
    requestOptions).then(handleFileResponse);
}

function createSexeAge(user) {
  const requestOptions = {
    method: 'POST',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      sexe: user.sexe,
      dateDeNaissance: user.dateDeNaissance
    })
  };

  return fetch(`${apiUrlRoot}/conseillers/createSexeAge`, requestOptions).then(handleResponse);
}

function getExportDonneesCnfs(
  dateDebut,
  dateFin,
  filtreProfil,
  filtreCertifie,
  filtreGroupeCRA,
  filtreParNom,
  nomOrdre,
  ordre,
  idStructure = null,
  region = 'tous'
) {
  const requestOptions = {
    method: 'GET',
    headers: {
      ...authHeader(),
      'Accept': 'text/plain',
      'Content-Type': 'text/plain'
    }
  };

  const {
    ordreColonne,
    filterDateStart,
    filterDateEnd,
    profil,
    groupeCRA,
    filterByName,
    certifie,
    filterStructureId,
    filterRegion
  } = cnfsQueryStringParameters(nomOrdre, ordre, dateDebut, dateFin, filtreProfil, filtreGroupeCRA, filtreParNom, filtreCertifie, idStructure, null, region);

  const exportCnfsRoute = '/exports/cnfs.csv';

  return fetch(
    // eslint-disable-next-line max-len
    `${apiUrlRoot}${exportCnfsRoute}?statut=RECRUTE${profil}${certifie}${groupeCRA}${filterByName}${filterDateStart}${filterDateEnd}${filterStructureId}${ordreColonne}${filterRegion}`,
    requestOptions
  ).then(handleFileResponse);
}

function exportDonneesSubordonnes(dateDebut, dateFin, filtreProfil, nomOrdre, ordre, idCoordinateur) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  const {
    ordreColonne,
    filterDateStart,
    filterDateEnd,
    profil,
    filterCoordinateurId
  } = cnfsQueryStringParameters(nomOrdre, ordre, dateDebut, dateFin, filtreProfil, null, null, null, null, idCoordinateur, null);

  const exportCnfsRoute = '/exports/subordonnes.csv';

  return fetch(
    `${apiUrlRoot}${exportCnfsRoute}?statut=RECRUTE${profil}${filterDateStart}${filterDateEnd}${filterCoordinateurId}${ordreColonne}`,
    requestOptions
  ).then(handleFileResponse);
}

function isSubordonne(coordinateurId, conseillerId) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  const uri = `${apiUrlRoot}/conseiller/isSubordonne?idCoordinateur=${coordinateurId}&idConseiller=${conseillerId}`;

  return fetch(uri, requestOptions).then(handleResponse);
}

function getExportDonneesCnfsWithoutCRA() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  const exportCnfsRoute = '/exports-without-cra/cnfs.csv';

  return fetch(`${apiUrlRoot}${exportCnfsRoute}`, requestOptions).then(handleFileResponse);
}

function updateDisponibilite(idConseiller, disponible) {
  const requestOptions = {
    method: 'PATCH',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      disponible,
    })
  };

  return fetch(`${apiUrlRoot}/conseillers/update_disponibilite/${idConseiller}`, requestOptions).then(handleResponse);
}

function updateDateDisponibilite(idConseiller, dateDisponibilite) {
  const requestOptions = {
    method: 'PATCH',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      dateDisponibilite,
    })
  };
  return fetch(`${apiUrlRoot}/conseillers/update_date_disponibilite/${idConseiller}`, requestOptions).then(handleResponse);
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

function handleFileResponse(response) {
  return response.blob().then(blob => {
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        userService.logout();
        window.location.pathname = '/';
      }

      const error = (blob && blob.message) || response.statusText;
      return Promise.reject(error);
    }

    return blob;
  });
}
