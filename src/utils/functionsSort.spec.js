import { sortByValueThenName, sortByMonthAndYear } from './functionsSort';

describe('Ordre d\'affichage des themes', () => {

  it('devrait retourner les thèmes par ordre décroissant selon la valeur', () => {

    const themes = [
      {
        'nom': 'echanger',
        'valeur': 0
      },
      {
        'nom': 'demarche en ligne',
        'valeur': 4
      },
      {
        'nom': 'securite',
        'valeur': 1
      },
      {
        'nom': 'fraude et harcelement',
        'valeur': 8
      },
      {
        'nom': 'sante',
        'valeur': 3
      }
    ];

    const expectedResult = [
      {
        'nom': 'fraude et harcelement',
        'valeur': 8
      },
      {
        'nom': 'demarche en ligne',
        'valeur': 4
      },
      {
        'nom': 'sante',
        'valeur': 3
      },
      {
        'nom': 'securite',
        'valeur': 1
      },
      {
        'nom': 'echanger',
        'valeur': 0
      }
    ];

    const result = themes.sort(sortByValueThenName);

    expect(result).toStrictEqual(expectedResult);
  });

  it('devrait retourner les thèmes par ordre décroissant selon le libellé associé au nom si la valeur est identique', () => {

    const themes = [
      {
        'nom': 'equipement informatique',
        'valeur': 4
      },
      {
        'nom': 'internet',
        'valeur': 4
      },
      {
        'nom': 'trouver emploi',
        'valeur': 4
      },
      {
        'nom': 'accompagner enfant',
        'valeur': 4
      },
      {
        'nom': 'demarche en ligne',
        'valeur': 4
      }
    ];

    const expectedResult = [
      {
        'nom': 'accompagner enfant', //Correpondance : Accompagner son enfant
        'valeur': 4
      },
      {
        'nom': 'demarche en ligne', //Correpondance : D&eacute;marche en ligne
        'valeur': 4
      },
      {
        'nom': 'trouver emploi', //Correpondance : Emploi, formation
        'valeur': 4
      },
      {
        'nom': 'internet', //Correpondance : Naviguer sur Internet
        'valeur': 4
      },
      {
        'nom': 'equipement informatique', //Correpondance : Prendre en main un &eacute;quipement
        'valeur': 4
      },
    ];

    const result = themes.sort(sortByValueThenName);

    expect(result).toStrictEqual(expectedResult);
  });
});

describe('Ordre d\'affichage des mois dans les stats évolutions', () => {

  it('devrait retourner les mois par ordre croissant dans la même année', () => {

    const evolutions = [
      {
        '_id': 11,
        'totalCras': 3,
        'mois': 11,
        'annee': '2021',
        'nom': 'décembre 2021',
        'valeur': 3
      },
      {
        '_id': 10,
        'totalCras': 3,
        'mois': 10,
        'annee': '2021',
        'nom': 'novembre 2021',
        'valeur': 3
      }
    ];

    const expectedResult = [
      {
        '_id': 10,
        'totalCras': 3,
        'mois': 10,
        'annee': '2021',
        'nom': 'novembre 2021',
        'valeur': 3
      },
      {
        '_id': 11,
        'totalCras': 3,
        'mois': 11,
        'annee': '2021',
        'nom': 'décembre 2021',
        'valeur': 3
      }
    ];

    const result = evolutions.sort(sortByMonthAndYear);

    expect(result).toStrictEqual(expectedResult);
  });

  it('devrait retourner les mois par ordre croissant sur la même année uniquement', () => {

    const evolutions = [
      {
        '_id': 1,
        'totalCras': 4,
        'mois': 1,
        'annee': '2022',
        'nom': 'février 2022',
        'valeur': 4
      },
      {
        '_id': 11,
        'totalCras': 3,
        'mois': 11,
        'annee': '2021',
        'nom': 'décembre 2021',
        'valeur': 3
      },
      {
        '_id': 0,
        'totalCras': 4,
        'mois': 0,
        'annee': '2022',
        'nom': 'janvier 2022',
        'valeur': 4
      },
      {
        '_id': 10,
        'totalCras': 3,
        'mois': 10,
        'annee': '2021',
        'nom': 'novembre 2021',
        'valeur': 3
      }
    ];

    const expectedResult = [
      {
        '_id': 10,
        'totalCras': 3,
        'mois': 10,
        'annee': '2021',
        'nom': 'novembre 2021',
        'valeur': 3
      },
      {
        '_id': 11,
        'totalCras': 3,
        'mois': 11,
        'annee': '2021',
        'nom': 'décembre 2021',
        'valeur': 3
      },
      {
        '_id': 0,
        'totalCras': 4,
        'mois': 0,
        'annee': '2022',
        'nom': 'janvier 2022',
        'valeur': 4
      },
      {
        '_id': 1,
        'totalCras': 4,
        'mois': 1,
        'annee': '2022',
        'nom': 'février 2022',
        'valeur': 4
      }
    ];

    const result = evolutions.sort(sortByMonthAndYear);

    expect(result).toStrictEqual(expectedResult);
  });
});
