import React from 'react';
import PropTypes from 'prop-types';

function Recapitulatif({ nomStructure, siret, adresseStructure }) {

  return (
    <>
      <h2 className="sous-titre rf-mb-4w">{nomStructure}</h2>
      <p className="rf-mb-5w">
        <span className="libelle-adresse rf-mr-3w">Adresse</span>
        <span className="info-adresse">
          {adresseStructure?.numeroRue ?
            adresseStructure?.numeroRue + ' ' + adresseStructure?.rue :
            adresseStructure?.numero_voie + ' ' + adresseStructure?.type_voie + ' ' + adresseStructure?.nom_voie}
        </span>
        <br/>
        <span className="libelle-adresse rf-mr-3w">Code Postal</span>
        <span className="info-adresse">
          {adresseStructure?.codePostal ?? adresseStructure?.code_postal}
        </span>
        <br/>
        <span className="libelle-adresse rf-mr-3w">Ville</span>
        <span className="info-adresse">
          {adresseStructure?.ville ?? adresseStructure?.localite}
        </span>
        <br/>
        <span className="libelle-adresse rf-mr-3w">N° de siret</span>
        <span>
          {siret}
        </span>
      </p>
    </>
  );
}

Recapitulatif.propTypes = {
  nomStructure: PropTypes.string,
  siret: PropTypes.string,
  adresseStructure: PropTypes.object
};

export default Recapitulatif;
