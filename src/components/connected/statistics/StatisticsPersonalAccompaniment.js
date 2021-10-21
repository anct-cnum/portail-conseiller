import React from 'react';
import PropTypes from 'prop-types';
import Pluralize from 'react-pluralize';

import ElementNumber from './Components/ElementNumber';
import ElementText from './Components/ElementText';

function StatisticsPersonalAccompaniment({ type, nbAccompagnementPerso, nbDemandePonctuel }) {

  return (
    <div className="rf-grid-row">
      <div className={ type ? 'rf-col-12' : 'rf-col-2 rf-col-lg-3' }><ElementNumber nombre={nbAccompagnementPerso}
        classe={type ? 'numbers-' + type : 'numbers'}/></div>
      <div className={ type ? 'rf-col-12' : 'rf-col-10 rf-col-lg-9' }><ElementText textePluralize={
        <Pluralize
          zero={'accompagnement individuel'}
          singular={'accompagnement individuel'}
          plural={'accompagnements individuels'}
          count={nbAccompagnementPerso}
          showCount={false} />
      } classe={type ? 'text-' + type : 'text'}/><br/></div>
      <div className={ type ? 'rf-col-12' : 'rf-col-2 rf-col-lg-3' }><ElementNumber nombre={nbDemandePonctuel}
        classe={type ? 'numbers-' + type : 'numbers'}/></div>
      <div className={ type ? 'rf-col-12' : 'rf-col-10 rf-col-lg-9' }><ElementText textePluralize={
        <Pluralize
          zero={'demande ponctuelle'}
          singular={'demande ponctuelle'}
          plural={'demandes ponctuelles'}
          count={nbDemandePonctuel}
          showCount={false} />
      } classe={type ? 'text-' + type : 'text'}/></div>
    </div>
  );
}

StatisticsPersonalAccompaniment.propTypes = {
  nbAccompagnementPerso: PropTypes.number,
  nbDemandePonctuel: PropTypes.number,
  type: PropTypes.string
};

export default StatisticsPersonalAccompaniment;
