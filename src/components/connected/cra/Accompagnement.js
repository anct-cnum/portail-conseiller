import React from 'react';
import { useSelector } from 'react-redux';

import BigCountRadioButton from './Components/BigCountRadioButton';
import SmallRadioButton from './Components/SmallRadioButton';
import BigRadioButtonV2 from './Components/BigRadioButtonV2';
import BigCountRadioButtonRedirection from './Components/BigCountRadionButtonRedirection';

function Accompagnement() {

  const cra = useSelector(state => state.cra);
  const { nbIndividuel, nbAtelier, nbOrganisme, organisme } = cra;

  return (
    <>
      <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--middle espacement">
        <div className="fr-col-xs-11 fr-col-sm-11 fr-col-md-2 questionResponsive">
          <span className="question">L&rsquo;accompagnement va-t-il &ecirc;tre poursuivi&nbsp;? (Optionnel)</span>
        </div>
        <div className="responsiveRadioActivity1">
          {nbIndividuel === 0 &&
            <BigRadioButtonV2
              type="accompagnement"
              label="Accompagnement individuel"
              value="individuel"
              image="logoIndividuel"
              classDiv="accIndividuel"
            />
          }
          {nbIndividuel > 0 &&
            <BigCountRadioButton
              type="accompagnement"
              value="individuel"
              label="En individuel"/>
          }
        </div>
        <div className="responsiveRadioActivity2">
          {nbAtelier === 0 &&
            <BigRadioButtonV2
              type="accompagnement"
              label="En atelier"
              value="atelier"
              image="logoAtelier"
              classDiv="atelierCollectif"
            />
          }
          {nbAtelier > 0 &&
            <BigCountRadioButton
              type="accompagnement"
              value="atelier"
              label="En atelier"/>
          }
        </div>
        <div className="responsiveRadioActivity3Big">
          { nbOrganisme === 0 &&
            <BigRadioButtonV2
              type="accompagnement"
              label="Redirection vers une structure"
              value="redirection"
              image="logoRedirection"
              classDiv="accompagnementRedirection"
            />
          }
          { nbOrganisme > 0 &&
            <BigCountRadioButtonRedirection
              label={organisme ?? 'Selectionnez une autre structure'}
              value={organisme ?? null}
            />
          }
        </div>
        <div className="responsiveRadioActivity3Small">
          {nbOrganisme === 0 &&
            <SmallRadioButton
              type="accompagnement"
              label="Redirection vers une structure"
              value="redirection"
              image="logoRedirection"
            />
          }
          {nbOrganisme > 0 &&
            <BigCountRadioButtonRedirection
              label={organisme ?? 'Selectionnez une autre structure'}
              value={organisme ?? null}
            />
          }
        </div>
      </div>
    </>
  );
}

export default Accompagnement;
