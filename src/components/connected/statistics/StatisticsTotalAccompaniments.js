import React from 'react';
import PropTypes from 'prop-types';
import Pluralize from 'react-pluralize';

import ElementNumber from './Components/ElementNumber';
import ElementText from './Components/ElementText';

function StatisticsTotalAccompaniments({ type, nbTotalAccompagnements }) {

  return (
    <div className="rf-grid-row">
      <div className={ type ? 'rf-col-12' : 'rf-col-2 rf-col-lg-3' }>
        <ElementNumber nombre={nbTotalAccompagnements} classe={type ? 'number-' + type : 'number'}/>
      </div>
      <div className={ type ? 'rf-col-12' : 'rf-col-9' }>
        <ElementText textePluralize={
          <Pluralize
            zero={'personne accompagnée durant cette période'}
            singular={'personne accompagnée durant cette période'}
            plural={'personnes accompagnées durant cette période'}
            count={nbTotalAccompagnements}
            showCount={false} />
        } classe={type ? 'text-' + type : 'text'}/>
      </div>
    </div>
  );
}

StatisticsTotalAccompaniments.propTypes = {
  nbTotalAccompagnements: PropTypes.number,
  type: PropTypes.string,
};

export default StatisticsTotalAccompaniments;
