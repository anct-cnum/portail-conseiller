import React from 'react';
import { useSelector } from 'react-redux';
import BigRadioButtonV2 from './Components/BigRadioButtonV2';
import SmallRadioButtonV2 from './Components/SmallRadioButtonV2';
import BigDatePickerButton from './Components/BigDatePickerButton';
import SelectCP from './Components/SelectCP';
import SelectPermanence from './Components/SelectPermanence';

function CanalEtAdresse() {

  let cra = useSelector(state => state.cra);

  return (
    <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--middle espacement">
      <div className="fr-col-11 fr-col-md-2 questionResponsive">
        <span className={`question ${cra?.printError && cra?.errorsRequired?.canal ? 'questionRequired' : ''}`}>
        O&ugrave; et quand l&rsquo;accompagnement a-t-il eu lieu&nbsp;?
        </span>
      </div>
      <div className="fr-col-12 fr-col-md-9">
        <div className="responsiveElement2">
          <SelectPermanence/>
          <BigRadioButtonV2
            type="canal"
            label="Lieu d&rsquo;activit&eacute;"
            value="rattachement"
            image="logoLieuRatachement"
            classDiv="lieuRattachement"/>
        </div>
        <div className="responsiveElement2">
          <SelectCP/>
          <BigRadioButtonV2
            type="canal"
            label="Autre lieu"
            value="autre"
            image="logoAutreLieu"
            classDiv="autreLieu"/>
        </div>
        <div className="responsiveElement2">
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
        </div>
        {cra?.canal === 'domicile' && cra?.errorsRequired.cp &&
          <div className="textInformation">
            Renseignez la localisation plus bas via le champ &laquo;Lieu(x) de r&eacute;sidence(s) des usagers&raquo;.
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
