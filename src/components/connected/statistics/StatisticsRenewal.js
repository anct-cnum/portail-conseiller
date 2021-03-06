import React from 'react';
import PropTypes from 'prop-types';
import Pluralize from 'react-pluralize';

import ElementNumber from './Components/ElementNumber';
import ElementText from './Components/ElementText';

function StatisticsRenewal(props) {

  return (
    <div className="rf-grid-row">
      <div className="rf-col-2 rf-col-lg-3">
        <ElementNumber nombre={props.nbUsagersBeneficiantSuivi} classe="numbers"/>
      </div>
      <div className="rf-col-10 rf-col-lg-9">
        <Pluralize
          zero={'usagers n\'ont bénéficié d\'un accompagnement poursuivi'}
          singular={'usager a bénéficié d\'un accompagnement poursuivi'}
          plural={'usagers ont bénéficié d\'un accompagnement poursuivi'}
          count={props.nbUsagersBeneficiantSuivi}
          showCount={false} className="texts" />
      </div>
      <div className="rf-col-2 rf-col-lg-3">
        <ElementNumber nombre={props.tauxTotalUsagersAccompagnes} caracteresSpeciaux={props.caracteresSpeciaux} classe="many-numbers"/>
      </div>
      <div className="rf-col-10 rf-col-lg-9">
        <ElementText texte="du total des usagers accompagnés sur cette période" classe="texts"/><br/>
      </div>
      <div className="rf-col-12" style={{ paddingLeft: '2rem' }}>
        Dont&nbsp;:
      </div>
      <div className="rf-col-2 rf-col-lg-3">
        <ElementNumber nombre={props.nbUsagersAccompagnementIndividuel} classe="many-numbers"/>
      </div>
      <div className="rf-col-10 rf-col-lg-9">
        <ElementText texte="en accompagnement individuel" classe="texts"/>
      </div>
      <div className="rf-col-2 rf-col-lg-3">
        <ElementNumber nombre={props.nbUsagersAtelierCollectif} classe="many-numbers"/>
      </div>
      <div className="rf-col-10 rf-col-lg-9">
        <ElementText texte="en atelier collectif" classe="texts"/><br/>
      </div>
      <div className="rf-col-2 rf-col-lg-3">
        <ElementNumber nombre={props.nbReconduction} classe="many-numbers"/>
      </div>
      <div className="rf-col-10 rf-col-lg-9">
        <ElementText texte="redirections vers une autre structure agréée" classe="texts"/>
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
