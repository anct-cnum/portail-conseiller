import React from 'react';
import { useSelector } from 'react-redux';
import BigDatePickerButton from './Components/BigDatePickerButton';
import SelectCP from './Components/SelectCP';

function CodePostal() {

  let cra = useSelector(state => state.cra);

  return (
    <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--middle espacement">
      <div className="fr-col-xs-11 fr-col-sm-11 fr-col-md-2 questionResponsive">
        <span className={`question ${cra?.printError && cra?.errorsRequired?.cp ? 'questionRequired' : ''}`}>
          O&ugrave; l&rsquo;accompagnement a-t-il eu lieu&nbsp;?
        </span>
      </div>
      <div className="responsiveSelect">
        <SelectCP/>
      </div>
      <div className="dateBox" >
        <div className={cra?.datePickerStatus ? 'responsiveDate active' : 'responsiveDate' }>
          <BigDatePickerButton initDate={cra?.dateAccompagnement} />
        </div>
      </div>
    </div>
  );
}

export default CodePostal;
