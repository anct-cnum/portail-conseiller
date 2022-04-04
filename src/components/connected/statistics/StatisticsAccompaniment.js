import React from 'react';
import PropTypes from 'prop-types';
import Pluralize from 'react-pluralize';

import ElementNumber from './Components/ElementNumber';
import ElementText from './Components/ElementText';

function StatisticsAccompaniment({ type, nbAccompagnement }) {

  return (
    <div className="rf-grid-row">
      <div className={ type ? 'rf-col-12' : 'rf-col-2 rf-col-lg-3' }><ElementNumber nombre={nbAccompagnement}
        classe={type ? 'numbers-' + type : 'numbers'}/></div>
      <div className={ type ? 'rf-col-12' : 'rf-col-9' }><ElementText textePluralize={
        <Pluralize
          zero={'accompagnement total enregistré (dont récurent)'}
          singular={'accompagnement total enregistré (dont récurent)'}
          plural={'accompagnements total enregistrés (dont récurent)'}
          count={nbAccompagnement}
          showCount={false} />
      } classe={type ? 'text-' + type : 'text'}/></div>
    </div>
  );
}

StatisticsAccompaniment.propTypes = {
  nbAccompagnement: PropTypes.number,
  type: PropTypes.string,
};

export default StatisticsAccompaniment;
