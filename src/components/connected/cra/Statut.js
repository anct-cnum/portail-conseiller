import React from 'react';
import SquareButton from './Components/SquareButton';

function Statut() {

  return (
    <>
      <div className="rf-grid-row rf-grid-row--gutters rf-grid-row--middle rf-mb-7w">
        <div className="rf-col-xs-11 rf-col-sm-11 rf-col-md-2 questionResponsive">
          <span className="question">Statut</span>
        </div>
        <div className="responsiveSquare1">
          <SquareButton
            type="statut"
            value="etudiant"
            label="&Eacute;tudiant(e)"/>
        </div>
        <div className="responsiveSquare2">
          <SquareButton
            type="statut"
            value="sans emploi"
            label="Sans emploi"/>
        </div>
        <div className="responsiveSquare3">
          <SquareButton
            type="statut"
            value="en emploi"
            label="En emploi"/>
        </div>
        <div className="responsiveSquare4">
          <SquareButton
            type="statut"
            value="retraite"
            label="Retraité"/>
        </div>
        <div className="responsiveSquare5">
          <SquareButton
            type="statut"
            value="heterogene"
            label="Non renseigné ou hétérogène"/>
        </div>
      </div>
    </>
  );
}

export default Statut;
