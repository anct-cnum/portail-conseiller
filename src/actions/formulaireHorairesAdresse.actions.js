import { conseillerService } from '../services/conseiller.service';
import Joi from 'joi';

export const formulaireHorairesAdresseActions = {
  verifyFormulaire,
  createHorairesAdresse,
  cacherAdresse,
  initAdresse,
  updateField,
  updateHoraires,
  updateItinerance,
  initInformations
};

function verifyFormulaire(form) {
  let errors = [];

  //eslint-disable-next-line max-len
  const rexExpEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  const rexExpNumero = new RegExp(/^(?:(?:\+)(33|590|596|594|262|269))(?:[\s.-]*\d{3}){3,4}$/);
  const rexExpSiteWeb = new RegExp(/(https?):\/\/[a-z0-9\\/:%_+.,#?!@&=-]+/);

  console.log(form);

  errors.push({ adresseExact: (Joi.object({
    adresseExact: Joi.boolean().required() }).validate({ adresseExact: form?.adresseExact }).error) ?
    'La correspondance des informations doit obligatoirement être saisie' : null });

  errors.push({ lieuActivite: (Joi.object({
    lieuActivite: Joi.string().required() }).validate({ lieuActivite: form?.lieuActivite }).error) ?
    'Un lieu d\'activité doit obligatoirement être saisi' : null });

  errors.push({ numeroTelephone: (Joi.object({
    numeroTelephone: Joi.string().required().pattern(rexExpNumero) }).validate({ numeroTelephone: form?.numeroTelephone }).error) ?
    'Un numéro de téléphone valide doit obligatoirement être saisi' : null });

  errors.push({ email: (Joi.object({
    email: Joi.string().required().pattern(rexExpEmail) }).validate({ email: form?.email }).error) ?
    'Une adresse email valide doit obligatoirement être saisie' : null });

  errors.push({ numeroVoie: (Joi.object({
    numeroVoie: Joi.string().required() }).validate({ numeroVoie: form?.numeroVoie }).error) ?
    'Un numéro de voie doit obligatoirement être saisi' : null });

  errors.push({ rueVoie: (Joi.object({
    rueVoie: Joi.string().required() }).validate({ rueVoie: form?.rueVoie }).error) ?
    'Une rue doit obligatoirement être saisie' : null });

  errors.push({ codePostal: (Joi.object({
    codePostal: Joi.string().required() }).validate({ codePostal: form?.codePostal }).error) ?
    'Un code postal doit obligatoirement être saisi' : null });

  errors.push({ ville: (Joi.object({
    ville: Joi.string().required() }).validate({ ville: form?.ville }).error) ?
    'Une ville doit obligatoirement être saisie' : null });

  errors.push({ itinerance: (Joi.object({
    itinerance: Joi.string().required() }).validate({ itinerance: form?.itinerance }).error) ?
    'Une itinérance doit obligatoirement être saisie' : null });

  errors.push({ siteWeb: (Joi.object({
    siteWeb: Joi.string().allow('').pattern(rexExpSiteWeb) }).validate({ siteWeb: form?.siteWeb }).error) ?
    'Une URL valide doit être saisie (exemple de format valide https://www.mon-site.fr)' : null });

  /* Cohérence des horaires */
  if (form?.horaires) {
    let erreursHoraires = [];
    form.horaires.forEach((jour, id) => {
      if (jour.matin[0] > jour.matin[1] || jour.apresMidi[0] > jour.apresMidi[1] ||
        (jour.matin[1] !== 'Fermé' && jour.apresMidi[0] !== 'Fermé' && jour.matin[1] > jour.apresMidi[0])) {
        erreursHoraires.push(id);
      }
    });
    errors.push({ horaires: erreursHoraires });
  }

  let nbErrors = 0;
  errors.forEach(error => {
    if (error[Object.keys(error)[0]]) {
      nbErrors++;
    }
    if (error[Object.keys(error)[0]] && Object.keys(error)[0] === 'horaires') {
      nbErrors += error[Object.keys(error)[0]].length - 1;
    }
  });

  const errorsForm = { errors: errors, lengthError: nbErrors };

  return { type: 'VERIFY_FORMULAIRE', errorsForm };
}

function createHorairesAdresse(conseillerId, infoCartographie) {
  return dispatch => {
    dispatch(request());
    conseillerService.createHorairesAdresse(conseillerId, infoCartographie)
    .then(
      result => {
        dispatch(success(result.isUpdated));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
  function request() {
    return { type: 'POST_HORAIRES_ADRESSE_REQUEST' };
  }
  function success(isUpdated) {
    return { type: 'POST_HORAIRES_ADRESSE_SUCCESS', isUpdated };
  }
  function failure(error) {
    return { type: 'POST_HORAIRES_ADRESSE_FAILURE', error };
  }
}

function cacherAdresse(input, adresse = null) {
  if (input) {
    if (adresse) {
      initAdresse(adresse);
    }
    return { type: 'CACHER_ADRESSE', input };
  } else {
    return { type: 'MONTRER_ADRESSE', input };
  }
}

function initAdresse(adresse) {
  return { type: 'INIT_ADRESSE', adresse };
}

function updateField(name, value) {
  return { type: 'UPDATE_' + name.toUpperCase(), value };
}
function updateHoraires(horaires) {
  return { type: 'UPDATE_HORAIRES', horaires };
}

function updateItinerance(itinerance) {
  return { type: 'UPDATE_ITINERANCE', itinerance };
}

function initInformations(informations) {
  return { type: 'INIT_INFORMATION', informations };
}
