import React from 'react';
import { useSelector } from 'react-redux';
import SquareButton from './Components/SquareButton';
import SmallCountRadioButton from './Components/SmallCountRadioButton';

function Duree() {

  let cra = useSelector(state => state.cra);

  return (
    <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--middle espacement">
      <div className="fr-col-xs-11 fr-col-sm-11 fr-col-md-2 questionResponsive">
        <span className={`question ${cra?.printError && cra?.errorsRequired?.duree ? 'questionRequired' : ''}`}>
          Combien de temps a dur&eacute; l&rsquo;accompagnement&nbsp;?
        </span>
      </div>
      <div className="responsiveSquareTime1">
        <SquareButton
          type="duree"
          value="0-30"
          label="30 min. ou moins"/>
      </div>
      <div className="responsiveSquareTime2">
        <SquareButton
          type="duree"
          value="30-60"
          label="30 min. &agrave; 1h"/>
      </div>
      { (!cra?.duree || cra?.duree === '0-30' || cra?.duree === '30-60') &&
      <div className="responsiveSquareTime3">
        <SquareButton
          type="duree"
          value="60"
          label="1h ou plus"/>
      </div>
      }
      { (cra?.duree && cra?.duree !== '0-30' && cra?.duree !== '30-60') &&
      <div className="responsiveSquareTime3">
        <SmallCountRadioButton
          type="duree"/>
      </div>
      }
    </div>
  );
}

export default Duree;
