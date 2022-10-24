import React from 'react';
import { useSelector } from 'react-redux';
import BigRadioButtonV2 from './Components/BigRadioButtonV2';
import SmallRadioButtonV2 from './Components/SmallRadioButtonV2';
import BigDatePickerButton from './Components/BigDatePickerButton';
import SelectCP from './Components/SelectCP';

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
        <div className="responsiveElement">
          <SelectCP/>
        </div>
        <div className="responsiveElement">
          <BigRadioButtonV2
            type="canal"
            label="Lieu de rattachement"
            value="rattachement"
            image="logoLieuRatachement"
            classDiv="lieuRattachement"/>
        </div>
        <div className="responsiveElement">
          <BigRadioButtonV2
            type="canal"
            label="Autre lieu"
            value="autre"
            image="logoAutreLieu"
            classDiv="autreLieu"/>
        </div>
        <div className="responsiveElement">
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
      </div>
    </div>
  );
}

export default CanalEtAdresse;
