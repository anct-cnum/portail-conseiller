import React from 'react';
import PropTypes from 'prop-types';
import ElementHighcharts from './Components/ElementHighcharts';

function RightPage({ donneesStats, print, type = null }) {

  const tabColorTheme = ['#cac5b0', '#abb8df', '#fdcf41', '#169b62', '#80d5c6', '#ff8d7e', '#714753', '#956052', '#ddb094', '#5770be', '#ffed33', '#be9b31'];
  const tabColorLieux = ['#ffcc9f', '#ff8d7e', '#466964', '#5770be'];
  const tabColorDuree = ['#abcdf5', '#abcdf5', '#abcdf5', '#abcdf5'];

  const { statsThemes, statsDurees, statsLieux } = donneesStats;

  const barGraphique = {
    graphique: {
      typeGraphique: 'bar',
      largeurGraphique: 950,
      hauteurGraphique: 428,
      margeGaucheGraphique: 300,
      margeDroiteGraphique: 0,
      optionResponsive: false,
      couleursGraphique: tabColorTheme,
      largeurGraphiquePrint: type !== null ? 700 : 1100,
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

  const pieGraphique = {
    graphique: {
      typeGraphique: 'pie',
      largeurGraphique: 300,
      hauteurGraphique: 320,
      margeGaucheGraphique: 0,
      margeDroiteGraphique: 10,
      optionResponsive: false,
      couleursGraphique: tabColorLieux,
      largeurGraphiquePrint: type !== null ? 700 : 1100,
      hauteurGraphiquePrint: 400,
      margeGaucheGraphiquePrint: 0,
      margeDroiteGraphiquePrint: 10,
    },
    titre: {
      optionTitre: 'Canaux d&rsquo;accompagnements',
      margeTitre: 48,
      placementTitre: 0
    }
  };

  const pieGraphiqueSm = {
    graphique: {
      typeGraphique: 'pie',
      largeurGraphique: 300,
      hauteurGraphique: 320,
      margeGaucheGraphique: 0,
      margeDroiteGraphique: 10,
      optionResponsive: true,
      couleursGraphique: tabColorLieux
    },
    titre: {
      optionTitre: 'Canaux d&rsquo;accompagnements',
      margeTitre: -17,
      placementTitre: 0
    }
  };

  const columnGraphique = {
    graphique: {
      typeGraphique: 'column',
      largeurGraphique: 360,
      hauteurGraphique: 310,
      margeGaucheGraphique: 55,
      margeDroiteGraphique: 55,
      optionResponsive: false,
      couleursGraphique: tabColorDuree,
      largeurGraphiquePrint: type !== null ? 700 : 1100,
      hauteurGraphiquePrint: 450,
      margeGaucheGraphiquePrint: 55,
      margeDroiteGraphiquePrint: 55,
    },
    titre: {
      optionTitre: 'Dur&eacute;e des accompagnements',
      margeTitre: 48,
      placementTitre: 0
    }
  };

  const columnGraphiqueSm = {
    graphique: {
      typeGraphique: 'column',
      largeurGraphique: 300,
      hauteurGraphique: 310,
      margeGaucheGraphique: 55,
      margeDroiteGraphique: 55,
      optionResponsive: false,
      couleursGraphique: tabColorDuree
    },
    titre: {
      optionTitre: 'Dur&eacute;e des accompagnements',
      margeTitre: 48,
      placementTitre: 0
    }
  };

  return (
    <>
      <div className="fr-col-12 fr-col-md-5 fr-col-lg-7 graphique-responsive-lg dont-print">
        <div className="fr-container-fluid">
          <div className="fr-grid-row ">
            <div className="fr-col-12">
              <ElementHighcharts donneesStats={statsThemes} variablesGraphique={barGraphique} print={print} type={type}/>
            </div>

            <div className="fr-col-12">
              <div className="fr-my-6w fr-m-xs-to-md-7v"><hr/></div>
            </div>

            <div className="fr-col-12 fr-col-lg-6">
              <ElementHighcharts donneesStats={statsLieux} variablesGraphique={pieGraphiqueSm} print={print} type={type}/>
            </div>

            <div className="fr-col-12 fr-col-lg-6 dont-print">
              <div className="fr-ml-md-6w">
                <ElementHighcharts donneesStats={statsDurees} variablesGraphique={columnGraphiqueSm} print={print} type={type}/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fr-col-12 fr-col-md-5 graphique-responsive-md dont-print">

        <div className="fr-container-fluid">
          <div className="fr-grid-row ">
            <div className="fr-col-12">
              <ElementHighcharts donneesStats={statsThemes} variablesGraphique={barGraphiqueSm} print={print} type={type}/>
            </div>
          </div>
        </div>
      </div>

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

            <div className="fr-col-12 fr-col-md-6 dont-print">
              <ElementHighcharts donneesStats={statsLieux} variablesGraphique={pieGraphiqueSm} print={print} type={type}/>
            </div>

            <div className="fr-col-12 hr-md-hide dont-print">
              <div className="fr-m-6w fr-m-xs-to-md-7v"><hr/></div>
            </div>

            <div className="fr-col-12 fr-col-md-6">
              <ElementHighcharts donneesStats={statsDurees} variablesGraphique={columnGraphiqueSm} print={print} type={type}/>
            </div>
          </div>
        </div>
      </div>
      <div className="fr-col-12 fr-mb-6w only-print theme-print">
        <div className="mozilla-espace-block"></div>
        <ElementHighcharts donneesStats={statsThemes} variablesGraphique={barGraphique} print={true} type={type}/>
      </div>
      <div className="fr-col-12 only-print lieux-print">
        <ElementHighcharts donneesStats={statsLieux} variablesGraphique={pieGraphique} print={true} type={type}/>
      </div>
      <div className="fr-col-12 fr-mb-6w only-print duree-print">
        <ElementHighcharts donneesStats={statsDurees} variablesGraphique={columnGraphique} print={true} type={type}/>
      </div>
    </>
  );
}

RightPage.propTypes = {
  donneesStats: PropTypes.object,
  print: PropTypes.bool,
  type: PropTypes.string,
};

export default RightPage;
