import React from 'react';
import { useSelector } from 'react-redux';

import BigCountRadioButton from './Components/BigCountRadioButton';
import SmallRadioButton from './Components/SmallRadioButton';
import BigRadioButton from './Components/BigRadioButton';

function Accompagnement() {

  const cra = useSelector(state => state.cra);
  const accompagnement = cra?.accompagnement;
  const organisme = cra?.organisme;

  return (
    <>
      <div className="rf-grid-row rf-grid-row--gutters rf-grid-row--middle rf-mb-7w">
        <div className="rf-col-xs-11 rf-col-sm-11 rf-col-md-2 questionResponsive">
          <span className="question">L&rsquo;accompagnement va-t-il &ecirc;tre poursuivi&nbsp;? (Optionnel)</span>
        </div>
        <div className="responsiveRadioActivity1">
          {accompagnement?.individuel === 0 &&
            <BigRadioButton
              type="accompagnement"
              label="Accompagnement individuel"
              value="individuel"
              image="/logos/cra/logo-acc-individuel.svg"
              imageSelected="/logos/cra/logo-acc-individuel-n.svg"
              heightImage="56px"
              classDiv="accIndividuel"/>
          }
          {accompagnement?.individuel > 0 &&
            <BigCountRadioButton
              type="accompagnement"
              value="individuel"
              label="En individuel"/>
          }
        </div>
        <div className="responsiveRadioActivity2">
          {accompagnement?.atelier === 0 &&
            <BigRadioButton
              type="accompagnement"
              label="En atelier"
              value="atelier"
              image="/logos/cra/logo-atelier.svg"
              imageSelected="/logos/cra/logo-atelier-n.svg"
              heightImage="56px"
              classDiv="atelierCollectif"/>
          }
          {accompagnement?.atelier > 0 &&
            <BigCountRadioButton
              type="accompagnement"
              value="atelier"
              label="En atelier"/>
          }
        </div>
        <div className="responsiveRadioActivity3Big">
          {accompagnement?.redirection === 0 &&
            <BigRadioButton
              type="accompagnement"
              label="Redirection vers un &eacute;tablissement agr&eacute;&eacute;"
              value="redirection"
              image="/logos/cra/logo-redirection-structure.svg"
              imageSelected="/logos/cra/logo-redirection-structure-n.svg"
              heightImage="56px"
              classDiv="demPonctuelle"/>
          }
          {accompagnement?.redirection > 0 &&
            <BigCountRadioButton
              type="accompagnement"
              value="redirection"
              label={organisme ?? 'Redirection vers ...'}/>
          }
        </div>
        <div className="responsiveRadioActivity3Small">
          {accompagnement?.redirection === 0 &&
            <SmallRadioButton
              type="accompagnement"
              label="Redirection vers un &eacute;tablissement agr&eacute;&eacute;"
              value="redirection"
              image="/logos/cra/logo-redirection-structure.svg"
              imageSelected="/logos/cra/logo-redirection-structure-n.svg"
              heightImage="32px" />
          }
          {accompagnement?.redirection > 0 &&
            <BigCountRadioButton
              type="accompagnement"
              value="redirection"
              label={organisme ?? 'Redirection vers ...'}/>
          }
        </div>
      </div>
    </>
  );
}

export default Accompagnement;
