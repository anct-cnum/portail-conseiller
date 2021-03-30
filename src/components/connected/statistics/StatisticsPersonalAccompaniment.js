import React from 'react';
import PropTypes from 'prop-types';

import ElementNumber from './ElementNumber';
import ElementText from './ElementText';

function StatisticsPersonalAccompaniment(props) {

  return (
    <div className="rf-container">
      <div className="rf-grid-row">
        <div className="rf-col-6"><ElementNumber nombre={props.nbAccompagnementPerso} classe="numbers"/></div>
        <div className="rf-col-6"><ElementText texte="accompagnements personnalisés réalisés"/></div>
        <div className="rf-col-6"><ElementNumber nombre={props.nbDemandePonctuel} classe="numbers"/></div>
        <div className="rf-col-6"><ElementText texte="demandes ponctuelles"/></div>
        <div className="rf-col-12">
          <div className="rf-m-6w"></div>
          <hr></hr>
          <div className="rf-m-6w"></div>
        </div>
      </div>
    </div>
  );
}

StatisticsPersonalAccompaniment.propTypes = {
  nbAccompagnementPerso: PropTypes.number,
  nbDemandePonctuel: PropTypes.number
};

export default StatisticsPersonalAccompaniment;
