import React from 'react';

function SatisfactionBanner() {

  return (
    <div className="rf-container">
      <div className="rf-grid-row rf-grid-row--gutters">
        <div className="rf-col-8">
          L’équipe de conception de la plateforme Conseiller numérique France Services travaille en amélioration continue.
          Vous avez une idée, une réclamation, vous souhaitez exprimer un avis ? N’hésitez pas à nous contacter en cliquant sur le bouton ci-contre.
        </div>
        <div className="rf-col-4">
          <a className="rf-btn statistics-btn">Donner mon avis sur cette page</a>
        </div>

      </div>
    </div>
  );
}

export default SatisfactionBanner;
