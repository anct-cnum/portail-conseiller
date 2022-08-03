import React from 'react';
import PropTypes from 'prop-types';
import Pluralize from 'react-pluralize';

import ElementNumber from './Components/ElementNumber';
import ElementText from './Components/ElementText';

function StatisticsRenewal(props) {

  return (
    <div className="rf-grid-row">
      <div className="rf-col-12 rf-col-md-2 rf-col-lg-3">
        <ElementNumber nombre={props.nbUsagersBeneficiantSuivi} classe="numbers-renewal"/>
      </div>
      <div className="rf-col-12 rf-col-md-10 rf-col-lg-9">
        <ElementText textePluralize={
          <Pluralize
            zero={'Accompagnment avec suivi, soit :'}
            singular={'Accompagnment avec suivi, soit :'}
            plural={'Accompagnments avec suivi, soit :'}
            count={props.nbUsagersBeneficiantSuivi}
            showCount={false} />
        } classe="text"/><br/>
      </div>
      <div className="rf-col-12 rf-col-md-2 rf-col-lg-3">
        <ElementNumber nombre={props.tauxTotalUsagersAccompagnes} caracteresSpeciaux={props.caracteresSpeciaux} classe="many-numbers"/>
      </div>
      <div className="rf-col-12 rf-col-md-10 rf-col-lg-9">
        <ElementText texte="du total des usagers accompagnés sur cette période, dont&nbsp;:" classe="texts"/><br/>
      </div>
      <div className="rf-col-12 rf-col-md-2 rf-col-lg-3">
        <ElementNumber nombre={props.nbUsagersAccompagnementIndividuel} classe="many-numbers"/>
      </div>
      <div className="rf-col-12 rf-col-md-10 rf-col-lg-9">
        <ElementText texte="en accompagnement individuel" classe="texts"/>
      </div>
      <div className="rf-col-12 rf-col-md-2 rf-col-lg-3">
        <ElementNumber nombre={props.nbUsagersAtelierCollectif} classe="many-numbers"/>
      </div>
      <div className="rf-col-12 rf-col-md-10 rf-col-lg-9">
        <ElementText texte="en atelier collectif" classe="texts"/><br/>
      </div>
      <div className="rf-col-12 rf-col-md-2 rf-col-lg-3">
        <ElementNumber nombre={props.nbReconduction} classe="many-numbers"/>
      </div>
      <div className="rf-col-12 rf-col-md-10 rf-col-lg-9">
        <ElementText textePluralize={<Pluralize
          zero={'redirection vers une autre structure agréée'}
          singular={'redirection vers une autre structure agréée'}
          plural={'redirections vers une autre structure agréée'}
          count={props.nbReconduction}
          showCount={false} />} classe="texts"/>
      </div>
      <div className="rf-col-12">
        <div className="rf-m-lg-6w"></div>
      </div>
    </div>
  );
}

StatisticsRenewal.propTypes = {
  nbUsagersBeneficiantSuivi: PropTypes.number,
  tauxTotalUsagersAccompagnes: PropTypes.number,
  nbUsagersAccompagnementIndividuel: PropTypes.number,
  nbUsagersAtelierCollectif: PropTypes.number,
  nbReconduction: PropTypes.number,
  caracteresSpeciaux: PropTypes.string
};


export default StatisticsRenewal;
