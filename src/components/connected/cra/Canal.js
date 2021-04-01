import React from 'react';
import BigRadioButton from './Components/BigRadioButton';
import SmallRadioButton from './Components/SmallRadioButton';

function Canal() {

  return (
    <>
      <div className="rf-grid-row rf-grid-row--gutters rf-grid-row--middle rf-mb-7w">
        <div className="rf-col-1"></div>
        <div className="rf-col-xs-10 rf-col-sm-10 rf-col-md-2">
          <span className="question">Par quel canal l&rsquo;accompagnement a-t-il eu lieu ?</span>
        </div>
        <div className="responsiveRadioCanal1">
          <BigRadioButton
            type="canal"
            label="Lieu de rattachement"
            image="/logos/cra/logo-lieu-rattachement.svg"
            imageSelected="/logos/cra/logo-lieu-rattachement-n.svg"
            heightImage="56px"
            classDiv="lieuRattachement"/>
        </div>
        <div className="responsiveRadioCanal2">
          <BigRadioButton
            type="canal"
            label="Autre lieu"
            image="/logos/cra/logo-autre-lieu.svg"
            imageSelected="/logos/cra/logo-autre-lieu-n.svg"
            heightImage="39px"
            classDiv="autreLieu"/>
        </div>
        <div className="responsiveRadioCanalVertical">
          <SmallRadioButton
            type="canal"
            label="&Agrave; distance"
            image="/logos/cra/logo-a-distance.svg"
            imageSelected="/logos/cra/logo-a-distance-n.svg"
            heightImage="32px" />
          <SmallRadioButton
            type="canal"
            label="&Agrave; domicile"
            image="/logos/cra/logo-a-domicile.svg"
            imageSelected="/logos/cra/logo-a-domicile-n.svg"
            heightImage="32px" />
        </div>
      </div>
    </>
  );
}

export default Canal;
