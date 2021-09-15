import React from 'react';
import PropTypes from 'prop-types';
import Pluralize from 'react-pluralize';

import ElementNumber from './Components/ElementNumber';
import ElementText from './Components/ElementText';

function StatisticsAccompaniment(props) {

  const { type, nbAccompagnement } = props;

  return (
    <div className="rf-grid-row">
      <div className={ type ? 'rf-col-12' : 'rf-col-2 rf-col-lg-3' }><ElementNumber nombre={nbAccompagnement} classe={`numbers${type}`}/></div>
      <div className={ type ? 'rf-col-12' : 'rf-col-9' }><ElementText textePluralize={
        <Pluralize
          zero={'accompagnement enregistré'}
          singular={'accompagnement enregistré'}
          plural={'accompagnements enregistrés'}
          count={nbAccompagnement}
          showCount={false} />
      } classe={`text${type}`}/></div>
    </div>
  );
}

StatisticsAccompaniment.propTypes = {
  nbAccompagnement: PropTypes.number,
  type: PropTypes.string,
};

export default StatisticsAccompaniment;
