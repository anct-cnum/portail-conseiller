import React from 'react';
import PropTypes from 'prop-types';
import Pluralize from 'react-pluralize';

import ElementNumber from './Components/ElementNumber';
import ElementText from './Components/ElementText';

function StatisticsPersonalAccompaniment({ type, nbAccompagnementPerso, nbDemandePonctuel }) {

  return (
    <>
      <div className="fr-grid-row dont-print">
        <div className={ type ? 'fr-col-12' : 'fr-col-2 fr-col-lg-3' }><ElementNumber nombre={nbAccompagnementPerso}
          classe={type ? 'numbers-' + type : 'numbers'}/></div>
        <div className={ type ? 'fr-col-12' : 'fr-col-10 fr-col-lg-9' }><ElementText textePluralize={
          <Pluralize
            zero={'accompagnement individuel'}
            singular={'accompagnement individuel'}
            plural={'accompagnements individuels'}
            count={nbAccompagnementPerso}
            showCount={false} />
        } classe={type ? 'text-' + type : 'text'}/><br/></div>
        <div className={ type ? 'fr-col-12' : 'fr-col-2 fr-col-lg-3' }><ElementNumber nombre={nbDemandePonctuel}
          classe={type ? 'numbers-' + type : 'numbers'}/></div>
        <div className={ type ? 'fr-col-12' : 'fr-col-10 fr-col-lg-9' }><ElementText textePluralize={
          <Pluralize
            zero={'demande ponctuelle'}
            singular={'demande ponctuelle'}
            plural={'demandes ponctuelles'}
            count={nbDemandePonctuel}
            showCount={false} />
        } classe={type ? 'text-' + type : 'text'}/></div>
      </div>
      <div className="fr-grid-row only-print">
        <div className="fr-col-12 fr-mb-6w">
          <span className="numbers">{nbAccompagnementPerso}</span>
          <span className="text">
            <Pluralize
              zero={'accompagnement individuel'}
              singular={'accompagnement individuel'}
              plural={'accompagnements individuels'}
              count={nbAccompagnementPerso}
              showCount={false} />
          </span>
        </div>
        <div className="fr-col-12 fr-mb-6w">
          <span className="numbers">{nbDemandePonctuel}</span>
          <span className="text">
            <Pluralize
              zero={'demande ponctuelle'}
              singular={'demande ponctuelle'}
              plural={'demandes ponctuelles'}
              count={nbDemandePonctuel}
              showCount={false} />
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
