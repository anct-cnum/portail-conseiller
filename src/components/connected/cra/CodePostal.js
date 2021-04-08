import React from 'react';
import SelectCP from './Components/SelectCP';

function CodePostal() {

  return (
    <>
      <div className="rf-grid-row rf-grid-row--gutters rf-grid-row--middle rf-mb-7w">
        <div className="rf-col-xs-11 rf-col-sm-11 rf-col-md-2 questionResponsive">
          <span className="question">Où l&rsquo;accompagnement a-t-il eu lieu&nbsp;?</span>
        </div>
        <div className="responsiveSelect">
          <SelectCP/>
        </div>
      </div>
    </>
  );
}

export default CodePostal;
