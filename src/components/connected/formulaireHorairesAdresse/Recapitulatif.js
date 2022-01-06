import React from 'react';
import PropTypes from 'prop-types';

function Recapitulatif({ structure, adresseStructure }) {
  return (
    <>
      <h2 className="sous-titre rf-mb-4w">{structure?.nom}</h2>
      <p className="rf-mb-5w">
        <span className="libelle-adresse rf-mr-3w">Adresse</span>
        <span className="info-adresse">
          {adresseStructure?.numero_voie + ' ' + adresseStructure?.type_voie + ' ' + adresseStructure?.nom_voie}
        </span>
        <br/>
        <span className="libelle-adresse rf-mr-3w">Code Postal</span>
        <span className="info-adresse">
          {adresseStructure?.code_postal}
        </span>
        <br/>
        <span className="libelle-adresse rf-mr-3w">Ville</span>
        <span className="info-adresse">
          {adresseStructure?.localite}
        </span>
        <br/>
        <span className="libelle-adresse rf-mr-3w">N° de siret</span>
        <span>
          {structure?.insee?.entreprise.siret_siege_social}
        </span>
      </p>
    </>
  );
}

Recapitulatif.propTypes = {
  structure: PropTypes.object,
  adresseStructure: PropTypes.object
};

export default Recapitulatif;
