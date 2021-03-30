import React from 'react';
import PropTypes from 'prop-types';

import ElementNumber from './ElementNumber';
import ElementText from './ElementText';

function StatisticsWorkshop(props) {

  return (
    <div className="rf-container">
      <div className="rf-grid-row">
        <div className="rf-col-6"><ElementNumber nombre={props.nbAteliers} classe="numbers"/></div>
        <div className="rf-col-6"><ElementText texte="ateliers réalisés"/></div>
        <div className="rf-col-6"><ElementNumber nombre={props.nbTotalParticipant} classe="numbers"/></div>
        <div className="rf-col-6"><ElementText texte="participants au total"/></div>
        <div className="rf-col-12">
          <div className="rf-m-6w"></div>
          <hr></hr>
          <div className="rf-m-6w"></div>
        </div>
      </div>
    </div>
  );
}

StatisticsWorkshop.propTypes = {
  nbAteliers: PropTypes.number,
  nbTotalParticipant: PropTypes.number
};

export default StatisticsWorkshop;
