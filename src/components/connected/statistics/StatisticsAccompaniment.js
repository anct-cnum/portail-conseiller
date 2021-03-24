import React from 'react';
import PropTypes from 'prop-types';

import ElementNumber from './ElementNumber';
import ElementText from './ElementText';

function StatisticsAccompaniment(props) {

  return (
    <div className="rf-container">
      <div className="rf-grid-row">
        <div className="rf-col-6"><ElementNumber nombre={props.nbAccompagnement}/></div>
        <div className="rf-col-6"><ElementText texte="accompagnements réalisés durant cette période" /></div>
        <div className="rf-col-12"><hr></hr></div>
      </div>
    </div>
  );
}

StatisticsAccompaniment.propTypes = {
  nbAccompagnement: PropTypes.number
};

export default StatisticsAccompaniment;
