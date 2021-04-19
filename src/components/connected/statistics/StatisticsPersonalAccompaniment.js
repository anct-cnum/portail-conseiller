import React from 'react';
import PropTypes from 'prop-types';

import ElementNumber from './Components/ElementNumber';
import ElementText from './Components/ElementText';

function StatisticsPersonalAccompaniment(props) {

  return (
    <div className="rf-grid-row">
      <div className="rf-col-2 rf-col-lg-3"><ElementNumber nombre={props.nbAccompagnementPerso} classe="numbers"/></div>
      <div className="rf-col-10 rf-col-lg-9"><ElementText texte="accompagnements personnalisés réalisés" classe="text"/><br/></div>
      <div className="rf-col-2 rf-col-lg-3"><ElementNumber nombre={props.nbDemandePonctuel} classe="numbers"/></div>
      <div className="rf-col-10 rf-col-lg-9"><ElementText texte="demandes ponctuelles" classe="text"/></div>
    </div>
  );
}

StatisticsPersonalAccompaniment.propTypes = {
  nbAccompagnementPerso: PropTypes.number,
  nbDemandePonctuel: PropTypes.number
};

export default StatisticsPersonalAccompaniment;
