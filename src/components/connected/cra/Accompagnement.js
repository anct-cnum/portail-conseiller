import React from 'react';
import BigRadioButton from './Components/BigRadioButton';
import SmallRadioButton from './Components/SmallRadioButton';

function Accompagnement() {

  return (
    <>
      <div className="rf-grid-row rf-grid-row--gutters rf-grid-row--middle rf-mb-7w">
        <div className="rf-col-xs-11 rf-col-sm-11 rf-col-md-2 questionResponsive">
          <span className="question">L&rsquo;accompagnement va-t-il &ecirc;tre poursuivi&nbsp;? (Optionnel)</span>
        </div>
        <div className="responsiveRadioActivity1">
          <BigRadioButton
            type="accompagnement"
            label="Accompagnement individuel"
            value="individuel"
            image="/logos/cra/logo-acc-individuel.svg"
            imageSelected="/logos/cra/logo-acc-individuel-n.svg"
            heightImage="56px"
            classDiv="accIndividuel"/>
        </div>
        <div className="responsiveRadioActivity2">
          <BigRadioButton
            type="accompagnement"
            label="En atelier"
            value="atelier"
            image="/logos/cra/logo-atelier.svg"
            imageSelected="/logos/cra/logo-atelier-n.svg"
            heightImage="56px"
            classDiv="atelierCollectif"/>
        </div>
        <div className="responsiveRadioActivity3Big">
          <BigRadioButton
            type="accompagnement"
            label="Redirection vers un &eacute;tablissement agr&eacute;&eacute;"
            value="redirection"
            image="/logos/cra/logo-redirection-structure.svg"
            imageSelected="/logos/cra/logo-redirection-structure-n.svg"
            heightImage="56px"
            classDiv="demPonctuelle"/>
        </div>
        <div className="responsiveRadioActivity3Small">
          <SmallRadioButton
            type="accompagnement"
            label="Redirection vers un &eacute;tablissement agr&eacute;&eacute;"
            value="redirection"
            image="/logos/cra/logo-redirection-structure.svg"
            imageSelected="/logos/cra/logo-redirection-structure-n.svg"
            heightImage="32px" />
        </div>
      </div>
    </>
  );
}

export default Accompagnement;
