import { conseillerService } from '../services/conseiller.service';

export const formulaireHorairesAdresseActions = {
  verifyFormulaire,
  createHorairesAdresse,
  cacherAdresse,
  initAdresse,
  updateField,
  updateItinerance,
};

function verifyFormulaire(form) {
  let errors = [];

  /*required*/
  if (!form?.lieuActivite) {
    errors.push({ name: 'lieuActivite', error: 'Le lieu d\'activité doit être obligatoirement saisi' });
  }
  if (!form?.numeroTelephone) {
    errors.push({ name: 'numeroTelephone', error: 'Le numéro de téléphone doit être obligatoirement saisi' });
  }
  if (!form?.email) {
    errors.push({ name: 'email', error: 'L\'email doit être obligatoirement saisi' });
  }
  if (!form?.numeroVoie) {
    errors.push({ name: 'numeroVoie', error: 'Le numéro de voie doit être obligatoirement saisi' });
  }
  if (!form?.rueVoie) {
    errors.push({ name: 'rueVoie', error: 'La rue doit être obligatoirement saisie' });
  }
  if (!form?.codePostal) {
    errors.push({ name: 'codePostal', error: 'Le code postal doit être obligatoirement saisi' });
  }
  if (!form?.ville) {
    errors.push({ name: 'ville', error: 'La ville doit être obligatoirement saisie' });
  }

  if (!form?.lundiMatinDebut || !form?.lundiMatinFin || !form?.lundiApresMidiDebut || !form?.lundiApresMidiFin) {
    errors.push({ name: 'lundi', error: 'L\'heure doit être obligatoirement saisie' });
  }
  if (!form?.mardiMatinDebut || !form?.mardiMatinFin || !form?.mardiApresMidiDebut || !form?.mardiApresMidiFin) {
    errors.push({ name: 'mardi', error: 'L\'heure doit être obligatoirement saisie' });
  }
  if (!form?.mercrediMatinDebut || !form?.mercrediMatinFin || !form?.mercrediApresMidiDebut || !form?.mercrediApresMidiFin) {
    errors.push({ name: 'mercredi', error: 'L\'heure doit être obligatoirement saisie' });
  }
  if (!form?.jeudiMatinDebut || !form?.jeudiMatinFin || !form?.jeudiApresMidiDebut || !form?.jeudiApresMidiFin) {
    errors.push({ name: 'jeudi', error: 'L\'heure doit être obligatoirement saisie' });
  }
  if (!form?.vendrediMatinDebut || !form?.vendrediMatinFin || !form?.vendrediApresMidiDebut || !form?.vendrediApresMidiFin) {
    errors.push({ name: 'vendredi', error: 'L\'heure doit être obligatoirement saisie' });
  }
  if (!form?.samediMatinDebut || !form?.samediMatinFin || !form?.samediApresMidiDebut || !form?.samediApresMidiFin) {
    errors.push({ name: 'samedi', error: 'L\'heure doit être obligatoirement saisie' });
  }
  if (!form?.dimancheMatinDebut || !form?.dimancheMatinFin || !form?.dimancheApresMidiDebut || !form?.dimancheApresMidiFin) {
    errors.push({ name: 'dimanche', error: 'L\'heure doit être obligatoirement saisie' });
  }


  /*champ spécifiques*/
  if (form?.siret && (form?.siret?.length !== 14 || Number.isInteger(form?.siret))) {
    errors.push({ name: 'siret', error: 'Le siret saisie n\'est pas valide, il doit comporter 14 chiffres' });
  }
  if (form?.numeroTelephone) {
    const matchTelephone = form.numeroTelephone.match(/^(?:(?:\+)(590|596|594|262|269))(?:[\s.-]*\d{2}){3,4}$/gi);
    if (matchTelephone?.length !== 1 || matchTelephone === null) {
      errors.push({ name: 'numeroTelephone',
        error: 'Le numéro de téléphone saisie n\'est pas valide (mettre votre indicatif international suivi des 9 chiffres)'
      });
    }
  }
  if (form?.email) {
    //eslint-disable-next-line max-len
    const matchEmail = form.email.match(/^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (matchEmail?.length !== 1 || matchEmail === null) {
      errors.push({ name: 'email', error: 'L\'adresse email saisie n\'est pas valide' });
    }
  }
  if (form?.siteWeb) {
    const matchUrl = form.siteWeb.match(/(https?):\/\/[a-z0-9\\/:%_+.,#?!@&=-]+/gi);
    if (matchUrl?.length !== 1 || matchUrl === null) {
      errors.push({ name: 'siteWeb', error: 'L\'URL saisie n\'est pas valide (exemple de format valide https://www.mon-site.fr)' });
    }
  }


  /* Cohérence des horaires */
  if (form?.lundiMatinDebut > form?.lundiMatinFin || form?.lundiApresMidiDebut > form?.lundiApresMidiFin ||
    form?.lundiApresMidiDebut < form?.lundiMatinFin) {
    errors.push({ name: 'lundi', error: 'Il y a une incohérence sur les heures saisies' });
  }
  if (form?.mardiMatinDebut > form?.mardiMatinFin || form?.mardiApresMidiDebut > form?.mardiApresMidiFin ||
    form?.mardiApresMidiDebut < form?.mardiMatinFin) {
    errors.push({ name: 'mardi', error: 'Il y a une incohérence sur les heures saisies' });
  }
  if (form?.mercrediMatinDebut > form?.mercrediMatinFin || form?.mercrediApresMidiDebut > form?.mercrediApresMidiFin ||
    form?.mercrediApresMidiDebut < form?.mercrediMatinFin) {
    errors.push({ name: 'mercredi', error: 'Il y a une incohérence sur les heures saisies' });
  }
  if (form?.jeudiMatinDebut > form?.jeudiMatinFin || form?.jeudiApresMidiDebut > form?.jeudiApresMidiFin ||
    form?.jeudiApresMidiDebut < form?.jeudiMatinFin) {
    errors.push({ name: 'jeudi', error: 'Il y a une incohérence sur les heures saisies' });
  }
  if (form?.vendrediMatinDebut > form?.vendrediMatinFin || form?.vendrediApresMidiDebut > form?.vendrediApresMidiFin ||
    form?.vendrediApresMidiDebut < form?.vendrediMatinFin) {
    errors.push({ name: 'vendredi', error: 'Il y a une incohérence sur les heures saisies' });
  }
  if (form?.samediMatinDebut > form?.samediMatinFin || form?.samediApresMidiDebut > form?.samediApresMidiFin ||
    form?.samediApresMidiDebut < form?.samediMatinFin) {
    errors.push({ name: 'samedi', error: 'Il y a une incohérence sur les heures saisies' });
  }
  if (form?.dimancheMatinDebut > form?.dimancheMatinFin || form?.dimancheApresMidiDebut > form?.dimancheApresMidiFin ||
    form?.dimancheApresMidiDebut < form?.dimancheMatinFin) {
    errors.push({ name: 'dimanche', error: 'Il y a une incohérence sur les heures saisies' });
  }

  return { type: 'VERIFY_FORMULAIRE', errors };
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

function updateItinerance(itinerance) {
  return { type: 'UPDATE_ITINERANCE', itinerance };
}
