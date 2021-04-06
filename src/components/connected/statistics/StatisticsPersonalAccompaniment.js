import React from 'react';
import PropTypes from 'prop-types';

import ElementNumber from './ElementNumber';
import ElementText from './ElementText';

function StatisticsPersonalAccompaniment(props) {

  return (
    <div className="rf-container-fluid">
      <div className="rf-grid-row">
        <div className="rf-col-2 rf-col-lg-4"><ElementNumber nombre={props.nbAccompagnementPerso} classe="numbers"/></div>
        <div className="rf-col-10 rf-col-lg-8"><ElementText texte="accompagnements personnalisés réalisés"/><br/></div>
        <div className="rf-col-2 rf-col-lg-4"><ElementNumber nombre={props.nbDemandePonctuel} classe="numbers"/></div>
        <div className="rf-col-10 rf-col-lg-8"><ElementText texte="demandes ponctuelles"/></div>
      </div>
    </div>
  );
}

StatisticsPersonalAccompaniment.propTypes = {
  nbAccompagnementPerso: PropTypes.number,
  nbDemandePonctuel: PropTypes.number
};

export default StatisticsPersonalAccompaniment;
