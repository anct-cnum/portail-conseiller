import React from 'react';
import PropTypes from 'prop-types';

import ElementHighcharts from './Components/ElementHighcharts';

function BottomPage(props) {

  const tabColorAge = ['#ff007a', '#6945bd', '#c6c9ae', '#ff5e3b', '#00ba8e'];
  const tabColorStatut = ['#a2b4b1', '#ffdbd2', '#a3a6bc', '#ddb094', '#fff480'];

  const periodeTest = props.donneesStats.periodes[0];
  const { statsEvolutions, statsUsagers, statsAges } = periodeTest;

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
      optionTitre: 'Évolution des accompagnements',
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
      optionTitre: 'Évolution des accompagnements',
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

        <div className="rf-col-12 rf-col-md-5 rf-col-lg-3">
          <div className="rf-mt-6w rf-mb-5w rf-m-xs-to-md-7v"><hr/></div>
          <span className="graphique-responsive-md-lg">
            <ElementHighcharts donneesStats={statsEvolutions} variablesGraphique={graphiqueEvolution} />
          </span>
          <span className="graphique-responsive-sm">
            <ElementHighcharts donneesStats={statsEvolutions} variablesGraphique={graphiqueEvolutionSM} />
          </span>
        </div>

        <div className="rf-col-offset-12 rf-col-offset-md-1"></div>

        <div className="rf-col-12 rf-col-md-5 rf-col-lg-3">
          <div className="rf-mt-6w rf-mb-5w rf-m-xs-to-md-7v"><hr/></div>
          <ElementHighcharts donneesStats={statsAges} variablesGraphique={graphiqueAge} />
        </div>

        <div className="rf-col-offset-12 rf-col-offset-md-6 rf-col-offset-lg-1"></div>

        <div className="rf-col-12 rf-col-md-5 rf-col-lg-3">
          <div className="rf-mt-6w rf-mb-5w rf-m-xs-to-md-7v"><hr/></div>
          <ElementHighcharts donneesStats={statsUsagers} variablesGraphique={graphiqueStatut} />
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
};
export default BottomPage;
