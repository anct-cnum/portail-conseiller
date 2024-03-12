import React from 'react';
import PropTypes from 'prop-types';
import ElementNumber from './Components/ElementNumber';
import ElementText from './Components/ElementText';
import { pluralize } from '../../../utils/functionFormats';

function StatisticsWorkshop({ type, nbAteliers, nbTotalParticipant }) {

  return (
    <>
      <div className="fr-grid-row dont-print">
        <div className={ type ? 'fr-col-12' : 'fr-col-2 fr-col-lg-3' }><ElementNumber nombre={nbAteliers}
          classe={type ? 'numbers-' + type : 'numbers'}/></div>
        <div className={ type ? 'fr-col-12' : 'fr-col-10 fr-col-lg-9' }><ElementText textePluralize={
          pluralize(
            'atelier réalisé, dont :',
            'atelier réalisé, dont :',
            'ateliers réalisés, dont :',
            nbAteliers
          )} classe="text"/><br/></div>
        <div className={ type ? 'fr-col-12' : 'fr-col-2 fr-col-lg-3' }><ElementNumber nombre={nbTotalParticipant}
          classe={type ? 'numbers-' + type : 'numbers'}/></div>
        <div className={ type ? 'fr-col-12' : 'fr-col-10 fr-col-lg-9' }><ElementText textePluralize={
          pluralize(
            'participant au total',
            'participant au total',
            'participants au total',
            nbTotalParticipant
          )} classe={type ? 'text-' + type : 'text'}/></div>
      </div>
      <div className="fr-grid-row only-print">
        <div className="fr-col-12 fr-mb-9w">
          <span className="numbers">{nbAteliers}</span>
          <span className="text">
            {pluralize(
              'atelier réalisé, dont :',
              'atelier réalisé, dont :',
              'ateliers réalisés, dont :',
              nbAteliers
            )}
          </span>
        </div>
        <div className="fr-col-12 fr-mb-9w">
          <span className="numbers">{nbTotalParticipant}</span>
          <span className="text">
            {pluralize(
              'participant au total',
              'participant au total',
              'participants au total',
              nbTotalParticipant
            )}
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
