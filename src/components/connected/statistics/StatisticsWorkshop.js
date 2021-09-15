import React from 'react';
import PropTypes from 'prop-types';
import Pluralize from 'react-pluralize';

import ElementNumber from './Components/ElementNumber';
import ElementText from './Components/ElementText';

function StatisticsWorkshop(props) {

  const { type, nbAteliers, nbTotalParticipant } = props;

  return (
    <div className="rf-grid-row">
      <div className={ type ? 'rf-col-12' : 'rf-col-2 rf-col-lg-3' }><ElementNumber nombre={nbAteliers} classe={`numbers${type}`}/></div>
      <div className={ type ? 'rf-col-12' : 'rf-col-10 rf-col-lg-9' }><ElementText textePluralize={
        <Pluralize
          zero={'atelier réalisé, dont :'}
          singular={'atelier réalisé, dont :'}
          plural={'ateliers réalisés, dont :'}
          count={nbAteliers}
          showCount={false} />
      } classe="text"/><br/></div>
      <div className={ type ? 'rf-col-12' : 'rf-col-2 rf-col-lg-3' }><ElementNumber nombre={nbTotalParticipant} classe={`numbers${type}`}/></div>
      <div className={ type ? 'rf-col-12' : 'rf-col-10 rf-col-lg-9' }><ElementText textePluralize={
        <Pluralize
          zero={'participant au total'}
          singular={'participant au total'}
          plural={'participants au total'}
          count={nbTotalParticipant}
          showCount={false} />
      } classe={`text${type}`}/></div>
    </div>
  );
}

StatisticsWorkshop.propTypes = {
  nbAteliers: PropTypes.number,
  nbTotalParticipant: PropTypes.number,
  type: PropTypes.string,
};

export default StatisticsWorkshop;
