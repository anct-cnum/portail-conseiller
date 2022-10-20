import React from 'react';
import { useSelector } from 'react-redux';
import BigRadioButton from './Components/BigRadioButton';
import SmallRadioButton from './Components/SmallRadioButton';
import BigDatePickerButton from './Components/BigDatePickerButton';

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
          <BigRadioButton
            type="canal"
            label="Lieu de rattachement"
            value="rattachement"
            image="/logos/cra/logo-lieu-rattachement.svg"
            imageSelected="/logos/cra/logo-lieu-rattachement-n.svg"
            heightImage="56px"
            classDiv="lieuRattachement"/>
        </div>
        <div className="responsiveElement">

        </div>
        <div className="responsiveElement">

        </div>
      </div>

      {/*
<div className="responsiveRadioCanal1">
        <BigRadioButton
          type="canal"
          label="Lieu de rattachement"
          value="rattachement"
          image="/logos/cra/logo-lieu-rattachement.svg"
          imageSelected="/logos/cra/logo-lieu-rattachement-n.svg"
          heightImage="56px"
          classDiv="lieuRattachement"/>
      </div>
      <div className="responsiveRadioCanal2">
        <BigRadioButton
          type="canal"
          label="Autre lieu"
          value="autre"
          image="/logos/cra/logo-autre-lieu.svg"
          imageSelected="/logos/cra/logo-autre-lieu-n.svg"
          heightImage="56px"
          classDiv="autreLieu"/>
      </div>
      <div className="responsiveRadioCanal3">
        <div className={cra?.datePickerStatus ? 'responsiveDate active' : 'responsiveDate' }>
          <BigDatePickerButton initDate={cra?.dateAccompagnement} />
        </div>
        <div style={{ width: '50%', display: 'inline-block' }}>
          <SmallRadioButton
            type="canal"
            label="&Agrave; distance"
            value="distance"
            image="/logos/cra/logo-a-distance.svg"
            imageSelected="/logos/cra/logo-a-distance-n.svg"
            heightImage="32px" />
        </div>
        <div style={{ width: '50%', display: 'inline-block' }}>
          <SmallRadioButton
            type="canal"
            label="&Agrave; domicile"
            value="domicile"
            image="/logos/cra/logo-a-domicile.svg"
            imageSelected="/logos/cra/logo-a-domicile-n.svg"
            heightImage="32px" />
        </div>

      </div>
      */}
    </div>
  );
}

export default CanalEtAdresse;
