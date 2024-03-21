import React from 'react';
import PropTypes from 'prop-types';
import ElementNumber from './Components/ElementNumber';
import ElementText from './Components/ElementText';
import { pluralize } from '../../../utils/functionFormats';

function StatisticsAccompaniment({ type, nbAccompagnement }) {

  return (
    <>
      <div className="fr-grid-row dont-print">
        <div className={type ? 'fr-col-12' : 'fr-col-2 fr-col-lg-3'}><ElementNumber nombre={nbAccompagnement}
          classe={type ? 'numbers-' + type : 'numbers'} /></div>
        <div className={type ? 'fr-col-12' : 'fr-col-9'}><ElementText textePluralize={pluralize(
          'accompagnement total enregistré (dont récurrent)',
          'accompagnement total enregistré (dont récurrent)',
          'accompagnements totaux enregistrés (dont récurrent)',
          nbAccompagnement
        )} classe={type ? 'text-' + type : 'text'} /></div>
      </div>
      <div className="fr-grid-row fr-mb-6w only-print">
        <div className="fr-col-12">
          <span className="numbers">{nbAccompagnement}</span>
          {pluralize(
            'accompagnement total enregistré (dont récurrent)',
            'accompagnement total enregistré (dont récurrent)',
            'accompagnements totaux enregistrés (dont récurrent)',
            nbAccompagnement,
            true
          )}
        </div>

      </div>
    </>
  );
}

StatisticsAccompaniment.propTypes = {
  nbAccompagnement: PropTypes.number,
  type: PropTypes.string,
};

export default StatisticsAccompaniment;
