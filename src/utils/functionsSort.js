import labelsCorrespondance from '../data/labelsCorrespondance.json';

export function sortByValueThenName(a, b) {
  if (a.valeur > b.valeur) {
    return -1;
  }
  if (a.valeur < b.valeur) {
    return 1;
  }
  const libelle1 = labelsCorrespondance.find(label => label.nom === a.nom)?.correspondance ?? a.nom;
  const libelle2 = labelsCorrespondance.find(label => label.nom === b.nom)?.correspondance ?? b.nom;
  return libelle1.localeCompare(libelle2, 'fr');
}

export function sortByMonthAndYear(a, b) {
  if (a.annee === b.annee) {
    if (a.mois < b.mois) {
      return -1;
    }
    if (a.mois > b.mois) {
      return 1;
    }
    return 0;
  } else {
    return a.annee < b.annee ? -1 : 1;
  }
}
