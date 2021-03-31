import React from 'react';
import PropTypes from 'prop-types';

import ElementNumber from './ElementNumber';
import ElementText from './ElementText';

function StatisticsRenewal(props) {

  return (
    <div className="rf-container">
      <div className="rf-grid-row">
        <div className="rf-col-5">
          <ElementNumber nombre={props.nbReconduction} classe="numbers"/>
        </div>
        <div className="rf-col-7">
          <ElementText texte="accompagnements reconduits"/><br/>
        </div>
        <div className="rf-col-5">
          <ElementNumber nombre={props.tauxReconduction} caracteresSpeciaux={props.caracteresSpeciaux} classe="numbers"/>
        </div>
        <div className="rf-col-7">
          <ElementText texte="taux moyen de reconduction sur l’ensemble des accompagnements"/>
        </div>
      </div>
      <div className="rf-col-12">
        <div className="rf-m-6w"></div>
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
