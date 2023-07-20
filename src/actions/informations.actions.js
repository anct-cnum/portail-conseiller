import Joi from 'joi';
import { userService } from '../services/user.service';
import { history } from '../helpers';
import { informationsService } from '../services/informations.service';

export const formInformationsActions = {
  confirmConseillerEmail,
  verifyFormulaire,
  updateField,
  initFormInformations,
  initFormInformationsMessage,
  updateInformations,
};

function confirmConseillerEmail(token) {
  return dispatch => {
    dispatch(request());
    informationsService.confirmConseillerEmail(token)
    .then(
      result => result.isEmailPro === false ? dispatch(successMail(result.email)) : dispatch(successMailPro(result.emailPro)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'CONFIRMATION_UPDATE_CONSEILLER_EMAIL_REQUEST' };
  }
  function successMail(email) {
    return { type: 'CONFIRMATION_UPDATE_CONSEILLER_EMAIL_PERSO_SUCCESS', email };
  }
  function successMailPro(emailPro) {
    return { type: 'CONFIRMATION_UPDATE_CONSEILLER_EMAIL_PRO_SUCCESS', emailPro };
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

  if (!regExpOldTelephone.test(telephone) || (form?.telephone !== telephone && telephone !== null)) {
    errors.push({
      telephone: (Joi.object({
        telephone: Joi.string().optional().allow('', null).pattern(regExpNumero)
      }).validate({ telephone: form?.telephone }).error) ?
        'Un numéro de téléphone valide doit obligatoirement être saisi. Exemples: +33XXXXXXXXX ou +262XXXXXXXXX, ...' : null
    });
  }
  errors.push({
    telephonePro: (Joi.object({
      telephonePro: Joi.string().optional().allow('', null).pattern(regExpNumero)
    }).validate({ telephonePro: form?.telephonePro }).error) ?
      'Un numéro de téléphone professionnel valide doit obligatoirement être saisi. Exemples: +33XXXXXXXXX ou +262XXXXXXXXX, ...' : null
  });
  errors.push({
    email: (Joi.object({
      email: Joi.string().required().pattern(regExpEmail)
    }).validate({ email: form?.email }).error) ?
      'Une adresse email valide doit obligatoirement être saisie' : null
  });
  errors.push({
    emailPro: (Joi.object({
      emailPro: Joi.string().optional().allow('', null).pattern(regExpEmail)
    }).validate({ emailPro: form?.emailPro }).error) ?
      'Une adresse email professionnelle valide doit obligatoirement être saisie' : null
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
  return { type: 'UPDATE_' + name?.toUpperCase(), value };
}

function initFormInformations(email, telephone, telephonePro, emailPro, dateDeNaissance, sexe) {
  return { type: 'INIT_FORM_INFORMATIONS', email, telephone, telephonePro, emailPro, dateDeNaissance, sexe };
}

function initFormInformationsMessage(state) {
  return { type: 'INIT_FORM_INFORMATIONS_MESSAGE', state };
}

function updateInformations(informations, conseillerId, username, password) {
  return dispatch => {
    dispatch(request());
    userService.login(username, password).then(
      () => {
        informationsService.updateInformations(informations, conseillerId)
        .then(
          result => {
            dispatch(success(result.conseiller, result.initModifMailPersoConseiller, result.initModifMailProConseiller));
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
  return { type: 'POST_INFORMATIONS_REQUEST' };
}
function success(conseiller, initModifMailPersoConseiller, initModifMailProConseiller) {
  return { type: 'POST_INFORMATIONS_SUCCESS', conseiller, initModifMailPersoConseiller, initModifMailProConseiller };
}
function failure(error) {
  return { type: 'POST_INFORMATIONS_FAILURE', error };
}
