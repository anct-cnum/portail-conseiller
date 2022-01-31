import React from 'react';
import PropTypes from 'prop-types';

import ElementHighcharts from './Components/ElementHighcharts';

function RightPage({ donneesStats, print }) {

  const tabColorTheme = ['#cac5b0', '#abb8df', '#fdcf41', '#169b62', '#80d5c6', '#ff8d7e', '#714753', '#956052', '#ddb094', '#5770be', '#ffed33', '#be9b31'];
  const tabColorLieux = ['#ffcc9f', '#ff8d7e', '#466964', '#5770be'];
  const tabColorDuree = ['#abcdf5', '#abcdf5', '#abcdf5', '#abcdf5'];

  const { statsThemes, statsDurees, statsLieux } = donneesStats;

  const barGraphique = {
    graphique: {
      typeGraphique: 'bar',
      largeurGraphique: null,
      hauteurGraphique: 428,
      margeGaucheGraphique: 235,
      margeDroiteGraphique: 0,
      optionResponsive: false,
      couleursGraphique: tabColorTheme
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
      couleursGraphique: tabColorLieux
    },
    titre: {
      optionTitre: 'Lieux des accompagnements',
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
      optionTitre: 'Lieux des accompagnements',
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
      couleursGraphique: tabColorDuree
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
      <div className="rf-col-12 rf-col-md-5 rf-col-lg-7 graphique-responsive-lg">
        <div className="rf-container-fluid">
          <div className="rf-grid-row ">
            <div className="rf-col-12 theme-print">
              <ElementHighcharts donneesStats={statsThemes} variablesGraphique={barGraphique} print={print}/>
            </div>

            <div className="rf-col-12 no-print">
              <div className="rf-my-6w rf-m-xs-to-md-7v"><hr/></div>
            </div>

            <div className="rf-col-12 rf-col-lg-6 no-print">
              <ElementHighcharts donneesStats={statsLieux} variablesGraphique={pieGraphique} print={print}/>
            </div>

            <div className="rf-col-12 rf-col-lg-6 no-print">
              <div className="rf-ml-md-6w">
                <ElementHighcharts donneesStats={statsDurees} variablesGraphique={columnGraphique} print={print}/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rf-col-12 rf-col-md-5 graphique-responsive-md no-print">

        <div className="rf-container-fluid">
          <div className="rf-grid-row ">
            <div className="rf-col-12">
              <ElementHighcharts donneesStats={statsThemes} variablesGraphique={barGraphiqueSm} print={print}/>
            </div>
          </div>
        </div>
      </div>

      <div className="rf-col-12 graphique-responsive-md">
        <div className="rf-container-fluid">
          <div className="rf-grid-row ">

            <div className="rf-col-12 rf-col-md-5 hr-sm-hide">
              <div className="rf-m-6w rf-m-xs-to-md-7v"><hr/></div>
            </div>

            <div className="rf-col-offset-md-1"></div>

            <div className="rf-col-12 rf-col-md-5">
              <div className="rf-m-xs-to-md-7v"><hr/></div>
            </div>

            <div className="rf-col-12 rf-col-md-6">
              <ElementHighcharts donneesStats={statsLieux} variablesGraphique={pieGraphiqueSm} print={print}/>
            </div>

            <div className="rf-col-12 hr-md-hide">
              <div className="rf-m-6w rf-m-xs-to-md-7v"><hr/></div>
            </div>

            <div className="rf-col-12 rf-col-md-6">
              <ElementHighcharts donneesStats={statsDurees} variablesGraphique={columnGraphiqueSm} print={print}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

RightPage.propTypes = {
  donneesStats: PropTypes.object,
  print: PropTypes.bool
};

export default RightPage;
