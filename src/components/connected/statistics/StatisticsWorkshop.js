import React from 'react';
import PropTypes from 'prop-types';

import ElementNumber from './ElementNumber';
import ElementText from './ElementText';

function StatisticsWorkshop(props) {

  return (
    <div className="rf-container">
      <div className="rf-grid-row">
        <div className="rf-col-5"><ElementNumber nombre={props.nbAteliers} classe="numbers"/></div>
        <div className="rf-col-7"><ElementText texte="ateliers réalisés"/><br/></div>
        <div className="rf-col-5"><ElementNumber nombre={props.nbTotalParticipant} classe="numbers"/></div>
        <div className="rf-col-7"><ElementText texte="participants au total"/></div>
      </div>
    </div>
  );
}

StatisticsWorkshop.propTypes = {
  nbAteliers: PropTypes.number,
  nbTotalParticipant: PropTypes.number
};

export default StatisticsWorkshop;
