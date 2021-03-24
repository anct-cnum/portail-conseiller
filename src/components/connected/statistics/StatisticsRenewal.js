import React from 'react';
import PropTypes from 'prop-types';

import ElementNumber from './ElementNumber';
import ElementText from './ElementText';

function StatisticsRenewal(props) {

  return (
    <div className="rf-container">
      <div className="rf-grid-row">
        <div className="rf-col-6"><ElementNumber nombre={props.nbReconduction}/></div>
        <div className="rf-col-6"> <ElementText texte="accompagnements reconduits"/></div>
        <div className="rf-col-6"><ElementNumber nombre={props.tauxReconduction} caracteresSpeciaux={props.caracteresSpeciaux}/></div>
        <div className="rf-col-6"><ElementText texte="taux moyen de reconduction sur l’ensemble des accompagnements"/></div>
      </div>
    </div>
  );
}

StatisticsRenewal.propTypes = {
  nbReconduction: PropTypes.number,
  tauxReconduction: PropTypes.number,
  caracteresSpeciaux: PropTypes.string
};


export default StatisticsRenewal;
