import { useSelector } from 'react-redux';

//Get value of CRA type
export function getCraValue(type) {

  let cra = useSelector(state => state.cra);

  switch (type) {
    case 'canal':
      return cra?.canal;
    case 'date':
      return cra?.dateAccompagnement;
    case 'activite':
      return cra?.activite;
    case 'age':
      return cra?.age;
    case 'statut':
      return cra?.statut;
    case 'themes':
      return cra?.themes;
    case 'duree':
      return cra?.duree;
    case 'accompagnement':
      return cra?.accompagnement;
    default:
      return '';
  }
}

export function changeToMinusculeWithTrim(value) {
  return value.toLowerCase().trim();
}

export function decodeEntitiesSuggestion(theme) {
  let txt = document.createElement('textarea');
  txt.innerHTML = theme;
  return txt.value;
}

export function getValeurMax(value, nbAccompagnementIndividuel, nbAccompagnementAtelier, nbAccompagnementRedirection, nbParticipants) {
  let nbParticipantsReorientes = 0;
  let valeurMax = nbParticipants;
  if (value !== 'individuel') {
    nbParticipantsReorientes += nbAccompagnementIndividuel;
  }
  if (value !== 'atelier') {
    nbParticipantsReorientes += nbAccompagnementAtelier;
  }
  if (value !== 'redirection') {
    nbParticipantsReorientes += nbAccompagnementRedirection;
  }
  valeurMax -= nbParticipantsReorientes;
  return valeurMax < 0 ? 0 : valeurMax;
}
