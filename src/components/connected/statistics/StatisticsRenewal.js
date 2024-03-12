import React from 'react';
import PropTypes from 'prop-types';
import ElementNumber from './Components/ElementNumber';
import ElementText from './Components/ElementText';
import { pluralize } from '../../../utils/functionFormats';

function StatisticsRenewal(props) {

  return (
    <>
      <div className="fr-grid-row dont-print">
        <div className="fr-col-12 fr-col-md-2 fr-col-lg-3">
          <ElementNumber nombre={props.nbUsagersBeneficiantSuivi} classe="numbers-renewal"/>
        </div>
        <div className="fr-col-12 fr-col-md-10 fr-col-lg-9">
          <ElementText textePluralize={pluralize(
            'Accompagnement avec suivi, soit :',
            'Accompagnement avec suivi, soit :',
            'Accompagnements avec suivi, soit :',
            props.nbUsagersBeneficiantSuivi
          )} classe="text"/><br/>
        </div>
        <div className="fr-col-12 fr-col-md-2 fr-col-lg-3">
          <ElementNumber nombre={props.tauxTotalUsagersAccompagnes} caracteresSpeciaux={props.caracteresSpeciaux} classe="many-numbers"/>
        </div>
        <div className="fr-col-12 fr-col-md-10 fr-col-lg-9">
          <ElementText texte="du total des usagers accompagnés sur cette période, dont&nbsp;:" classe="texts"/><br/>
        </div>
        <div className="fr-col-12 fr-col-md-2 fr-col-lg-3">
          <ElementNumber nombre={props.nbUsagersAccompagnementIndividuel} classe="many-numbers"/>
        </div>
        <div className="fr-col-12 fr-col-md-10 fr-col-lg-9">
          <ElementText texte="en accompagnement individuel" classe="texts"/>
        </div>
        <div className="fr-col-12 fr-col-md-2 fr-col-lg-3">
          <ElementNumber nombre={props.nbUsagersAtelierCollectif} classe="many-numbers"/>
        </div>
        <div className="fr-col-12 fr-col-md-10 fr-col-lg-9">
          <ElementText texte="en atelier collectif" classe="texts"/><br/>
        </div>
        <div className="fr-col-12 fr-col-md-2 fr-col-lg-3">
          <ElementNumber nombre={props.nbReconduction} classe="many-numbers"/>
        </div>
        <div className="fr-col-12 fr-col-md-10 fr-col-lg-9">
          <ElementText textePluralize={pluralize(
            'redirection vers une autre structure agréée',
            'redirection vers une autre structure agréée',
            'redirections vers une autre structure agréée',
            props.nbReconduction
          )} classe="texts"/>
        </div>
        <div className="fr-col-12">
          <div className="fr-m-lg-6w"></div>
        </div>
      </div>

      <div className="fr-grid-row only-print">
        <div className="fr-col-12 fr-mb-6w">
          <span className="numbers">{props.nbUsagersBeneficiantSuivi}</span>
          <span className="text">
            {pluralize(
              'Accompagnement avec suivi, soit :',
              'Accompagnement avec suivi, soit :',
              'Accompagnements avec suivi, soit :',
              props.nbUsagersBeneficiantSuivi,
            )}
          </span>
        </div>
        <div className="fr-col-12 fr-mb-6w">
          <span className="number">{props.tauxTotalUsagersAccompagnes}%</span>
          <span className="text">du total des usagers accompagnés sur cette période, dont&nbsp;:</span>
        </div>
        <div className="fr-col-12 fr-mb-6w">
          <span className="number">{props.nbUsagersAccompagnementIndividuel}</span>
          <span className="text">en accompagnement individuel</span>
        </div>
        <div className="fr-col-12 fr-mb-12w">
          <span className="number">{props.nbUsagersAtelierCollectif}</span>
          <span className="text">en atelier collectif</span>
        </div>
        <div className="fr-col-12 fr-mt-6w">
          <span className="number">{props.nbReconduction}</span>
          <span className="text">
            {pluralize(
              'redirection vers une autre structure agréée',
              'redirection vers une autre structure agréée',
              'redirections vers une autre structure agréée',
              props.nbReconduction
            )}</span>
        </div>
      </div>
    </>
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
