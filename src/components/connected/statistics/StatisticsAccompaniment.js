import React from 'react';
import PropTypes from 'prop-types';
import Pluralize from 'react-pluralize';

import ElementNumber from './Components/ElementNumber';
import ElementText from './Components/ElementText';

function StatisticsAccompaniment({ type, nbAccompagnement }) {

  return (
    <div className="fr-grid-row">
      <div className={ type ? 'fr-col-12' : 'fr-col-2 fr-col-lg-3' }><ElementNumber nombre={nbAccompagnement}
        classe={type ? 'numbers-' + type : 'numbers'}/></div>
      <div className={ type ? 'fr-col-12' : 'fr-col-9' }><ElementText textePluralize={
        <Pluralize
          zero={'accompagnement total enregistré (dont récurrent)'}
          singular={'accompagnement total enregistré (dont récurrent)'}
          plural={'accompagnements total enregistrés (dont récurrent)'}
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
