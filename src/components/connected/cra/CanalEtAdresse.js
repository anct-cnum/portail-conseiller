import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BigRadioButtonV2 from './Components/BigRadioButtonV2';
import SmallRadioButtonV2 from './Components/SmallRadioButtonV2';
import BigDatePickerButton from './Components/BigDatePickerButton';
import SelectCP from './Components/SelectCP';
import SelectPermanence from './Components/SelectPermanence';

function CanalEtAdresse() {

  let cra = useSelector(state => state.cra);
  const [voirInformation, setVoirInformation] = useState(false);

  const handleClick = () => {
    setVoirInformation(!voirInformation);
  };

  return (
    <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--middle espacement">
      <div className="fr-col-11 fr-col-md-2 questionResponsive">
        <span className={`question
          ${voirInformation ? 'open-information q1' : ''}
          ${cra?.printError && (cra?.errorsRequired?.canal || cra?.errorsRequired?.cp) ? 'questionRequired' : ''}`}>
        O&ugrave; et quand l&rsquo;accompagnement a-t-il eu lieu&nbsp;? <i className="ri-information-line information" onClick={() => {
            handleClick();
          }}></i>
        </span>
      </div>
      <div className="fr-col-12 fr-col-md-10">
        <div className={`responsiveElement2 ${voirInformation ? 'info-rattachement' : ''}`}>
          <SelectPermanence voirInformation={voirInformation}/>
          <BigRadioButtonV2
            type="canal"
            label="Lieu d&rsquo;activit&eacute;"
            value="rattachement"
            image="logoLieuRattachement"
            classDiv="lieuRattachement"
          />
          <div className={`${voirInformation ? 'information-message' : 'close-information'}`}>
            Les lieux pr&eacute;-enregistr&eacute;s via votre <a href="/mon-nouveau-lieu-activite"
              className="fr-link fr-fi-external-link-line fr-link--icon-right">formulaire lieux d&rsquo;activit&eacute;s</a>
          </div>
        </div>
        <div className={`responsiveElement2 ${voirInformation ? 'info-autre' : ''}`}>
          <SelectCP voirInformation={voirInformation}/>
          <BigRadioButtonV2
            type="canal"
            label="Autre lieu"
            value="autre lieu"
            image="logoAutreLieu"
            classDiv="autreLieu"/>
          <div className={`${voirInformation ? 'information-message' : 'close-information'}`}>
            Vous pouvez enregistrer un accompagnement via son code postal.
          </div>
        </div>
        <div className={`responsiveElementEnd2 ${voirInformation ? 'info-date-dist-dom' : ''}`}>
          <div className="buttonDate">
            <BigDatePickerButton type="date" initDate={cra?.dateAccompagnement} />
          </div>
          <SmallRadioButtonV2
            type="canal"
            label="&Agrave; distance"
            value="distance"
            image="logoDistance" />
          <SmallRadioButtonV2
            type="canal"
            label="&Agrave; domicile"
            value="domicile"
            image="logoDomicile" />
          <div className={`${voirInformation ? 'information-message info-dom-dis-message' : 'close-information'}`}>
            <div>Date : vous avez la possibilit&eacute; d&rsquo;enregistrer un accompagnement en diff&eacute;r&eacute;.</div>
            <div>&Agrave; distance : vous avez r&eacute;alis&eacute; l&rsquo;accompagnement par t&eacute;l&eacute;phone ou visio-conf&eacute;rence.</div>
            <div>&Agrave; domicile : l&rsquo;accompagnement a &eacute;t&eacute; r&eacute;alis&eacute; chez l&rsquo;usager.</div>
          </div>
        </div>
        {cra?.canal === 'domicile' && cra?.errorsRequired.cp &&
          <div className="textInformation">
            Veuillez compl&eacute;ter en s&eacute;lectionnant le champs &laquo;&nbsp;Autre lieu&nbsp;&raquo;.
          </div>
        }
        {cra?.canal === 'distance' && cra?.errorsRequired.cp &&
          <div className="textInformation">
            Veuillez compl&eacute;ter en s&eacute;lectionnant l&rsquo;un des deux champs.
          </div>
        }
      </div>
    </div>
  );
}

export default CanalEtAdresse;
