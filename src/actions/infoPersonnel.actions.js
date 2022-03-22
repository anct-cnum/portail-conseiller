import Joi from 'joi';
import { userService } from '../services/user.service';
import { history } from '../helpers';
import { infoPersonnelService } from '../services/infoPersonnel.service';

export const formInfoPersonnelActions = {
  verifyFormulaire,
  updateField,
  initFormInfoPersonnel,
  createInfoPersonnel,
  confirmConseillerEmail
};

function confirmConseillerEmail(token) {
  return dispatch => {
    dispatch(request());
    infoPersonnelService.confirmConseillerEmail(token)
    .then(
      conseiller => dispatch(success(conseiller)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'CONFIRMATION_UPDATE_CONSEILLER_EMAIL_REQUEST' };
  }
  function success(conseiller) {
    return { type: 'CONFIRMATION_UPDATE_CONSEILLER_EMAIL_SUCCESS', conseiller };
  }
  function failure(error) {
    return { type: 'CONFIRMATION_UPDATE_CONSEILLER_EMAIL_FAILURE', error };
  }
}

function verifyFormulaire(form, telephone) {
  let errors = [];
  //eslint-disable-next-line max-len
  const regExpEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  const regExpNumero = new RegExp(/^(?:(?:\+)(33|590|596|594|262|269))(?:[\s.-]*\d{3}){3,4}$/);
  const regExpOldTelephone = new RegExp('^((06)|(07))[0-9]{8}$', 'i');

  if (!regExpOldTelephone.test(telephone) || form?.telephone !== telephone) {
    errors.push({
      telephone: (Joi.object({
        telephone: Joi.string().required().pattern(regExpNumero)
      }).validate({ telephone: form?.telephone }).error) ?
        'Un numéro de téléphone valide doit obligatoirement être saisi. Exemples: +33XXXXXXXXX ou +262XXXXXXXXX, ...' : null
    });
  }

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
            dispatch(success(result.initModifMailPersoConseiller));
            dispatch(successConseiller(result.conseiller));
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
function success(initModifMailPersoConseiller) {
  return { type: 'POST_INFO_PERSONNEL_SUCCESS', initModifMailPersoConseiller };
}
function successConseiller(conseiller) {
  return { type: 'GET_CONSEILLER_SUCCESS', conseiller };
}
function failure(error) {
  return { type: 'POST_INFO_PERSONNEL_FAILURE', error };
}
