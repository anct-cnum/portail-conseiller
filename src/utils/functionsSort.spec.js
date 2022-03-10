import { sortByMonthAndYear } from './functionsSort';

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
