import { permanenceService } from '../services/permanence.service';
import Joi from 'joi';

export const permanenceActions = {
  get,
  isPermanenceChecked,
  closePermanence,
  initPermanence,
  verifyFormulaire,
  createPermanence,
  updatePermanence,
  cacherAdresse,
  initAdresse,
  updateField,
  updateHoraires,
  updateItinerance,
  montrerLieuSecondaire,
  updateTypeAcces,
};

function get(idConseiller) {
  return dispatch => {
    dispatch(request());

    permanenceService.get(idConseiller)
    .then(
      result => dispatch(success(result.permanence)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_PERMANENCE_REQUEST' };
  }
  function success(permanence) {
    return { type: 'GET_PERMANENCE_SUCCESS', permanence };
  }
  function failure(error) {
    return { type: 'GET_PERMANENCE_FAILURE', error };
  }
}

function isPermanenceChecked(hasPermanence) {
  return { type: 'SHOW_FORMULAIRE_PERMANENCE', hasPermanence };
}

function closePermanence() {
  return { type: 'CLOSE_FORMULAIRE_PERMANENCE' };
}

function initPermanence(permanence) {
  return { type: 'INIT_PERMANENCE', permanence };
}

function verifyFormulaire(form) {
  let errors = [];
  //eslint-disable-next-line max-len
  const regExpEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  const regExpNumero = new RegExp(/^(?:(?:\+)(33|590|596|594|262|269))(?:[\s.-]*\d{3}){3,4}$/);
  const regExpSiteWeb = new RegExp(/(https?):\/\/[a-z0-9\\/:%_+.,#?!@&=-]+/);
  const regExpSiret = new RegExp(/^$|^[0-9]{14}$/);

  errors.push({ adresseExact: (Joi.object({
    adresseExact: Joi.boolean().required() }).validate({ adresseExact: form?.adresseExact }).error) ?
    'La correspondance des informations doit obligatoirement être saisie' : null });

  errors.push({ lieuActivite: (Joi.object({
    lieuActivite: Joi.string().required() }).validate({ lieuActivite: form?.lieuActivite }).error) ?
    'Un lieu d\'activité doit obligatoirement être saisi' : null });

  errors.push({ siret: (Joi.object({
    siret: Joi.string().pattern(regExpSiret) }).validate({ siret: form?.siret }).error) ?
    'Un siret valide de 14 chiffres doit être saisi' : null });

  errors.push({ numeroTelephone: (Joi.object({
    numeroTelephone: Joi.string().required().pattern(regExpNumero) }).validate({ numeroTelephone: form?.numeroTelephone }).error) ?
    'Un numéro de téléphone valide doit obligatoirement être saisi' : null });

  errors.push({ email: (Joi.object({
    email: Joi.string().required().pattern(regExpEmail) }).validate({ email: form?.email }).error) ?
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
    siteWeb: Joi.string().allow('').pattern(regExpSiteWeb) }).validate({ siteWeb: form?.siteWeb }).error) ?
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

function createPermanence(permanence) {
  return dispatch => {
    dispatch(request());
    permanenceService.createPermanence(permanence)
    .then(
      result => {
        dispatch(success(result.isCreated));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'POST_PERMANENCE_REQUEST' };
  }
  function success(isCreated) {
    return { type: 'POST_PERMANENCE_SUCCESS', isCreated };
  }
  function failure(error) {
    return { type: 'POST_PERMANENCE_FAILURE', error };
  }
}

function updatePermanence(idPermanence, permanence) {
  return dispatch => {
    dispatch(request());
    permanenceService.updatePermanence(idPermanence, permanence)
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
    return { type: 'UPDATE_PERMANENCE_REQUEST' };
  }
  function success(isUpdated) {
    return { type: 'UPDATE_PERMANENCE_SUCCESS', isUpdated };
  }
  function failure(error) {
    return { type: 'UPDATE_PERMANENCE_FAILURE', error };
  }
}

function cacherAdresse(hide) {
  if (hide) {
    return { type: 'CACHER_ADRESSE', hide };
  } else {
    return { type: 'MONTRER_ADRESSE', hide };
  }
}

function montrerLieuSecondaire(show) {
  return { type: 'HAVE_LIEU_SECONDAIRE', show };
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

function updateTypeAcces(typeAcces) {
  return { type: 'UPDATE_TYPE_ACCES', typeAcces };
}
