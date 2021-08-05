import React from 'react';
import PropTypes from 'prop-types';
import Pluralize from 'react-pluralize';

import ElementNumber from './Components/ElementNumber';
import ElementText from './Components/ElementText';

function StatisticsTotalAccompaniments(props) {

  return (
    <div className="rf-grid-row">
      <div className="rf-col-2 rf-col-lg-3"><ElementNumber nombre={props.nbTotalAccompagnements} classe="number"/></div>
      <div className="rf-col-9"><ElementText texte={
        <Pluralize
          zero={'personne accompagnée durant cette période'}
          singular={'personne accompagnée durant cette période'}
          plural={'personnes accompagnées durant cette période'}
          count={props.nbTotalAccompagnements}
          showCount={false} />
      } classe="text"/></div>
    </div>
  );
}

StatisticsTotalAccompaniments.propTypes = {
  nbTotalAccompagnements: PropTypes.number
};

export default StatisticsTotalAccompaniments;
