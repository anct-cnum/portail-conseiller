import React from 'react';
import Footer from '../../Footer';
import SelectCP from './Components/SelectCP';
import BigRadioButton from './Components/BigRadioButton';
import SmallRadioButton from './Components/SmallRadioButton';

function Cra() {

  return (
    <>
      <div className="rf-container cra">
        <div className="rf-grid-row rf-grid-row--center rf-my-md-12w rf-pt-1w rf-pb-3w">
          <span className="titre">Mon suivi d&rsquo;activité</span>
        </div>
        <div className="rf-grid-row rf-grid-row--gutters rf-grid-row--middle rf-mb-7w">
          <div className="rf-col-1"></div>
          <div className="rf-col-xs-10 rf-col-sm-10 rf-col-md-2">
            <span className="question">Où l&rsquo;accompagnement a-t-il eu lieu ?</span>
          </div>
          <div className="responsiveSelect">
            <SelectCP/>
          </div>
        </div>
        <div className="rf-grid-row rf-grid-row--gutters rf-grid-row--middle rf-mb-7w">
          <div className="rf-col-1"></div>
          <div className="rf-col-xs-10 rf-col-sm-10 rf-col-md-2">
            <span className="question">Par quel canal l&rsquo;accompagnement a-t-il eu lieu ?</span>
          </div>
          <div className="responsiveRadioCanal1">
            <BigRadioButton
              label="Lieu de rattachement"
              image="/logos/cra/logo-lieu-rattachement.svg"
              imageSelected="/logos/cra/logo-lieu-rattachement-n.svg"
              heightImage="56px"
              classDiv="lieuRattachement"/>
          </div>
          <div className="responsiveRadioCanal2">
            <BigRadioButton
              label="Autre lieu"
              image="/logos/cra/logo-autre-lieu.svg"
              imageSelected="/logos/cra/logo-autre-lieu-n.svg"
              heightImage="39px"
              classDiv="autreLieu"/>
          </div>
          <div className="responsiveRadioCanalVertical">
            <SmallRadioButton
              label="&Agrave; distance"
              image="/logos/cra/logo-a-distance.svg"
              imageSelected="/logos/cra/logo-a-distance-n.svg"
              heightImage="32px" />
            <SmallRadioButton
              label="&Agrave; domicile"
              image="/logos/cra/logo-a-domicile.svg"
              imageSelected="/logos/cra/logo-a-domicile-n.svg"
              heightImage="32px" />
          </div>
        </div>
      </div>
      <Footer type="support" titreBouton="Donner mon avis sur cette page"/>
    </>
  );
}

export default Cra;
