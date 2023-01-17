import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BigRadioButton from './Components/BigRadioButton';
import SmallRadioButton from './Components/SmallRadioButton';
import BigCountRadioButton from './Components/BigCountRadioButton';

function Activite() {

  let cra = useSelector(state => state.cra);
  const [voirInformation, setVoirInformation] = useState(false);

  const handleClick = () => {
    setVoirInformation(!voirInformation);
  };

  return (
    <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--middle espacement">
      <div className="fr-col-xs-11 fr-col-sm-11 fr-col-md-2 questionResponsive">
        <span className={`question
        ${voirInformation ? 'open-information q2' : ''}
        ${cra?.printError && cra?.errorsRequired?.activite ? 'questionRequired' : ''}`}>
            Quel type d&rsquo;activit&eacute; venez-vous de r&eacute;aliser&nbsp;?
          <i className="ri-information-line information" onClick={() => {
            handleClick();
          }}></i>
        </span>
      </div>
      {cra?.activite !== 'collectif' &&
      <div className={`responsiveRadioActivity1 ${voirInformation ? 'info-top-12-bis activite-height' : ''}`}>
        <BigRadioButton
          type="activite"
          label="Atelier Collectif"
          value="collectif"
          image="/logos/cra/logo-atelier.svg"
          imageSelected="/logos/cra/logo-atelier-n.svg"
          heightImage="56px"
          classDiv="atelierCollectif"/>
        <div className={`${voirInformation ? 'information-message width-message-pourcent' : 'close-information'}`}>
          Ateliers, accompagnements men&eacute;s avec plusieurs personnes. Vous pouvez optionnellement comptabiliser les absences.
        </div>
      </div>
      }
      {cra?.activite === 'collectif' &&
      <div className={`responsiveRadioActivity1 ${voirInformation ? 'info-top-12-bis' : ''}`}>
        <BigCountRadioButton
          type="participants"
          label="participants"/>
        <div className={`${voirInformation ? 'information-message width-message-pourcent' : 'close-information'}`}>
          Ateliers, accompagnements men&eacute;s avec plusieurs personnes. Vous pouvez optionnellement comptabiliser les absences.
        </div>
      </div>
      }
      <div className={`responsiveRadioActivity2 ${voirInformation ? 'info-individuel individuel-height' : ''}`}>
        <BigRadioButton
          type="activite"
          label="Accompagnement individuel"
          value="individuel"
          image="/logos/cra/logo-acc-individuel.svg"
          imageSelected="/logos/cra/logo-acc-individuel-n.svg"
          heightImage="56px"
          classDiv="accIndividuel"/>
        <div className={`${voirInformation ? 'information-message width-message-pourcent' : 'close-information'}`}>
        Lorsqu&rsquo;une seule personne est accompagn&eacute;e. Vous pouvez enregistrer plusieurs accompagnements individuels en une
        fois en incr&eacute;mentant le bouton.
        </div>
      </div>
      <div className={`responsiveRadioActivity3Big ${voirInformation ? 'info-top-24 activite-height' : ''}`}>
        <BigRadioButton
          type="activite"
          label="Demande ponctuelle"
          value="ponctuel"
          image="/logos/cra/logo-demande-ponctuelle.svg"
          imageSelected="/logos/cra/logo-demande-ponctuelle-n.svg"
          heightImage="56px"
          classDiv="demPonctuelle"/>
        <div className={`${voirInformation ? 'information-message width-message-pourcent' : 'close-information'}`}>
          Conseils et services ponctuels, informels, que vous estimez comme &eacute;tant du temps de travail.
        </div>
      </div>
      <div className={`responsiveRadioActivity3Small ${voirInformation ? 'open-activite' : ''}`}>
        <SmallRadioButton
          type="activite"
          label="Demande ponctuelle"
          value="ponctuel"
          image="/logos/cra/logo-demande-ponctuelle.svg"
          imageSelected="/logos/cra/logo-demande-ponctuelle-n.svg"
          heightImage="32px" />
        <div className={`${voirInformation ? 'information-message' : 'close-information'}`}>
          Conseils et services ponctuels, informels, que vous estimez comme &eacute;tant du temps de travail.
        </div>
      </div>
    </div>
  );
}

export default Activite;
