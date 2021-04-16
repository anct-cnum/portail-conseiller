import React from 'react';
import PropTypes from 'prop-types';

import ElementHighcharts from './Components/ElementHighcharts';

function RightPage(props) {

  const tabColorTheme = ['#cac5b0', '#abb8df', '#fdcf41', '#169b62', '#80d5c6', '#ff8d7e', '#714753', '#956052', '#ddb094', '#5770be', '#ffed33', '#be9b31'];
  const tabColorLieux = ['#ffcc9f', '#ff8d7e', '#466964', '#5770be'];
  const tabColorDuree = ['#abcdf5', '#abcdf5', '#abcdf5', '#abcdf5'];

  const periodeTest = props.donneesStats.periodes[0];
  const { statsThemes, statsDurees, statsLieux } = periodeTest;

  const barGraphique = {
    graphique: {
      typeGraphique: 'bar',
      largeurGraphique: null,
      hauteurGraphique: 282,
      margeGaucheGraphique: 235,
      margeDroiteGraphique: 0,
      optionResponsive: false,
      couleursGraphique: tabColorTheme
    },
    titre: {
      optionTitre: 'Thèmes des accompagnements',
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
      optionTitre: 'Thèmes des accompagnements',
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
      optionTitre: 'Durée des accompagnements',
      margeTitre: 48,
      placementTitre: 0
    }
  };

  return (
    <>
      <div className="rf-col-12 rf-col-md-5 rf-col-lg-7 graphique-responsive-lg">
        <div className="rf-container-fluid">
          <div className="rf-grid-row ">
            <div className="rf-col-12">
              <ElementHighcharts donneesStats={statsThemes} variablesGraphique={barGraphique} />
            </div>

            <div className="rf-col-12">
              <div className="rf-my-6w rf-m-xs-to-md-7v"><hr/></div>
            </div>

            <div className="rf-col-12 rf-col-lg-6">
              <ElementHighcharts donneesStats={statsLieux} variablesGraphique={pieGraphique} />
            </div>

            <div className="rf-col-12 rf-col-lg-6">
              <div className="rf-ml-md-6w">
                <ElementHighcharts donneesStats={statsDurees} variablesGraphique={columnGraphique} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rf-col-12 rf-col-md-5 graphique-responsive-md">

        <div className="rf-container-fluid">
          <div className="rf-grid-row ">
            <div className="rf-col-12">
              <ElementHighcharts donneesStats={statsThemes} variablesGraphique={barGraphiqueSm} />
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
              <ElementHighcharts donneesStats={statsLieux} variablesGraphique={pieGraphiqueSm} />
            </div>

            <div className="rf-col-12 hr-md-hide">
              <div className="rf-m-6w rf-m-xs-to-md-7v"><hr/></div>
            </div>

            <div className="rf-col-12 rf-col-md-6">
              <ElementHighcharts donneesStats={statsDurees} variablesGraphique={columnGraphique} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

RightPage.propTypes = {
  donneesStats: PropTypes.object,
};

export default RightPage;
