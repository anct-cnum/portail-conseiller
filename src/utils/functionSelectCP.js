import codesPostaux from '../data/codesPostaux.json';

//Tri
const tri = codesPostaux => {
  return codesPostaux.sort(function compare(a, b) {
    if (a.Nom_commune < b.Nom_commune) {
      return -1;
    }
    if (a.Nom_commune > b.Nom_commune) {
      return 1;
    }
    return 0;
  });
};

//Remove doublons if necessary
const removeDuplicatesFromArray = arr => [...new Set(
  arr.map(el => JSON.stringify(el))
)].map(e => JSON.parse(e));

//filter array with search
export const filterArray = text => {
  return tri(removeDuplicatesFromArray(codesPostaux).filter(
    codePostal => String(codePostal.Code_postal).startsWith(text) || String(codePostal.Nom_commune.toLowerCase()).startsWith(text.toLowerCase())
  ));
};
