import React from 'react';
import { useSelector } from 'react-redux';
import BigRadioButton from './Components/BigRadioButton';
import SmallRadioButton from './Components/SmallRadioButton';

function Canal() {

  let cra = useSelector(state => state.cra);

  return (
    <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--middle espacement">
      <div className="fr-col-xs-11 fr-col-sm-11 fr-col-md-2 questionResponsive">
        <span className={`question ${cra?.printError && cra?.errorsRequired?.canal ? 'questionRequired' : ''}`}>
          Par quel canal l&rsquo;accompagnement a-t-il eu lieu&nbsp;?
        </span>
      </div>
      <div className="responsiveRadioCanal1">
        <BigRadioButton
          type="canal"
          label="Lieu d&rsquo;activit&eacute;"
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
          value="autre lieu"
          image="/logos/cra/logo-autre-lieu.svg"
          imageSelected="/logos/cra/logo-autre-lieu-n.svg"
          heightImage="56px"
          classDiv="autreLieu"/>
      </div>
      <div className="responsiveRadioCanalVertical">
        <SmallRadioButton
          type="canal"
          label="&Agrave; distance"
          value="distance"
          image="/logos/cra/logo-a-distance.svg"
          imageSelected="/logos/cra/logo-a-distance-n.svg"
          heightImage="32px" />
        <SmallRadioButton
          type="canal"
          label="&Agrave; domicile"
          value="domicile"
          image="/logos/cra/logo-a-domicile.svg"
          imageSelected="/logos/cra/logo-a-domicile-n.svg"
          heightImage="32px" />
      </div>
    </div>
  );
}

export default Canal;
