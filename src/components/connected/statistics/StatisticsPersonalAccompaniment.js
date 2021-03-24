import React from 'react';
import PropTypes from 'prop-types';

import ElementNumber from './ElementNumber';
import ElementText from './ElementText';

function StatisticsPersonalAccompaniment(props) {

  return (
    <div className="rf-container">
      <div className="rf-grid-row">
        <div className="rf-col-6"><ElementNumber nombre={props.nbAccompagnementPerso}/></div>
        <div className="rf-col-6"><ElementText texte="accompagnements personnalisés réalisés"/></div>
        <div className="rf-col-6"><ElementNumber nombre={props.nbDemandePonctuel}/></div>
        <div className="rf-col-6"><ElementText texte="demandes ponctuelles"/></div>
        <div className="rf-col-12"><hr></hr></div>
      </div>
    </div>
  );
}

StatisticsPersonalAccompaniment.propTypes = {
  nbAccompagnementPerso: PropTypes.number,
  nbDemandePonctuel: PropTypes.number
};

export default StatisticsPersonalAccompaniment;
