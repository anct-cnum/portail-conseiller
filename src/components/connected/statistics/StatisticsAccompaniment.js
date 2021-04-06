import React from 'react';
import PropTypes from 'prop-types';

import ElementNumber from './ElementNumber';
import ElementText from './ElementText';

function StatisticsAccompaniment(props) {

  return (
    <div className="rf-grid-row">
      <div className="rf-col-2 rf-col-lg-3"><ElementNumber nombre={props.nbAccompagnement} classe="number"/></div>
      <div className="rf-col-9"><ElementText texte="accompagnements réalisés durant cette période" /></div>
    </div>
  );
}

StatisticsAccompaniment.propTypes = {
  nbAccompagnement: PropTypes.number
};

export default StatisticsAccompaniment;
