import React from 'react';
import { useSelector } from 'react-redux';
import BigRadioButton from './Components/BigRadioButton';
import SmallRadioButton from './Components/SmallRadioButton';
import BigCountRadioButton from './Components/BigCountRadioButton';

function Activite() {

  let cra = useSelector(state => state.cra);

  return (
    <>
      <div className="rf-grid-row rf-grid-row--gutters rf-grid-row--middle rf-mb-7w">
        <div className="rf-col-xs-11 rf-col-sm-11 rf-col-md-2 questionResponsive">
          <span
            className={`question ${cra?.printError && cra?.errorsRequired?.activite ? 'questionRequired' : ''}`}>
              Quel type d&rsquo;activité venez-vous de réaliser&nbsp;?
          </span>
        </div>
        {cra?.activite !== 'collectif' &&
        <div className="responsiveRadioActivity1">
          <BigRadioButton
            type="activite"
            label="Atelier Collectif"
            value="collectif"
            image="/logos/cra/logo-atelier.svg"
            imageSelected="/logos/cra/logo-atelier-n.svg"
            heightImage="56px"
            classDiv="atelierCollectif"/>
        </div>
        }
        {cra?.activite === 'collectif' &&
        <div className="responsiveRadioActivity1">
          <BigCountRadioButton
            type="participants"
            label="participants"/>
        </div>
        }
        <div className="responsiveRadioActivity2">
          <BigRadioButton
            type="activite"
            label="Accompagnement individuel"
            value="individuel"
            image="/logos/cra/logo-acc-individuel.svg"
            imageSelected="/logos/cra/logo-acc-individuel-n.svg"
            heightImage="56px"
            classDiv="accIndividuel"/>
        </div>
        <div className="responsiveRadioActivity3Big">
          <BigRadioButton
            type="activite"
            label="Demande ponctuelle"
            value="ponctuel"
            image="/logos/cra/logo-demande-ponctuelle.svg"
            imageSelected="/logos/cra/logo-demande-ponctuelle-n.svg"
            heightImage="56px"
            classDiv="demPonctuelle"/>
        </div>
        <div className="responsiveRadioActivity3Small">
          <SmallRadioButton
            type="activite"
            label="Demande ponctuelle"
            value="ponctuel"
            image="/logos/cra/logo-demande-ponctuelle.svg"
            imageSelected="/logos/cra/logo-demande-ponctuelle-n.svg"
            heightImage="32px" />
        </div>
      </div>
    </>
  );
}

export default Activite;
