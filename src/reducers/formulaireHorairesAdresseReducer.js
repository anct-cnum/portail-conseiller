
const initialState = {
  isAdresseCachee: true
};
export default function formulaireHorairesAdresse(state = initialState, action) {
  switch (action.type) {
    case 'VERIFY_FORMULAIRE':
      return {
        ...state,
        errorsFormulaire: action.errors
      };
    /* Partie Informations */
    case 'CACHER_ADRESSE':
      return {
        ...state,
        isAdresseCachee: action.input,
      };
    case 'MONTRER_ADRESSE':
      return {
        ...state,
        isAdresseCachee: action.input,
        numeroVoie: '',
        rueVoie: '',
        codePostal: '',
        ville: '',
        siret: ''
      };
    case 'INIT_ADRESSE':
      return {
        ...state,
        numeroVoie: action.adresse.numero_voie,
        rueVoie: action.adresse.type_voie + ' ' + action.adresse?.nom_voie,
        codePostal: action.adresse.code_postal,
        ville: action.adresse.localite,
        siret: action.adresse.siret
      };
    case 'UPDATE_LIEUACTIVITE':
      return {
        ...state,
        lieuActivite: action.value
      };
    case 'UPDATE_SIRET':
      return {
        ...state,
        siret: action.value
      };
    case 'UPDATE_NUMEROTELEPHONE':
      return {
        ...state,
        numeroTelephone: action.value
      };
    case 'UPDATE_EMAIL':
      return {
        ...state,
        email: action.value
      };
    case 'UPDATE_SITEWEB':
      return {
        ...state,
        siteWeb: action.value
      };

    /* Partie Adresse */
    case 'UPDATE_NUMEROVOIE':
      return {
        ...state,
        numeroVoie: action.value
      };
    case 'UPDATE_RUEVOIE':
      return {
        ...state,
        rueVoie: action.value
      };
    case 'UPDATE_CODEPOSTAL':
      return {
        ...state,
        codePostal: action.value
      };
    case 'UPDATE_VILLE':
      return {
        ...state,
        ville: action.value
      };
    /* Partie Itinerance */
    case 'UPDATE_ITINERANCE':
      return {
        ...state,
        itinerance: action.itinerance === 'true'
      };
    /* Partie Horaires */
    case 'UPDATE_LUNDIMATINDEBUT':
      return {
        ...state,
        lundiMatinDebut: action.value
      };
    case 'UPDATE_LUNDIMATINFIN':
      return {
        ...state,
        lundiMatinFin: action.value
      };
    case 'UPDATE_LUNDIAPRESMIDIDEBUT':
      return {
        ...state,
        lundiApresMidiDebut: action.value
      };
    case 'UPDATE_LUNDIAPRESMIDIFIN':
      return {
        ...state,
        lundiApresMidiFin: action.value
      };
    case 'UPDATE_MARDIMATINDEBUT':
      return {
        ...state,
        mardiMatinDebut: action.value
      };
    case 'UPDATE_MARDIMATINFIN':
      return {
        ...state,
        mardiMatinFin: action.value
      };
    case 'UPDATE_MARDIAPRESMIDIDEBUT':
      return {
        ...state,
        mardiApresMidiDebut: action.value
      };
    case 'UPDATE_MARDIAPRESMIDIFIN':
      return {
        ...state,
        mardiApresMidiFin: action.value
      };
    case 'UPDATE_MERCREDIMATINDEBUT':
      return {
        ...state,
        mercrediMatinDebut: action.value
      };
    case 'UPDATE_MERCREDIMATINFIN':
      return {
        ...state,
        mercrediMatinFin: action.value
      };
    case 'UPDATE_MERCREDIAPRESMIDIDEBUT':
      return {
        ...state,
        mercrediApresMidiDebut: action.value
      };
    case 'UPDATE_MERCREDIAPRESMIDIFIN':
      return {
        ...state,
        mercrediApresMidiFin: action.value
      };
    case 'UPDATE_JEUDIMATINDEBUT':
      return {
        ...state,
        jeudiMatinDebut: action.value
      };
    case 'UPDATE_JEUDIMATINFIN':
      return {
        ...state,
        jeudiMatinFin: action.value
      };
    case 'UPDATE_JEUDIAPRESMIDIDEBUT':
      return {
        ...state,
        jeudiApresMidiDebut: action.value
      };
    case 'UPDATE_JEUDIAPRESMIDIFIN':
      return {
        ...state,
        jeudiApresMidiFin: action.value
      };
    case 'UPDATE_VENDREDIMATINDEBUT':
      return {
        ...state,
        vendrediMatinDebut: action.value
      };
    case 'UPDATE_VENDREDIMATINFIN':
      return {
        ...state,
        vendrediMatinFin: action.value
      };
    case 'UPDATE_VENDREDIAPRESMIDIDEBUT':
      return {
        ...state,
        vendrediApresMidiDebut: action.value
      };
    case 'UPDATE_VENDREDIAPRESMIDIFIN':
      return {
        ...state,
        vendrediApresMidiFin: action.value
      };
    case 'UPDATE_SAMEDIMATINDEBUT':
      return {
        ...state,
        samediMatinDebut: action.value
      };
    case 'UPDATE_SAMEDIMATINFIN':
      return {
        ...state,
        samediMatinFin: action.value
      };
    case 'UPDATE_SAMEDIAPRESMIDIDEBUT':
      return {
        ...state,
        samediApresMidiDebut: action.value
      };
    case 'UPDATE_SAMEDIAPRESMIDIFIN':
      return {
        ...state,
        samediApresMidiFin: action.value
      };
    case 'UPDATE_DIMANCHEMATINDEBUT':
      return {
        ...state,
        dimancheMatinDebut: action.value
      };
    case 'UPDATE_DIMANCHEMATINFIN':
      return {
        ...state,
        dimancheMatinFin: action.value
      };
    case 'UPDATE_DIMANCHEAPRESMIDIDEBUT':
      return {
        ...state,
        dimancheApresMidiDebut: action.value
      };
    case 'UPDATE_DIMANCHEAPRESMIDIFIN':
      return {
        ...state,
        dimancheApresMidiFin: action.value
      };
    default:
      return state;
  }
}
