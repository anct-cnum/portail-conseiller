import React from 'react';
import { useSelector } from 'react-redux';

import BigCountRadioButton from './Components/BigCountRadioButton';
import SmallRadioButton from './Components/SmallRadioButton';
import BigRadioButtonV2 from './Components/BigRadioButtonV2';

function Accompagnement() {

  const cra = useSelector(state => state.cra);
  const accompagnement = cra?.accompagnement;
  const organisme = cra?.organisme;

  return (
    <>
      <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--middle espacement">
        <div className="fr-col-xs-11 fr-col-sm-11 fr-col-md-2 questionResponsive">
          <span className="question">L&rsquo;accompagnement va-t-il &ecirc;tre poursuivi&nbsp;? (Optionnel)</span>
        </div>
        <div className="responsiveRadioActivity1">
          {accompagnement?.individuel === 0 &&
            <BigRadioButtonV2
              type="accompagnement"
              label="Accompagnement individuel"
              value="individuel"
              image="logoIndividuel"
              classDiv="accIndividuel"
            />
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
            <BigRadioButtonV2
              type="accompagnement"
              label="En atelier"
              value="atelier"
              image="logoAtelier"
              classDiv="atelierCollectif"
            />
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
            <BigRadioButtonV2
              type="accompagnement"
              label="Redirection vers une structure"
              value="redirection"
              image="logoRedirection"
              classDiv="demPonctuelle"
            />
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
              label="Redirection vers une structure"
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
