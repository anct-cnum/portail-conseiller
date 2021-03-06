import React from 'react';
import PropTypes from 'prop-types';

import ElementNumber from './Components/ElementNumber';
import ElementText from './Components/ElementText';

function StatisticsWorkshop(props) {

  return (
    <div className="rf-grid-row">
      <div className="rf-col-2 rf-col-lg-3"><ElementNumber nombre={props.nbAteliers} classe="numbers"/></div>
      <div className="rf-col-10 rf-col-lg-9"><ElementText texte="ateliers réalisés" classe="text"/><br/></div>
      <div className="rf-col-2 rf-col-lg-3"><ElementNumber nombre={props.nbTotalParticipant} classe="numbers"/></div>
      <div className="rf-col-10 rf-col-lg-9"><ElementText texte="participants au total" classe="text"/></div>
    </div>
  );
}

StatisticsWorkshop.propTypes = {
  nbAteliers: PropTypes.number,
  nbTotalParticipant: PropTypes.number
};

export default StatisticsWorkshop;
