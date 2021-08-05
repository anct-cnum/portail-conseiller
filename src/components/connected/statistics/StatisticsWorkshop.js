import React from 'react';
import PropTypes from 'prop-types';
import Pluralize from 'react-pluralize';

import ElementNumber from './Components/ElementNumber';
import ElementText from './Components/ElementText';

function StatisticsWorkshop(props) {

  return (
    <div className="rf-grid-row">
      <div className="rf-col-2 rf-col-lg-3"><ElementNumber nombre={props.nbAteliers} classe="numbers"/></div>
      <div className="rf-col-10 rf-col-lg-9"><ElementText texte={
        <Pluralize
          zero={'atelier réalisé, dont :'}
          singular={'atelier réalisé, dont :'}
          plural={'ateliers réalisés, dont :'}
          count={props.nbAteliers}
          showCount={false} />
      } classe="text"/><br/></div>
      <div className="rf-col-2 rf-col-lg-3"><ElementNumber nombre={props.nbTotalParticipant} classe="numbers"/></div>
      <div className="rf-col-10 rf-col-lg-9"><ElementText texte={
        <Pluralize
          zero={'participant au total'}
          singular={'participant au total'}
          plural={'participants au total'}
          count={props.nbTotalParticipant}
          showCount={false} />
      } classe="text"/></div>
    </div>
  );
}

StatisticsWorkshop.propTypes = {
  nbAteliers: PropTypes.number,
  nbTotalParticipant: PropTypes.number
};

export default StatisticsWorkshop;
