import React from 'react';
import PropTypes from 'prop-types';

import ElementNumber from './Components/ElementNumber';
import ElementText from './Components/ElementText';
import { pluralize } from '../../../utils/functionFormats';

function StatisticsPersonalAccompaniment({ type, nbAccompagnementPerso, nbDemandePonctuel }) {

  return (
    <>
      <div className="fr-grid-row dont-print">
        <div className={ type ? 'fr-col-12' : 'fr-col-2 fr-col-lg-3' }><ElementNumber nombre={nbAccompagnementPerso}
          classe={type ? 'numbers-' + type : 'numbers'}/></div>
        <div className={ type ? 'fr-col-12' : 'fr-col-10 fr-col-lg-9' }><ElementText textePluralize={pluralize(
          'accompagnement individuel',
          'accompagnement individuel',
          'accompagnements individuels',
          nbAccompagnementPerso
        )} classe={type ? 'text-' + type : 'text'}/><br/></div>
        <div className={ type ? 'fr-col-12' : 'fr-col-2 fr-col-lg-3' }><ElementNumber nombre={nbDemandePonctuel}
          classe={type ? 'numbers-' + type : 'numbers'}/></div>
        <div className={ type ? 'fr-col-12' : 'fr-col-10 fr-col-lg-9' }><ElementText textePluralize={pluralize(
          'demande ponctuelle',
          'demande ponctuelle',
          'demandes ponctuelles',
          nbDemandePonctuel
        )} classe={type ? 'text-' + type : 'text'}/></div>
      </div>
      <div className="fr-grid-row only-print">
        <div className="fr-col-12 fr-mb-6w">
          <span className="numbers">{nbAccompagnementPerso}</span>
          <span className="text">
            {pluralize(
              'accompagnement individuel',
              'accompagnement individuel',
              'accompagnements individuels',
              nbAccompagnementPerso,
              true
            )}
          </span>
        </div>
        <div className="fr-col-12 fr-mb-6w">
          <span className="numbers">{nbDemandePonctuel}</span>
          <span className="text">
            {pluralize(
              'demande ponctuelle',
              'demande ponctuelle',
              'demandes ponctuelles',
              nbDemandePonctuel
            )}
          </span>
        </div>
        <div className="fr-col-12 fr-my-6w"><span className="hr"></span></div>
      </div>
    </>
  );
}

StatisticsPersonalAccompaniment.propTypes = {
  nbAccompagnementPerso: PropTypes.number,
  nbDemandePonctuel: PropTypes.number,
  type: PropTypes.string
};

export default StatisticsPersonalAccompaniment;
