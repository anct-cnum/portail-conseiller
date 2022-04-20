import { permanenceService } from '../services/permanence.service';
import { history } from '../helpers';
import Joi from 'joi';

export const permanenceActions = {
  get,
  getListePermanences,
  isPermanenceChecked,
  closePermanence,
  verifyFormulaire,
  createPermanence,
  updatePermanence,
  verifySiret,
  getGeocodeAdresse,
  rebootGeocodeAdresse,
  updateLieuPrincipal,
  updateField,
  disabledField,
  montrerLieuSecondaire,
  setHorairesLoading,
  suspensionFormulaire,
  reporterPermanence
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

function isPermanenceChecked(showPermanenceForm) {
  return { type: 'SHOW_FORMULAIRE_PERMANENCE', showPermanenceForm };
}

function closePermanence() {
  return { type: 'CLOSE_FORMULAIRE_PERMANENCE' };
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
    estCoordinateur: form?.fields?.filter(field => field.name === 'estCoordinateur')[0]?.value }).error) ?
    'Votre rôle doit obligatoirement être saisie' : null });

  errors.push({ telephonePro: (Joi.object({
    telephonePro: Joi.string().allow('').pattern(regExpNumero) }).validate({
    telephonePro: form?.fields?.filter(field => field.name === 'telephonePro')[0]?.value }).error) ?
    'Un numéro de téléphone valide doit être saisi' : null });

  errors.push({ emailPro: (Joi.object({
    emailPro: Joi.string().allow('').pattern(regExpEmail) }).validate({
    emailPro: form?.fields?.filter(field => field.name === 'emailPro')[0]?.value }).error) ?
    'Une adresse email valide doit être saisie' : null });

  errors.push({ estStructure: (Joi.object({
    estStructure: Joi.boolean().allow(true, false).required() }).validate({ estStructure:
    form?.fields?.filter(field => field.name === 'estStructure')[0]?.value }).error) ?
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
      message: 'Un code postal doit obligatoirement être saisi'
    },
    {
      nom: 'ville', validation: Joi.string().trim().required().min(3).max(60),
      message: 'Une ville doit obligatoirement être saisie'
    },
    {
      nom: 'location', validation: Joi.object().required(),
      message: 'La localisation du lieu d\'activité doit obligatoirement être saisie'
    },
    {
      nom: 'itinerant', validation: Joi.boolean(),
      message: 'Une itinérance doit obligatoirement être saisie'
    },
    {
      nom: 'siteWeb', validation: Joi.string().trim().allow('', null).pattern(regExpSiteWeb),
      message: 'Une URL valide doit être saisie (exemple de format valide https://www.le-site-de-ma-structure.fr)'
    },
    {
      nom: 'typeAcces', validation: Joi.array().items(Joi.string().trim().valid('libre', 'rdv', 'prive')).min(1).required(),
      message: 'Au moins un type d\'accès doit obligatoirement être indiqué'
    },
    {
      nom: 'horaires' }
  ];

  ['principal_', 'secondaire_'].forEach(champ => {
    if (champ === 'secondaire_') {
      showLieuSecondaire?.forEach((show, id) => {
        if (show) {
          champsAcceptes.forEach(accepte => {
            if (accepte.nom === 'horaires') {
              errors.push({
                [champ + id + '_' + accepte.nom]:
                  controleHoraires(form?.fields?.filter(field => field.name === champ + id + '_' + accepte.nom)[0]?.value[champ + id + '_horaires'])
              });
            } else {
              errors.push({
                [champ + id + '_' + accepte.nom]: (Joi.object({
                  [champ + id + '_' + accepte.nom]: accepte.validation }).validate(
                  { [champ + id + '_' + accepte.nom]:
                    form?.fields?.filter(field => field.name === champ + id + '_' + accepte.nom)[0]?.value }).error) ? accepte.message : null
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
            principal_horaires: controleHoraires(form?.fields?.filter(field => field.name === champ + accepte.nom)[0]?.value?.principal_horaires)
          });
        } else if (accepte.nom !== 'itinerant') {
          errors.push({
            [champ + accepte.nom]: (Joi.object({
              [champ + accepte.nom]: accepte.validation }).validate(
              { [champ + accepte.nom]:
                form?.fields?.filter(field => field.name === champ + accepte.nom)[0]?.value }).error) ? accepte.message : null
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
    if ((jour.matin[0] < '06:00' || jour.matin[0] > '13:00' && jour.matin[0] !== 'Fermé') ||
        (jour.matin[1] < '06:00' || jour.matin[1] > '13:00' && jour.matin[1] !== 'Fermé')) {
      erreursHoraires.push(id);
    }
    if ((jour.apresMidi[0] < '13:00' || jour.apresMidi[0] > '22:00' && jour.apresMidi[0] !== 'Fermé') ||
        (jour.apresMidi[1] < '13:00' || jour.apresMidi[1] > '22:00' && jour.apresMidi[1] !== 'Fermé')) {
      erreursHoraires.push(id);
    }
    if (jour.matin[0] > jour.matin[1] || jour.apresMidi[0] > jour.apresMidi[1] ||
      (jour.matin[1] !== 'Fermé' && jour.apresMidi[0] !== 'Fermé' && jour.matin[1] > jour.apresMidi[0])) {
      erreursHoraires.push(id);
    }
  });
  return erreursHoraires;
}

function createPermanence(idConseiller, permanence, isEnded, prefixId) {
  return dispatch => {
    dispatch(request());
    permanenceService.createPermanence(idConseiller, permanence)
    .then(
      result => {
        dispatch(success(result.isCreated, isEnded, prefixId));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'POST_PERMANENCE_REQUEST' };
  }
  function success(isCreated, isEnded, prefixId) {
    return { type: 'POST_PERMANENCE_SUCCESS', isCreated, isEnded, prefixId };
  }
  function failure(error) {
    return { type: 'POST_PERMANENCE_FAILURE', error };
  }
}

function updatePermanence(idPermanence, idConseiller, permanence, isEnded, prefixId) {
  return dispatch => {
    dispatch(request());
    permanenceService.updatePermanence(idPermanence, idConseiller, permanence)
    .then(
      result => {
        dispatch(success(result.isUpdated, isEnded, prefixId));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'UPDATE_PERMANENCE_REQUEST' };
  }
  function success(isUpdated, isEnded, prefixId) {
    return { type: 'UPDATE_PERMANENCE_SUCCESS', isUpdated, isEnded, prefixId };
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

function getGeocodeAdresse(adresse, prefixId) {
  return dispatch => {
    dispatch(request());
    permanenceService.getGeocodeAdresse(adresse)
    .then(
      result => {
        dispatch(success(result.geocodeAdresse, prefixId));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GEOCODE_ADRESSE_REQUEST' };
  }
  function success(geocodeAdresse, prefixId) {
    return { type: 'GEOCODE_ADRESSE_SUCCESS', geocodeAdresse, prefixId };
  }
  function failure(error) {
    return { type: 'GEOCODE_ADRESSE_FAILURE', error };
  }
}

function rebootGeocodeAdresse(prefixId) {
  return { type: 'GEOCODE_ADRESSE_REBOOT', prefixId };
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

function setHorairesLoading(loadingHoraires) {
  return { type: 'LOADING_HORAIRES', loadingHoraires };
}

function suspensionFormulaire() {
  localStorage.setItem('suspension_permanence', true);
  history.push('/accueil');
  return { type: 'SUSPENSION_FORM' };
}

function reporterPermanence() {
  return dispatch => {
    dispatch(request());
    permanenceService.reporterPermanence()
    .then(
      result => {
        dispatch(success(result.isReporter));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'REPORTER_PERMANENCE_REQUEST' };
  }
  function success(isReporter) {
    return { type: 'REPORTER_PERMANENCE_SUCCESS', isReporter };
  }
  function failure(error) {
    return { type: 'REPORTER_PERMANENCE_FAILURE', error };
  }
}
