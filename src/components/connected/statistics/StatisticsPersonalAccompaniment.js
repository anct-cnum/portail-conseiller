import React from 'react';
import PropTypes from 'prop-types';
import Pluralize from 'react-pluralize';

import ElementNumber from './Components/ElementNumber';
import ElementText from './Components/ElementText';

function StatisticsPersonalAccompaniment(props) {

  return (
    <div className="rf-grid-row">
      <div className="rf-col-2 rf-col-lg-3"><ElementNumber nombre={props.nbAccompagnementPerso} classe="numbers"/></div>
      <div className="rf-col-10 rf-col-lg-9"><ElementText textePluralize={
        <Pluralize
          zero={'accompagnement individuel'}
          singular={'accompagnement individuel'}
          plural={'accompagnements individuels'}
          count={props.nbAccompagnementPerso}
          showCount={false} />
      } classe="text"/><br/></div>
      <div className="rf-col-2 rf-col-lg-3"><ElementNumber nombre={props.nbDemandePonctuel} classe="numbers"/></div>
      <div className="rf-col-10 rf-col-lg-9"><ElementText textePluralize={
        <Pluralize
          zero={'demande ponctuelle'}
          singular={'demande ponctuelle'}
          plural={'demandes ponctuelles'}
          count={props.nbDemandePonctuel}
          showCount={false} />
      } classe="text"/></div>
    </div>
  );
}

StatisticsPersonalAccompaniment.propTypes = {
  nbAccompagnementPerso: PropTypes.number,
  nbDemandePonctuel: PropTypes.number
};

export default StatisticsPersonalAccompaniment;
