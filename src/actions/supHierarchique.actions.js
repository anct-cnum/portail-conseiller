import Joi from 'joi';
import { supHierarchiqueService } from '../services/supHierarchique.service';

export const formSupHierarchiqueActions = {
  verifyFormulaire,
  updateField,
  initFormSupHierarchique,
  createSupHierarchique,
};

function verifyFormulaire(form) {
  let errors = [];
  //eslint-disable-next-line max-len
  const regExpEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  const regExpNumero = new RegExp(/^(?:(?:\+)(33|590|596|594|262|269))(?:[\s.-]*\d{3}){3,4}$/);

  errors.push({
    numeroTelephone: (Joi.object({
      numeroTelephone: Joi.string().required().pattern(regExpNumero)
    }).validate({ numeroTelephone: form?.numeroTelephone }).error) ?
      'Un numéro de téléphone valide doit obligatoirement être saisi' : null
  });

  errors.push({
    email: (Joi.object({
      email: Joi.string().required().pattern(regExpEmail)
    }).validate({ email: form?.email }).error) ?
      'Une adresse email valide doit obligatoirement être saisie' : null
  });
  errors.push({
    nom: (Joi.object({
      nom: Joi.string().required()
    }).validate({ nom: form?.nom }).error) ?
      'Un nom doit obligatoirement être saisi' : null
  });
  errors.push({
    prenom: (Joi.object({
      prenom: Joi.string().required()
    }).validate({ prenom: form?.prenom }).error) ?
      'Un prénom doit obligatoirement être saisi' : null
  });
  errors.push({
    fonction: (Joi.object({
      fonction: Joi.string().required()
    }).validate({ fonction: form?.fonction }).error) ?
      'Une fonction doit obligatoirement être saisie' : null
  });

  let nbErrors = 0;
  errors.forEach(error => {
    if (error[Object.keys(error)[0]]) {
      nbErrors++;
    }
  });

  const errorsForm = { errors: errors, lengthError: nbErrors };

  return { type: 'VERIFY_FORMULAIRE', errorsForm };
}

function updateField(name, value) {
  return { type: 'UPDATE_' + name.toUpperCase(), value };
}

function initFormSupHierarchique(formSupHierarchique) {
  return { type: 'INIT_FORM_SUP_HIERARCHIQUE', formSupHierarchique };
}

function createSupHierarchique(supHierarchique, conseillerId) {
  return dispatch => {
    dispatch(request());
    supHierarchiqueService.createSupHierarchique(supHierarchique, conseillerId)
    .then(
      result => {
        dispatch(success());
        dispatch(successConseiller(result));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'POST_SUP_HIERARCHIQUE_REQUEST' };
  }
  function success() {
    return { type: 'POST_SUP_HIERARCHIQUE_SUCCESS' };
  }
  function successConseiller(conseiller) {
    return { type: 'GET_CONSEILLER_SUCCESS', conseiller };
  }
  function failure(error) {
    return { type: 'POST_SUP_HIERARCHIQUE_FAILURE', error };
  }
}
