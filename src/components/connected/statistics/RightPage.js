import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { sortByMonthAndYear } from '../../../utils/functionsSort';
import ElementHighcharts from './Components/ElementHighcharts';

function RightPage({ donneesStats, print }) {

  const tabColorTheme = ['#cac5b0', '#abb8df', '#fdcf41', '#169b62', '#80d5c6', '#ff8d7e', '#714753', '#956052', '#ddb094', '#5770be', '#ffed33', '#be9b31'];
  const tabColorAge = ['#ff007a', '#6945bd', '#c6c9ae', '#ff5e3b', '#00ba8e'];

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

  const { statsThemes, statsEvolutions } = donneesStats;


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
      largeurGraphique: 620,
      hauteurGraphique: 310,
      margeGaucheGraphique: 80,
      margeDroiteGraphique: 0,
      optionResponsive: false,
      couleursGraphique: tabColorAge,
      largeurGraphiquePrint: 1100,
      hauteurGraphiquePrint: 500,
      margeGaucheGraphiquePrint: 100,
      margeDroiteGraphiquePrint: 200,
    },
    titre: {
      optionTitre: '&Eacute;volution des comptes rendus d&rsquo;activit&eacute;',
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
      optionTitre: '&Eacute;volution des comptes rendus d&rsquo;activit&eacute',
      margeTitre: 48,
      placementTitre: 10,
    }
  };

  const barGraphique = {
    graphique: {
      typeGraphique: 'bar',
      largeurGraphique: 950,
      hauteurGraphique: 428,
      margeGaucheGraphique: 300,
      margeDroiteGraphique: 0,
      optionResponsive: false,
      couleursGraphique: tabColorTheme,
      largeurGraphiquePrint: 1100,
      hauteurGraphiquePrint: 500,
      margeGaucheGraphiquePrint: 300,
      margeDroiteGraphiquePrint: 0,
    },
    titre: {
      optionTitre: 'Th&egrave;mes des accompagnements',
      margeTitre: 38,
      placementTitre: 0
    }
  };

  const barGraphiqueSm = {
    graphique: {
      typeGraphique: 'bar',
      largeurGraphique: null,
      hauteurGraphique: 650,
      margeGaucheGraphique: 0,
      margeDroiteGraphique: 0,
      optionResponsive: true,
      couleursGraphique: tabColorTheme
    },
    titre: {
      optionTitre: 'Th&egrave;mes des accompagnements',
      margeTitre: 28,
      placementTitre: 0
    }
  };

  return (
    <>
      <div className="fr-col-12 fr-col-md-5 fr-col-lg-7 graphique-responsive-lg dont-print">
        <div className="fr-container-fluid">
          <div className="fr-grid-row ">

            <div className="fr-col-12">
              <ElementHighcharts donneesStats={statsThemes} variablesGraphique={barGraphique} print={print}/>
            </div>

            <div className="fr-col-12">
              <div className="fr-my-6w fr-m-xs-to-md-7v"><hr/></div>
            </div>
            <div className="fr-col-12 evolution-print">
              <span className="graphique-responsive-md-lg ">
                <ElementHighcharts donneesStats={statsEvolutionsFiltered} variablesGraphique={graphiqueEvolution} print={print}/>
                <hr className="fr-mt-6w"/>
              </span>
            </div>

            {/*
            <div className="fr-col-12 fr-col-lg-6">
              <ElementHighcharts donneesStats={statsTempsAccompagnements} variablesGraphique={pieGraphiqueSmTemps} print={print}/>
            </div>

            <div className="fr-col-12 fr-col-lg-6 dont-print">
              <div className="fr-ml-md-6w">
                <ElementHighcharts donneesStats={statsDurees} variablesGraphique={columnGraphiqueSm} print={print}/>
              </div>
            </div>
           */}
          </div>
        </div>
      </div>

      <div className="fr-col-12 fr-col-md-5 graphique-responsive-md dont-print">

        <div className="fr-container-fluid">
          <div className="fr-grid-row ">
            {/*
            <div className="fr-col-12">
              <ElementHighcharts donneesStats={statsThemes} variablesGraphique={barGraphiqueSm} print={print}/>
            </div>
            */}
          </div>
        </div>
      </div>
      {/*
      <div className="fr-col-12 graphique-responsive-md dont-print">
        <div className="fr-container-fluid">
          <div className="fr-grid-row ">
           <div className="fr-col-12 fr-col-md-5 hr-sm-hide">
              <div className="fr-m-6w fr-m-xs-to-md-7v"><hr/></div>
            </div>

            <div className="fr-col-offset-md-1"></div>

            <div className="fr-col-12 fr-col-md-5">
              <div className="fr-m-xs-to-md-7v"><hr/></div>
            </div>


            <div className="fr-col-12 hr-md-hide dont-print">
              <div className="fr-m-6w fr-m-xs-to-md-7v"><hr/></div>
            </div>

            <div className="fr-col-12 fr-col-md-6">
              <ElementHighcharts donneesStats={statsDurees} variablesGraphique={columnGraphiqueSm} print={print}/>
            </div>

          </div>
        </div>
      </div>
      <div className="fr-col-12 fr-mb-6w only-print theme-print">

          <div className="mozilla-espace-block"></div>
           <ElementHighcharts donneesStats={statsThemes} variablesGraphique={barGraphique} print={true}/>
          </div>
          <div className="fr-col-12 only-print lieux-print">
            <ElementHighcharts donneesStats={statsTempsAccompagnements} variablesGraphique={pieGraphiqueTemps} print={true}/>
          </div>
          <div className="fr-col-12 fr-mb-6w only-print duree-print">
            <ElementHighcharts donneesStats={statsDurees} variablesGraphique={columnGraphique} print={true}/>
          </div>

      </div>     */}
    </>
  );
}

RightPage.propTypes = {
  donneesStats: PropTypes.object,
  print: PropTypes.bool
};

export default RightPage;
