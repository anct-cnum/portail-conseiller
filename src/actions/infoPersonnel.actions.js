import Joi from 'joi';
import { userService } from '../services/user.service';
import { history } from '../helpers';
import { infoPersonnelService } from '../services/infoPersonnel.service';

export const formInfoPersonnelActions = {
  verifyFormulaire,
  updateField,
  initFormInfoPersonnel,
  createInfoPersonnel,
};

function verifyFormulaire(form) {
  let errors = [];
  //eslint-disable-next-line max-len
  const regExpEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  const regExpNumero = new RegExp(/^(?:(?:\+)(33|590|596|594|262|269))(?:[\s.-]*\d{3}){3,4}$/);

  errors.push({
    telephone: (Joi.object({
      telephone: Joi.string().required().pattern(regExpNumero)
    }).validate({ telephone: form?.telephone }).error) ?
      'Un numéro de téléphone valide doit obligatoirement être saisi. Exemples: +33XXXXXXXXX ou +262XXXXXXXXX, ...' : null
  });
  errors.push({
    telephonePro: (Joi.object({
      telephonePro: Joi.string().required().pattern(regExpNumero)
    }).validate({ telephonePro: form?.telephonePro }).error) ?
      'Un numéro de téléphone professionnel valide doit obligatoirement être saisi. Exemples: +33XXXXXXXXX ou +262XXXXXXXXX, ...' : null
  });
  errors.push({
    email: (Joi.object({
      email: Joi.string().required().pattern(regExpEmail)
    }).validate({ email: form?.email }).error) ?
      'Une adresse email valide doit obligatoirement être saisie' : null
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

function initFormInfoPersonnel(email, telephone, telephonePro) {
  return { type: 'INIT_FORM_INFO_PERSONNEL', email, telephone, telephonePro };
}

function createInfoPersonnel(infoPersonnel, conseillerId, username, password) {
  return dispatch => {
    dispatch(request());
    userService.login(username, password).then(
      () => {
        infoPersonnelService.createInfoPersonnel(infoPersonnel, conseillerId)
          .then(
            result => {
              dispatch(success());
              dispatch(successConseiller(result));
            },
            error => {
              dispatch(failure(error));
            }
          );
      },
      error => {
        dispatch(failure(error.error));
        history.push('/login');
      }
    );
  };
}

function request() {
  return { type: 'POST_INFO_PERSONNEL_REQUEST' };
}
function success() {
  return { type: 'POST_INFO_PERSONNEL_SUCCESS' };
}
function successConseiller(conseiller) {
  return { type: 'GET_CONSEILLER_SUCCESS', conseiller };
}
function failure(error) {
  return { type: 'POST_INFO_PERSONNEL_FAILURE', error };
}
