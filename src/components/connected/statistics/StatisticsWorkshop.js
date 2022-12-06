import React from 'react';
import PropTypes from 'prop-types';
import Pluralize from 'react-pluralize';

import ElementNumber from './Components/ElementNumber';
import ElementText from './Components/ElementText';

function StatisticsWorkshop({ type, nbAteliers, nbTotalParticipant }) {

  return (
    <>
      <div className="fr-grid-row dont-print">
        <div className={ type ? 'fr-col-12' : 'fr-col-2 fr-col-lg-3' }><ElementNumber nombre={nbAteliers}
          classe={type ? 'numbers-' + type : 'numbers'}/></div>
        <div className={ type ? 'fr-col-12' : 'fr-col-10 fr-col-lg-9' }><ElementText textePluralize={
          <Pluralize
            zero={'atelier réalisé, dont :'}
            singular={'atelier réalisé, dont :'}
            plural={'ateliers réalisés, dont :'}
            count={nbAteliers}
            showCount={false} />
        } classe="text"/><br/></div>
        <div className={ type ? 'fr-col-12' : 'fr-col-2 fr-col-lg-3' }><ElementNumber nombre={nbTotalParticipant}
          classe={type ? 'numbers-' + type : 'numbers'}/></div>
        <div className={ type ? 'fr-col-12' : 'fr-col-10 fr-col-lg-9' }><ElementText textePluralize={
          <Pluralize
            zero={'participant au total'}
            singular={'participant au total'}
            plural={'participants au total'}
            count={nbTotalParticipant}
            showCount={false} />
        } classe={type ? 'text-' + type : 'text'}/></div>
      </div>
      <div className="fr-grid-row only-print">
        <div className="fr-col-12 fr-mb-9w">
          <span className="numbers">{nbAteliers}</span>
          <span className="text">
            <Pluralize
              zero={'atelier réalisé, dont :'}
              singular={'atelier réalisé, dont :'}
              plural={'ateliers réalisés, dont :'}
              count={nbAteliers}
              showCount={false} />
          </span>
        </div>
        <div className="fr-col-12 fr-mb-9w">
          <span className="numbers">{nbTotalParticipant}</span>
          <span className="text">
            <Pluralize
              zero={'participant au total'}
              singular={'participant au total'}
              plural={'participants au total'}
              count={nbTotalParticipant}
              showCount={false} />
          </span>
        </div>
      </div>
    </>
  );
}

StatisticsWorkshop.propTypes = {
  nbAteliers: PropTypes.number,
  nbTotalParticipant: PropTypes.number,
  type: PropTypes.string,
};

export default StatisticsWorkshop;
