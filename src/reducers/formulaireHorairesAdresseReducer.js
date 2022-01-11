
const initialState = {
  isAdresseCachee: true,
  isUpdated: false,
  showError: false,
  lundiMatinDebut: 'Fermé',
  lundiMatinFin: 'Fermé',
  lundiApresMidiDebut: 'Fermé',
  lundiApresMidiFin: 'Fermé',
  mardiMatinDebut: 'Fermé',
  mardiMatinFin: 'Fermé',
  mardiApresMidiDebut: 'Fermé',
  mardiApresMidiFin: 'Fermé',
  mercrediMatinDebut: 'Fermé',
  mercrediMatinFin: 'Fermé',
  mercrediApresMidiDebut: 'Fermé',
  mercrediApresMidiFin: 'Fermé',
  jeudiMatinDebut: 'Fermé',
  jeudiMatinFin: 'Fermé',
  jeudiApresMidiDebut: 'Fermé',
  jeudiApresMidiFin: 'Fermé',
  vendrediMatinDebut: 'Fermé',
  vendrediMatinFin: 'Fermé',
  vendrediApresMidiDebut: 'Fermé',
  vendrediApresMidiFin: 'Fermé',
  samediMatinDebut: 'Fermé',
  samediMatinFin: 'Fermé',
  samediApresMidiDebut: 'Fermé',
  samediApresMidiFin: 'Fermé',
  dimancheMatinDebut: 'Fermé',
  dimancheMatinFin: 'Fermé',
  dimancheApresMidiDebut: 'Fermé',
  dimancheApresMidiFin: 'Fermé',
};

export default function formulaireHorairesAdresse(state = initialState, action) {
  switch (action.type) {
    case 'VERIFY_FORMULAIRE':
      return {
        ...state,
        isUpdated: false,
        showError: true,
        errorsFormulaire: action.errors
      };
    case 'POST_HORAIRES_ADRESSE_REQUEST':
      return {
        ...state,
        showError: false,
      };
    case 'POST_HORAIRES_ADRESSE_SUCCESS':
      return {
        ...state,
        isUpdated: action.isUpdated,
        showError: false,
      };
    case 'POST_HORAIRES_ADRESSE_FAILURE':
      return {
        ...state,
        isUpdated: false,
        showError: true,
        error: action.error,
      };
    /* Partie Informations */
    case 'CACHER_ADRESSE':
      return {
        ...state,
        isAdresseCachee: action.input,
        adresseExact: true,
        errorsFormulaire: state?.errorsFormulaire?.filter(erreur => erreur.name !== 'adresseExact')
      };
    case 'MONTRER_ADRESSE':
      return {
        ...state,
        isAdresseCachee: action.input,
        numeroVoie: '',
        rueVoie: '',
        codePostal: '',
        ville: '',
        siret: '',
        adresseExact: true,
        errorsFormulaire: state?.errorsFormulaire?.filter(erreur => erreur.name !== 'adresseExact')
      };
    case 'INIT_ADRESSE':
      return {
        ...state,
        numeroVoie: action.adresse.numeroRue ? action.adresse.numeroRue : action.adresse.numero_voie,
        rueVoie: action.adresse?.rue ? action.adresse?.rue : action.adresse.type_voie + ' ' + action.adresse?.nom_voie,
        codePostal: action.adresse.codePostal ? action.adresse.codePostal : action.adresse.code_postal,
        ville: action.adresse.ville ? action.adresse.ville : action.adresse.localite,
        siret: Number(action.adresse.siret)
      };
    case 'UPDATE_LIEUACTIVITE':
      return {
        ...state,
        lieuActivite: action.value,
        showError: false,
        errorsFormulaire: state?.errorsFormulaire?.filter(erreur => erreur.name !== 'lieuActivite')
      };
    case 'UPDATE_SIRET':
      return {
        ...state,
        siret: Number(action.value),
        showError: false,
        errorsFormulaire: state?.errorsFormulaire?.filter(erreur => erreur.name !== 'siret')
      };
    case 'UPDATE_NUMEROTELEPHONE':
      return {
        ...state,
        numeroTelephone: action.value,
        showError: false,
        errorsFormulaire: state?.errorsFormulaire?.filter(erreur => erreur.name !== 'numeroTelephone')
      };
    case 'UPDATE_EMAIL':
      return {
        ...state,
        email: action.value,
        showError: false,
        errorsFormulaire: state?.errorsFormulaire?.filter(erreur => erreur.name !== 'email')
      };
    case 'UPDATE_SITEWEB':
      return {
        ...state,
        siteWeb: action.value,
        showError: false,
        errorsFormulaire: state?.errorsFormulaire?.filter(erreur => erreur.name !== 'siteWeb')
      };

    /* Partie Adresse */
    case 'UPDATE_NUMEROVOIE':
      return {
        ...state,
        numeroVoie: action.value,
        showError: false,
        errorsFormulaire: state?.errorsFormulaire?.filter(erreur => erreur.name !== 'numeroVoie')
      };
    case 'UPDATE_RUEVOIE':
      return {
        ...state,
        rueVoie: action.value,
        showError: false,
        errorsFormulaire: state?.errorsFormulaire?.filter(erreur => erreur.name !== 'rueVoie')
      };
    case 'UPDATE_CODEPOSTAL':
      return {
        ...state,
        codePostal: action.value,
        showError: false,
        errorsFormulaire: state?.errorsFormulaire?.filter(erreur => erreur.name !== 'codePostal')
      };
    case 'UPDATE_VILLE':
      return {
        ...state,
        ville: action.value,
        showError: false,
        errorsFormulaire: state?.errorsFormulaire?.filter(erreur => erreur.name !== 'ville')
      };
    /* Partie Itinerance */
    case 'UPDATE_ITINERANCE':

      return {
        ...state,
        itinerance: action.itinerance,
        showError: false,
        errorsFormulaire: state?.errorsFormulaire?.filter(erreur => erreur.name !== 'itinerance')
      };
    /* Partie Horaires */
    case 'UPDATE_LUNDIMATINDEBUT':
      return {
        ...state,
        showError: false,
        lundiMatinDebut: action.value
      };
    case 'UPDATE_LUNDIMATINFIN':
      return {
        ...state,
        showError: false,
        lundiMatinFin: action.value
      };
    case 'UPDATE_LUNDIAPRESMIDIDEBUT':
      return {
        ...state,
        showError: false,
        lundiApresMidiDebut: action.value
      };
    case 'UPDATE_LUNDIAPRESMIDIFIN':
      return {
        ...state,
        showError: false,
        lundiApresMidiFin: action.value
      };
    case 'UPDATE_MARDIMATINDEBUT':
      return {
        ...state,
        showError: false,
        mardiMatinDebut: action.value
      };
    case 'UPDATE_MARDIMATINFIN':
      return {
        ...state,
        showError: false,
        mardiMatinFin: action.value
      };
    case 'UPDATE_MARDIAPRESMIDIDEBUT':
      return {
        ...state,
        showError: false,
        mardiApresMidiDebut: action.value
      };
    case 'UPDATE_MARDIAPRESMIDIFIN':
      return {
        ...state,
        showError: false,
        mardiApresMidiFin: action.value
      };
    case 'UPDATE_MERCREDIMATINDEBUT':
      return {
        ...state,
        showError: false,
        mercrediMatinDebut: action.value
      };
    case 'UPDATE_MERCREDIMATINFIN':
      return {
        ...state,
        showError: false,
        mercrediMatinFin: action.value
      };
    case 'UPDATE_MERCREDIAPRESMIDIDEBUT':
      return {
        ...state,
        showError: false,
        mercrediApresMidiDebut: action.value
      };
    case 'UPDATE_MERCREDIAPRESMIDIFIN':
      return {
        ...state,
        showError: false,
        mercrediApresMidiFin: action.value
      };
    case 'UPDATE_JEUDIMATINDEBUT':
      return {
        ...state,
        showError: false,
        jeudiMatinDebut: action.value
      };
    case 'UPDATE_JEUDIMATINFIN':
      return {
        ...state,
        showError: false,
        jeudiMatinFin: action.value
      };
    case 'UPDATE_JEUDIAPRESMIDIDEBUT':
      return {
        ...state,
        showError: false,
        jeudiApresMidiDebut: action.value
      };
    case 'UPDATE_JEUDIAPRESMIDIFIN':
      return {
        ...state,
        showError: false,
        jeudiApresMidiFin: action.value
      };
    case 'UPDATE_VENDREDIMATINDEBUT':
      return {
        ...state,
        showError: false,
        vendrediMatinDebut: action.value
      };
    case 'UPDATE_VENDREDIMATINFIN':
      return {
        ...state,
        showError: false,
        vendrediMatinFin: action.value
      };
    case 'UPDATE_VENDREDIAPRESMIDIDEBUT':
      return {
        ...state,
        showError: false,
        vendrediApresMidiDebut: action.value
      };
    case 'UPDATE_VENDREDIAPRESMIDIFIN':
      return {
        ...state,
        showError: false,
        vendrediApresMidiFin: action.value
      };
    case 'UPDATE_SAMEDIMATINDEBUT':
      return {
        ...state,
        showError: false,
        samediMatinDebut: action.value
      };
    case 'UPDATE_SAMEDIMATINFIN':
      return {
        ...state,
        showError: false,
        samediMatinFin: action.value
      };
    case 'UPDATE_SAMEDIAPRESMIDIDEBUT':
      return {
        ...state,
        showError: false,
        samediApresMidiDebut: action.value
      };
    case 'UPDATE_SAMEDIAPRESMIDIFIN':
      return {
        ...state,
        showError: false,
        samediApresMidiFin: action.value
      };
    case 'UPDATE_DIMANCHEMATINDEBUT':
      return {
        ...state,
        showError: false,
        dimancheMatinDebut: action.value
      };
    case 'UPDATE_DIMANCHEMATINFIN':
      return {
        ...state,
        showError: false,
        dimancheMatinFin: action.value
      };
    case 'UPDATE_DIMANCHEAPRESMIDIDEBUT':
      return {
        ...state,
        showError: false,
        dimancheApresMidiDebut: action.value
      };
    case 'UPDATE_DIMANCHEAPRESMIDIFIN':
      return {
        ...state,
        showError: false,
        dimancheApresMidiFin: action.value
      };
      /* init du formulaire de mise à jour des informations */
    case 'INIT_INFORMATION':
      return {
        ...state,
        adresseExact: true,
        lieuActivite: action.informations.nomEnseigne,
        siret: Number(action.informations.siret),
        numeroTelephone: action.informations.numeroTelephone,
        email: action.informations.email,
        siteWeb: action.informations.siteWeb ? action.informations.siteWeb : '',
        itinerance: String(action.informations.itinerant),

        numeroVoie: action.informations.adresse.numeroRue,
        rueVoie: action.informations.adresse?.rue,
        codePostal: action.informations.adresse.codePostal,
        ville: action.informations.adresse.ville,

        lundiMatinDebut: action.informations.horaires[0].lundi.matin[0],
        lundiMatinFin: action.informations.horaires[0].lundi.matin[1],
        lundiApresMidiDebut: action.informations.horaires[0].lundi.apresMidi[0],
        lundiApresMidiFin: action.informations.horaires[0].lundi.apresMidi[1],
        mardiMatinDebut: action.informations.horaires[1].mardi.matin[0],
        mardiMatinFin: action.informations.horaires[1].mardi.matin[1],
        mardiApresMidiDebut: action.informations.horaires[1].mardi.apresMidi[0],
        mardiApresMidiFin: action.informations.horaires[1].mardi.apresMidi[1],
        mercrediMatinDebut: action.informations.horaires[2].mercredi.matin[0],
        mercrediMatinFin: action.informations.horaires[2].mercredi.matin[1],
        mercrediApresMidiDebut: action.informations.horaires[2].mercredi.apresMidi[0],
        mercrediApresMidiFin: action.informations.horaires[2].mercredi.apresMidi[1],
        jeudiMatinDebut: action.informations.horaires[3].jeudi.matin[0],
        jeudiMatinFin: action.informations.horaires[3].jeudi.matin[1],
        jeudiApresMidiDebut: action.informations.horaires[3].jeudi.apresMidi[0],
        jeudiApresMidiFin: action.informations.horaires[3].jeudi.apresMidi[1],
        vendrediMatinDebut: action.informations.horaires[4].vendredi.matin[0],
        vendrediMatinFin: action.informations.horaires[4].vendredi.matin[1],
        vendrediApresMidiDebut: action.informations.horaires[4].vendredi.apresMidi[0],
        vendrediApresMidiFin: action.informations.horaires[4].vendredi.apresMidi[1],
        samediMatinDebut: action.informations.horaires[5].samedi.matin[0],
        samediMatinFin: action.informations.horaires[5].samedi.matin[1],
        samediApresMidiDebut: action.informations.horaires[5].samedi.apresMidi[0],
        samediApresMidiFin: action.informations.horaires[5].samedi.apresMidi[1],
        dimancheMatinDebut: action.informations.horaires[6].dimanche.matin[0],
        dimancheMatinFin: action.informations.horaires[6].dimanche.matin[1],
        dimancheApresMidiDebut: action.informations.horaires[6].dimanche.apresMidi[0],
        dimancheApresMidiFin: action.informations.horaires[6].dimanche.apresMidi[1]
      };
    default:
      return state;
  }
}
