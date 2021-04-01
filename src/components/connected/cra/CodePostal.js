import React from 'react';
import SelectCP from './Components/SelectCP';

function CodePostal() {

  return (
    <>
      <div className="rf-grid-row rf-grid-row--gutters rf-grid-row--middle rf-mb-7w">
        <div className="rf-col-1"></div>
        <div className="rf-col-xs-10 rf-col-sm-10 rf-col-md-2">
          <span className="question">Où l&rsquo;accompagnement a-t-il eu lieu ?</span>
        </div>
        <div className="responsiveSelect">
          <SelectCP/>
        </div>
      </div>
    </>
  );
}

export default CodePostal;
