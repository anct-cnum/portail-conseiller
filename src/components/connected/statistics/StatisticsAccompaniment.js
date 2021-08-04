import React from 'react';
import PropTypes from 'prop-types';
import Pluralize from 'react-pluralize';

import ElementNumber from './Components/ElementNumber';
import ElementText from './Components/ElementText';

function StatisticsAccompaniment(props) {

  return (
    <div className="rf-grid-row">
      <div className="rf-col-2 rf-col-lg-3"><ElementNumber nombre={props.nbAccompagnement} classe="numbers"/></div>
      <div className="rf-col-9"><ElementText texte={
        <Pluralize
          zero={'accompagnement enregistré'}
          singular={'accompagnement enregistré'}
          plural={'accompagnements enregistrés'}
          count={props.nbAccompagnement}
          showCount={false} />
      } classe="text"/></div>
    </div>
  );
}

StatisticsAccompaniment.propTypes = {
  nbAccompagnement: PropTypes.number
};

export default StatisticsAccompaniment;
