import { useSelector } from 'react-redux';

//Get value of CRA type
export function prepareLieuActivite(conseillerId, structureId) {

  const fields = useSelector(state => state.permanence?.fields);
  const prefixId = useSelector(state => state.permanence?.prefixIdLieuEnregistrable);
  const conseillers = fields.filter(field => field.name === prefixId + 'conseillers')[0]?.value ?? [];

  if (!conseillers.includes(conseillerId)) {
    conseillers.push(conseillerId);
  }
  
  return {
    //Données du CNFS
    estCoordinateur: fields.filter(field => field.name === 'estCoordinateur')[0]?.value ?? null,
    emailPro: fields.filter(field => field.name === 'emailPro')[0]?.value ?? null,
    telephonePro: fields.filter(field => field.name === 'telephonePro')[0]?.value ?? null,
    //Données du lieu d'activité
    estLieuPrincipal: fields.filter(field => field.name === 'estLieuPrincipal')[0]?.value ?? false,
    _id: fields.filter(field => field.name === prefixId + 'idPermanence')[0]?.value ?? null,
    nomEnseigne: fields.filter(field => field.name === prefixId + 'nomEnseigne')[0]?.value ?? null,
    numeroTelephone: fields.filter(field => field.name === prefixId + 'numeroTelephone')[0]?.value ?? null,
    email: fields.filter(field => field.name === prefixId + 'email')[0]?.value ?? null,
    siteWeb: fields.filter(field => field.name === prefixId + 'siteWeb')[0]?.value ?? null,
    siret: fields.filter(field => field.name === prefixId + 'siret')[0]?.value ?? null,
    adresse: {
      numeroRue: fields.filter(field => field.name === prefixId + 'numeroVoie')[0]?.value ?? null,
      rue: fields.filter(field => field.name === prefixId + 'rueVoie')[0]?.value ?? null,
      codePostal: fields.filter(field => field.name === prefixId + 'codePostal')[0]?.value ?? null,
      ville: fields.filter(field => field.name === prefixId + 'ville')[0]?.value ?? null,
    },
    horaires: fields.filter(field => field.name === prefixId + 'horaires')[0]?.value ?? null,
    estLieuItinerant: fields.filter(field => field.name === prefixId + 'itinerance')[0]?.value ?? false,
    typeAcces: fields.filter(field => field.name === prefixId + 'typeAcces')[0]?.value ?? null,
    conseillers: conseillers,
    structureId: structureId,
  };
}

export function trimValue(value) {
  return value.trim();
}

