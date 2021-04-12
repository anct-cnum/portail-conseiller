import React from 'react';
import SquareButton from './Components/SquareButton';

function Age() {

  return (
    <>
      <div className="rf-grid-row rf-grid-row--gutters rf-grid-row--middle rf-mb-7w">
        <div className="rf-col-xs-11 rf-col-sm-11 rf-col-md-2 questionResponsive">
          <span className="question">Catégorie d&rsquo;âge ou âge moyen du groupe</span>
        </div>
        <div className="responsiveSquare1">
          <SquareButton
            type="age"
            value="-12"
            label="-12 ans"/>
        </div>
        <div className="responsiveSquare2">
          <SquareButton
            type="age"
            value="12-18"
            label="12 - 18 ans"/>
        </div>
        <div className="responsiveSquare3">
          <SquareButton
            type="age"
            value="18-35"
            label="18 - 35 ans"/>
        </div>
        <div className="responsiveSquare4">
          <SquareButton
            type="age"
            value="35-60"
            label="35 - 60 ans"/>
        </div>
        <div className="responsiveSquare5">
          <SquareButton
            type="age"
            value="+60"
            label="Plus de 60 ans"/>
        </div>
      </div>
    </>
  );
}

export default Age;
