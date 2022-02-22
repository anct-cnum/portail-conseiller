import React from 'react';
import { useSelector } from 'react-redux';
import RecurrenceButton from './Components/RecurrenceButton';

function Recurrence() {

  let cra = useSelector(state => state.cra);

  return (
    <div className="rf-grid-row rf-grid-row--gutters rf-grid-row--middle rf-mb-7w">
      <div className="rf-col-xs-11 rf-col-sm-11 rf-col-md-2 questionResponsive">
        <span className={`question ${cra?.printError && cra?.errorsRequired?.duree ? 'questionRequired' : ''}`}>
          Optionnel&nbsp;: r&eacute;currence des personnes
        </span>
      </div>
      <div className="responsiveRecurrence">
        <RecurrenceButton />
      </div>
    </div>
  );
}

export default Recurrence;
