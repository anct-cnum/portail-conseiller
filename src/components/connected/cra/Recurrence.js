import React, { useState } from 'react';
import RecurrenceButton from './Components/RecurrenceButton';

function Recurrence() {
  const [voirInformation, setVoirInformation] = useState(false);

  const handleClick = () => {
    setVoirInformation(!voirInformation);
  };
  return (
    <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--middle espacement">
      <div className="fr-col-xs-11 fr-col-sm-11 fr-col-md-2 questionResponsive">
        <span className={`question" ${voirInformation ? 'open-information q3' : ''}`}>
          Optionnel&nbsp;: r&eacute;currence des personnes <i className="ri-information-line information" onClick={() => {
            handleClick();
          }}></i>
        </span>
      </div>
      <div className="responsiveRecurrence">
        <RecurrenceButton />
        <div className={`${voirInformation ? 'information-message' : 'close-information'}`} style={{ width: '100%' }}>
        Renseigner si la ou les personnes ont déjà été accompagnées. Ceci sert à compter le nombre de nouvelles personnes que vous rencontrez.
        </div>
      </div>
    </div>
  );
}

export default Recurrence;
