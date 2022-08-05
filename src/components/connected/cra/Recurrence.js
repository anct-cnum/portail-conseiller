import React from 'react';
import RecurrenceButton from './Components/RecurrenceButton';

function Recurrence() {

  return (
    <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--middle espacement">
      <div className="fr-col-xs-11 fr-col-sm-11 fr-col-md-2 questionResponsive">
        <span className="question">Optionnel&nbsp;: r&eacute;currence des personnes</span>
      </div>
      <div className="responsiveRecurrence">
        <RecurrenceButton />
      </div>
    </div>
  );
}

export default Recurrence;
