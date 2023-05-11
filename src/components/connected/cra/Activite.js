import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BigRadioButtonV2 from './Components/BigRadioButtonV2';
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
      <div className={`responsiveRadioActivity1 ${voirInformation ? 'info-collectif activite-height' : ''}`}>
        <BigRadioButtonV2
          type="activite"
          label="Atelier Collectif"
          value="collectif"
          image="logoAtelier"
          classDiv="atelierCollectif"
        />
        <div className={`${voirInformation ? 'information-message width-message-pourcent' : 'close-information'}`}>
          Ateliers, accompagnements men&eacute;s avec plusieurs personnes.
        </div>
      </div>
      }
      {cra?.activite === 'collectif' &&
      <div className={`responsiveRadioActivity1 ${voirInformation ? 'info-collectif' : ''}`}>
        <BigCountRadioButton
          type="participants"
          label="participants"/>
        <div className={`${voirInformation ? 'information-message width-message-pourcent' : 'close-information'}`}>
          Ateliers, accompagnements men&eacute;s avec plusieurs personnes.
        </div>
      </div>
      }
      <div className={`responsiveRadioActivity2 ${voirInformation ? 'info-individuel individuel-height' : ''}`}>
        <BigRadioButtonV2
          type="activite"
          label="Accompagnement individuel"
          value="individuel"
          image="logoIndividuel"
          classDiv="accIndividuel"
        />
        <div className={`${voirInformation ? 'information-message width-message-pourcent' : 'close-information'}`}>
        Lorsqu&rsquo;une seule personne est accompagn&eacute;e.
        </div>
      </div>
      <div className={`responsiveRadioActivity3Big ${voirInformation ? 'info-ponctuelle activite-height' : ''}`}>
        <BigRadioButtonV2
          type="activite"
          label="Demande ponctuelle"
          value="ponctuel"
          image="logoDemande"
          classDiv="demPonctuelle"
        />
        <div className={`${voirInformation ? 'information-message width-message-pourcent' : 'close-information'}`}>
          Conseils et services ponctuels, informels, que vous estimez comme &eacute;tant du temps de travail.
        </div>
      </div>
      <div className={`responsiveRadioActivity3Small ${voirInformation ? 'open-activite' : ''}`}>
        <SmallRadioButton
          type="activite"
          label="Demande ponctuelle"
          value="ponctuel"
          image="logoDemande"
          classDiv="demPonctuelle"
        />
        <div className={`${voirInformation ? 'information-message' : 'close-information'}`}>
        Une aide ponctuelle sur une situation pr&eacute;cise, dont la probl&eacute;matique est r&eacute;solue &agrave; la fin de l&rsquo;accompagnement.
        </div>
      </div>
    </div>
  );
}

export default Activite;
