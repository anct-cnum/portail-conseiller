import { permanenceService } from '../services/permanence.service';
import { history } from '../helpers';
import Joi from 'joi';

export const permanenceActions = {
  get,
  getListePermanences,
  isPermanenceChecked,
  closePermanence,
  initPermanence,
  verifyFormulaire,
  createPermanence,
  updatePermanence,
  verifySiret,
  updateLieuPrincipal,
  updateField,
  disabledField,
  montrerLieuSecondaire,
  suspensionFormulaire
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

function getListePermanences(idStructure) {
  return dispatch => {
    dispatch(request());

    permanenceService.getListePermanences(idStructure)
    .then(
      result => dispatch(success(result.permanences)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_PERMANENCES_REQUEST' };
  }
  function success(permanences) {
    return { type: 'GET_PERMANENCES_SUCCESS', permanences };
  }
  function failure(error) {
    return { type: 'GET_PERMANENCES_FAILURE', error };
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
  const showLieuSecondaire = form?.showLieuSecondaire;
  //eslint-disable-next-line max-len
  const regExpEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  const regExpNumero = new RegExp(/^(?:(?:\+)(33|590|596|594|262|269))(?:[\s.-]*\d{3}){3,4}$/);
  const regExpSiteWeb = new RegExp(/(https?):\/\/[a-z0-9\\/:%_+.,#?!@&=-]+/);
  const regExpSiret = new RegExp(/^$|^[0-9]{14}$/);

  errors.push({ estCoordinateur: (Joi.object({
    estCoordinateur: Joi.boolean().required().allow(true, false) }).validate({
    estCoordinateur: form?.fields.filter(field => field.name === 'estCoordinateur')[0]?.value }).error) ?
    'Votre rôle doit obligatoirement être saisie' : null });

  errors.push({ telephonePro: (Joi.object({
    telephonePro: Joi.string().allow('').pattern(regExpNumero) }).validate({
    telephonePro: form?.fields.filter(field => field.name === 'telephonePro')[0]?.value }).error) ?
    'Un numéro de téléphone valide doit être saisi' : null });

  errors.push({ emailPro: (Joi.object({
    emailPro: Joi.string().allow('').pattern(regExpEmail) }).validate({
    emailPro: form?.fields.filter(field => field.name === 'emailPro')[0]?.value }).error) ?
    'Une adresse email valide doit être saisie' : null });
    
  errors.push({ estLieuPrincipal: (Joi.object({
    estLieuPrincipal: Joi.boolean().allow(true, false).required() }).validate({ estLieuPrincipal:
    form?.fields.filter(field => field.name === 'estLieuPrincipal')[0]?.value }).error) ?
    'Vous devez indiquer si votre structure est votre lieu d\'activité principal ou non' : null });

  const champsAcceptes = [
    {
      nom: 'nomEnseigne', validation: Joi.string().trim().required(),
      message: 'Un lieu d\'activité doit obligatoirement être saisi'
    },
    {
      nom: 'siret', validation: Joi.string().trim().allow('', null).pattern(regExpSiret).min(14).max(14),
      message: 'Un siret valide de 14 chiffres doit être saisi'
    },
    {
      nom: 'numeroTelephone', validation: Joi.string().trim().allow('', null).pattern(regExpNumero),
      message: 'Un numéro de téléphone valide doit être saisi'
    },
    {
      nom: 'email', validation: Joi.string().trim().allow('', null).pattern(regExpEmail),
      message: 'Une adresse email valide doit être saisie'
    },
    {
      nom: 'numeroVoie', validation: Joi.string().trim().required().allow('', null),
      message: 'Un numéro de voie doit obligatoirement être saisi'
    },
    {
      nom: 'rueVoie', validation: Joi.string().trim().required().min(5).max(120),
      message: 'Une rue doit obligatoirement être saisie' },
    {
      nom: 'codePostal', validation: Joi.string().trim().required().min(5).max(5),
      message: 'Un code postal doit obligatoirement être saisi' },
    {
      nom: 'ville', validation: Joi.string().trim().required().min(3).max(60),
      message: 'Une ville doit obligatoirement être saisie'
    },
    {
      nom: 'itinerance', validation: Joi.string().trim().allow('', null),
      message: 'Une itinérance doit obligatoirement être saisie'
    },
    {
      nom: 'siteWeb', validation: Joi.string().trim().allow('', null).pattern(regExpSiteWeb),
      message: 'Une URL valide doit être saisie (exemple de format valide https://www.mon-site.fr)'
    },
    {
      nom: 'typeAcces', validation: Joi.string().trim().required().valid('libre', 'rdv', 'prive'),
      message: 'Un type d\'accès doit obligatoirement être indiqué'
    },
    {
      nom: 'horaires' }
  ];

  ['principal_', 'secondaire_'].forEach(champ => {
    if (champ === 'secondaire_') {
      showLieuSecondaire.forEach((show, id) => {
        if (show) {
          champsAcceptes.forEach(accepte => {
            if (accepte.nom === 'horaires') {
              errors.push({
                [champ + id + '_' + accepte.nom]: controleHoraires(form?.fields.filter(field => field.name === champ + id + '_' + accepte.nom)[0]?.value)
              });
            } else {
              errors.push({
                [champ + id + '_' + accepte.nom]: (Joi.object({
                  [champ + id + '_' + accepte.nom]: accepte.validation }).validate(
                  { [champ + id + '_' + accepte.nom]:
                    form?.fields.filter(field => field.name === champ + id + '_' + accepte.nom)[0]?.value }).error) ? accepte.message : null
              });
            }
          });
        }
      });
    } else {
      champsAcceptes.forEach(accepte => {
        if (accepte.nom === 'horaires') {
          /* Cohérence des horaires */
          errors.push({
            principal_horaires: controleHoraires(form?.fields.filter(field => field.name === champ + accepte.nom)[0]?.value)
          });
        } else if (accepte.nom !== 'itinerance') {
          errors.push({
            [champ + accepte.nom]: (Joi.object({
              [champ + accepte.nom]: accepte.validation }).validate(
              { [champ + accepte.nom]:
                form?.fields.filter(field => field.name === champ + accepte.nom)[0]?.value }).error) ? accepte.message : null
          });
        }
      });
    }
  });

  let nbErrors = 0;
  errors.forEach(error => {
    if (error[Object.keys(error)[0]]) {
      nbErrors++;
    }
    if (error[Object.keys(error)[0]] && Object.keys(error)[0].slice(-8) === 'horaires') {
      nbErrors += error[Object.keys(error)[0]].length - 1;
    }
  });

  const errorsForm = { errors: errors, lengthError: nbErrors };
  const errorMessage = 'Vous devez impérativement corriger les erreurs avant de passer à la suite';
  const showError = nbErrors > 0;

  return { type: 'VERIFY_FORMULAIRE', errorsForm, errorMessage, showError };
}

/* Cohérence des horaires */
function controleHoraires(horaires) {
  let erreursHoraires = [];
  horaires?.forEach((jour, id) => {
    if (jour.matin[0] > jour.matin[1] || jour.apresMidi[0] > jour.apresMidi[1] ||
      (jour.matin[1] !== 'Fermé' && jour.apresMidi[0] !== 'Fermé' && jour.matin[1] > jour.apresMidi[0])) {
      erreursHoraires.push(id);
    }
  });
  return erreursHoraires;
}

function createPermanence(idConseiller, permanence, isEnded) {

  return dispatch => {
    dispatch(request());
    permanenceService.createPermanence(idConseiller, permanence)
    .then(
      result => {
        dispatch(success(result.isCreated, isEnded));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'POST_PERMANENCE_REQUEST' };
  }
  function success(isCreated, isEnded) {
    return { type: 'POST_PERMANENCE_SUCCESS', isCreated, isEnded };
  }
  function failure(error) {
    return { type: 'POST_PERMANENCE_FAILURE', error };
  }
}

function updatePermanence(idPermanence, idConseiller, permanence, isEnded) {
  return dispatch => {
    dispatch(request());
    permanenceService.updatePermanence(idPermanence, idConseiller, permanence)
    .then(
      result => {
        dispatch(success(result.isUpdated, isEnded));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'UPDATE_PERMANENCE_REQUEST' };
  }
  function success(isUpdated, isEnded) {
    return { type: 'UPDATE_PERMANENCE_SUCCESS', isUpdated, isEnded };
  }
  function failure(error) {
    return { type: 'UPDATE_PERMANENCE_FAILURE', error };
  }
}

function verifySiret(champ, siret) {
  return dispatch => {
    dispatch(request());
    permanenceService.verifySiret(siret)
    .then(
      result => {
        dispatch(success(result.adresseParSiret, champ));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'VERIFY_SIRET_REQUEST' };
  }
  function success(adresseParSiret, champ) {
    return { type: 'VERIFY_SIRET_SUCCESS', adresseParSiret, champ };
  }
  function failure(error) {
    return { type: 'VERIFY_SIRET_FAILURE', error };
  }
}

function updateLieuPrincipal(hide) {
  if (hide) {
    return { type: 'CACHER_ADRESSE', hide };
  }
}

function montrerLieuSecondaire(show) {
  return { type: 'HAVE_LIEU_SECONDAIRE', show };
}

function updateField(name, value) {
  return { type: 'UPDATE_FIELD', field: { name, value } };
}

function disabledField(id, value) {
  return { type: 'DISABLED_FIELD', field: { id, value } };
}

function suspensionFormulaire() {
  localStorage.setItem('suspension_permanence', true);
  history.push('/accueil');
  return { type: 'SUSPENSION_FORM' };
}
