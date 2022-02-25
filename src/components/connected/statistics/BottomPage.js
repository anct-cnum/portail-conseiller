import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/fr';
import ElementHighcharts from './Components/ElementHighcharts';
import { sortByMonthAndYear } from '../../../utils/functionsSort';

import labelsCorrespondance from '../../../data/labelsCorrespondance.json';
import { statistiqueActions } from '../../../actions/statistique.actions';

function BottomPage({ donneesStats, print }) {

  const dispatch = useDispatch();

  const listeAutres = useSelector(states => states.statistique.listeAutresReorientations);

  const tabColorAge = ['#ff007a', '#6945bd', '#c6c9ae', '#ff5e3b', '#00ba8e'];
  const tabColorStatut = ['#a2b4b1', '#ffdbd2', '#a3a6bc', '#ddb094', '#fff480'];
  const tabColorLieux = [
    '#ff007a', '#6945bd', '#c6c9ae', '#ff5e3b', '#00ba8e', '#a2b4b1', '#ffdbd2', '#a3a6bc', '#ddb094', '#fff480',
    '#cac5b0', '#abb8df', '#fdcf41', '#169b62', '#80d5c6', '#ff8d7e', '#714753', '#956052', '#ffed33', '#be9b31'
  ];

  const get4lastMonths = (month, year) => {
    let monthToPrint = [month];
    let yearAssociated = [year];
    let lastInsertedMonth = month;
    let lastInsertedYear = year;
    for (let i = 0; i < 3; i++) {
      lastInsertedYear = lastInsertedMonth - 1 === -1 ? lastInsertedYear - 1 : lastInsertedYear;
      lastInsertedMonth = lastInsertedMonth - 1 === -1 ? 11 : lastInsertedMonth - 1; //11 = décembre dans Date
      monthToPrint.push(lastInsertedMonth);
      yearAssociated.push(lastInsertedYear.toString());
    }
    return [monthToPrint, yearAssociated];
  };

  const { statsEvolutions, statsUsagers, statsAges, statsReorientations } = donneesStats;

  //Map des stats evolutions pour ajouter les données nécessaires pour le graph (label mois année, valeur)
  let statsEvolutionsMapped = [];
  for (const [annee, moisListe] of Object.entries(statsEvolutions)) {
    let statsEvolutionsMapped2 = moisListe.map(mois => {
      mois.nom = moment().month(`${mois.mois}`).format('MMMM');
      mois.nom = mois.nom?.concat(' ', annee);
      mois.annee = annee;
      mois.valeur = mois.totalCras;
      return mois;
    });
    statsEvolutionsMapped.push(...statsEvolutionsMapped2);
  }

  //Filtrage pour ne garder que le mois en cours et les 3 précédents max
  let monthToPrint = get4lastMonths(new Date().getMonth(), new Date().getUTCFullYear());
  let statsEvolutionsFiltered = Object.values(statsEvolutionsMapped).filter(mois => {
    // eslint-disable-next-line max-len
    return monthToPrint[0].includes(mois.mois) && monthToPrint[1][monthToPrint[0].findIndex(mois2 => mois.mois === mois2)].toString() === mois.annee ? mois : '';
  });

  //Ajout des mois manquants (donc avec totalCras à 0)
  monthToPrint[0].forEach((value, index) => {
    if (statsEvolutionsFiltered.some(mois => mois.mois === value) === false) {
      let annee = monthToPrint[1][index];
      let nom = moment().month(`${value}`).format('MMMM');
      nom = nom?.concat(' ', annee);
      statsEvolutionsFiltered.push({ 'mois': value, 'valeur': 0, 'annee': annee.toString(), 'nom': nom });
    }
  });

  //Tri par mois/annee croissant
  statsEvolutionsFiltered.sort(sortByMonthAndYear);

  //Tri liste des réorientations autres
  if (statsReorientations?.length > 0) {
    let listeAutres = [];
    let listDelete = [];
    let donneesAutre = {
      nom: 'Autres',
      valeur: 0
    };
    statsReorientations.forEach((donnees, i) => {
      if (labelsCorrespondance.find(label => label.nom === donnees.nom)?.correspondance === undefined) {
        donneesAutre.valeur += donnees.valeur;
        listeAutres.push(donnees.nom);
        listDelete.push(i);
      }
    });
    if (!statsReorientations.find(stats => stats?.nom === 'Autres')) {
      statsReorientations.push(donneesAutre);
      listDelete.forEach(i => {
        delete statsReorientations[i];
      });
      dispatch(statistiqueActions.updateListeAutresReorientations(listeAutres));
    }
  }

  const graphiqueEvolution = {
    graphique: {
      typeGraphique: 'xy',
      largeurGraphique: 320,
      hauteurGraphique: 310,
      margeGaucheGraphique: 40,
      margeDroiteGraphique: 70,
      optionResponsive: false,
      couleursGraphique: tabColorAge
    },
    titre: {
      optionTitre: '&Eacute;volution des accompagnements',
      margeTitre: 48,
    }
  };

  const graphiqueEvolutionSM = {
    graphique: {
      typeGraphique: 'xy',
      largeurGraphique: 320,
      hauteurGraphique: 310,
      margeGaucheGraphique: 40,
      margeDroiteGraphique: 70,
      optionResponsive: false,
      couleursGraphique: tabColorAge
    },
    titre: {
      optionTitre: '&Eacute;volution des accompagnements',
      margeTitre: 48,
      placementTitre: 10,
    }
  };

  const graphiqueAge = {
    graphique: {
      typeGraphique: 'stacked',
      largeurGraphique: 300,
      hauteurGraphique: 300,
      margeGaucheGraphique: 0,
      margeDroiteGraphique: 0,
      optionResponsive: false,
      couleursGraphique: tabColorAge
    },
    titre: {
      optionTitre: 'Tranches d\'âge des usagers',
      margeTitre: 34,
    }
  };

  const graphiqueStatut = {
    graphique: {
      typeGraphique: 'stacked',
      largeurGraphique: 300,
      hauteurGraphique: 300,
      margeGaucheGraphique: 0,
      margeDroiteGraphique: 0,
      optionResponsive: false,
      couleursGraphique: tabColorStatut
    },
    titre: {
      optionTitre: 'Statut des usagers',
      margeTitre: 34,
    }
  };

  const graphiqueReorientationsSM = {
    graphique: {
      typeGraphique: 'pie',
      largeurGraphique: 320,
      hauteurGraphique: 320,
      margeGaucheGraphique: 0,
      margeDroiteGraphique: 10,
      optionResponsive: true,
      couleursGraphique: tabColorLieux
    },
    titre: {
      optionTitre: 'Usager.ères réorienté.es',
      margeTitre: -17,
      placementTitre: 0
    }
  };

  const graphiqueReorientations = {
    graphique: {
      typeGraphique: 'pie',
      hauteurGraphique: 555,
      margeGaucheGraphique: print ? -315 : -419,
      optionResponsive: false,
      couleursGraphique: tabColorLieux
    },
    titre: {
      optionTitre: 'Usager.ères réorienté.es',
      margeTitre: 48,
      placementTitre: 0
    }
  };

  return (
    <div className="rf-col-12">
      <div className="rf-grid-row">

        <div className="rf-col-12 rf-col-md-5 rf-col-lg-3 evolution-print">
          <div className="rf-mt-6w rf-mb-5w rf-m-xs-to-md-7v no-print"><hr/></div>
          <span className="graphique-responsive-md-lg ">
            <ElementHighcharts donneesStats={statsEvolutionsFiltered} variablesGraphique={graphiqueEvolution} print={print}/>
          </span>
          <span className="graphique-responsive-sm">
            <ElementHighcharts donneesStats={statsEvolutionsFiltered} variablesGraphique={graphiqueEvolutionSM} print={print}/>
          </span>
        </div>

        <div className="rf-col-offset-12 rf-col-offset-md-1"></div>

        <div className="rf-col-12 rf-col-md-5 rf-col-lg-3 age-print">
          <div className="rf-mt-6w rf-mb-5w rf-m-xs-to-md-7v"><hr className="no-print"/></div>
          <ElementHighcharts donneesStats={statsAges} variablesGraphique={graphiqueAge} print={print}/>
        </div>

        <div className="rf-col-12 rf-col-md-5 graphique-responsive-md no-print">
          {statsReorientations.length > 0 &&
            <>
              <div className="rf-mt-6w rf-mb-5w rf-m-xs-to-md-7v"><hr/></div>
              <ElementHighcharts donneesStats={statsReorientations} variablesGraphique={graphiqueReorientationsSM} print={print}/>
            </>
          }
        </div>

        <div className="rf-col-offset-md-1 rf-col-12 rf-col-md-5 rf-col-lg-3 statut-print">
          <div className="rf-mt-6w rf-mb-5w rf-m-xs-to-md-7v no-print"><hr/></div>
          <ElementHighcharts donneesStats={statsUsagers} variablesGraphique={graphiqueStatut} print={print}/>
        </div>
        <div className="rf-col-12 rf-col-offset-md-4 rf-col-md-8 graphique-responsive-lg reorientation-print">
          <div className="rf-mt-6w"></div>
          {statsReorientations.length > 0 &&
            <ElementHighcharts donneesStats={statsReorientations} variablesGraphique={graphiqueReorientations} listeAutres={listeAutres} print={print}/>
          }
          <div className="rf-m-no-reorientation"></div>
        </div>

      </div>
    </div>
  );
}

BottomPage.propTypes = {
  donneesStats: PropTypes.object,
  print: PropTypes.bool
};
export default BottomPage;
