import React from 'react';
import PropTypes from 'prop-types';
import ElementNumber from './Components/ElementNumber';
import ElementText from './Components/ElementText';
import { pluralize } from '../../../utils/functionFormats';

function StatisticsTotalAccompaniments({ type, nbTotalAccompagnements }) {

  return (
    <>
      <div className="fr-grid-row dont-print">
        <div className={ type ? 'fr-col-12' : 'fr-col-2 fr-col-lg-3' }>
          <ElementNumber nombre={nbTotalAccompagnements} classe={type ? 'number-' + type : 'number'}/>
        </div>
        <div className={ type ? 'fr-col-12' : 'fr-col-9' }>
          <ElementText textePluralize={pluralize(
            'nouvel usager accompagné durant cette période',
            'nouvel usager accompagné durant cette période',
            'nouveaux usagers accompagnés durant cette période',
            nbTotalAccompagnements
          )} classe={type ? 'text-' + type : 'text'}/>
        </div>
      </div>
      <div className="fr-grid-row only-print">
        <div className="fr-col-12">
          <span className="numbers">{nbTotalAccompagnements}</span>
          <span className="text">
            {pluralize(
              'nouvel usager accompagné durant cette période',
              'nouvel usager accompagné durant cette période',
              'nouveaux usagers accompagnés durant cette période',
              nbTotalAccompagnements
            )}
          </span>
        </div>
      </div>
    </>
  );
}

StatisticsTotalAccompaniments.propTypes = {
  nbTotalAccompagnements: PropTypes.number,
  type: PropTypes.string,
};

export default StatisticsTotalAccompaniments;
