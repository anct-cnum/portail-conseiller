import React from 'react';
import PropTypes from 'prop-types';

import ElementNumber from './Components/ElementNumber';
import ElementText from './Components/ElementText';

function StatisticsAccompaniment(props) {

  return (
    <div className="rf-grid-row">
      <div className="rf-col-2 rf-col-lg-3"><ElementNumber nombre={props.nbAccompagnement} classe="number"/></div>
      <div className="rf-col-9"><ElementText texte="accompagnements réalisés durant cette période" classe="text"/></div>
    </div>
  );
}

StatisticsAccompaniment.propTypes = {
  nbAccompagnement: PropTypes.number
};

export default StatisticsAccompaniment;
