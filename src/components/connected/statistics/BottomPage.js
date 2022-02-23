import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/fr';
import ElementHighcharts from './Components/ElementHighcharts';
import { sortByMonthAndYear } from '../../../utils/functionsSort';

function BottomPage({ donneesStats, print }) {

  const tabColorAge = ['#ff007a', '#6945bd', '#c6c9ae', '#ff5e3b', '#00ba8e'];
  const tabColorStatut = ['#a2b4b1', '#ffdbd2', '#a3a6bc', '#ddb094', '#fff480'];

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

  const { statsEvolutions, statsUsagers, statsAges } = donneesStats;

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
      optionTitre: '&eacute;volution des accompagnements',
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
      optionTitre: '&eacute;volution des accompagnements',
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

        <div className="rf-col-12 rf-col-md-5 rf-col-lg-3">
          <div className="rf-mt-6w rf-mb-5w rf-m-xs-to-md-7v"><hr/></div>
          <ElementHighcharts donneesStats={statsAges} variablesGraphique={graphiqueAge} print={print}/>
        </div>

        <div className="rf-col-offset-12 rf-col-offset-md-6 rf-col-offset-lg-1"></div>

        <div className="rf-col-12 rf-col-md-5 rf-col-lg-3">
          <div className="rf-mt-6w rf-mb-5w rf-m-xs-to-md-7v"><hr/></div>
          <ElementHighcharts donneesStats={statsUsagers} variablesGraphique={graphiqueStatut} print={print}/>
        </div>
        <div className="rf-col-12">
          <div className="rf-m-xs-to-md-7v rf-md-9w rf-m-lg-15w"></div>
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
