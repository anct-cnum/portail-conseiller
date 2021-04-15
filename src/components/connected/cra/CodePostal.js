import React from 'react';
import { useSelector } from 'react-redux';
import SelectCP from './Components/SelectCP';

function CodePostal() {

  let cra = useSelector(state => state.cra);

  return (
    <>
      <div className="rf-grid-row rf-grid-row--gutters rf-grid-row--middle rf-mb-7w">
        <div className="rf-col-xs-11 rf-col-sm-11 rf-col-md-2 questionResponsive">
          <span className={`question ${cra?.printError && cra?.errorsRequired?.cp ? 'questionRequired' : ''}`}>
            Où l&rsquo;accompagnement a-t-il eu lieu&nbsp;?
          </span>
        </div>
        <div className="responsiveSelect">
          <SelectCP/>
        </div>
      </div>
    </>
  );
}

export default CodePostal;
