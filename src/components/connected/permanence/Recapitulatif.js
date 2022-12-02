import React from 'react';
import PropTypes from 'prop-types';

function Recapitulatif({ nomStructure, siret, adresseStructure }) {
  const numeroRue = adresseStructure?.numeroRue ?? '';
  const numeroVoie = adresseStructure?.numero_voie ?? '';

  return (

    <div className="fr-col-offset-1 fr-col-11">
      <h2 className="sous-titre">
        Votre structure d&rsquo;accueil
        <span className="baseline fr-mb-6w fr-mt-1w">Il s&rsquo;agit de votre employeur</span>
      </h2>

      <p style={{ marginBottom: '0px' }}>
        <span className="nom-structure fr-mb-4w">{nomStructure}</span>
        <span className="libelle-adresse fr-mr-5w">Adresse</span>
        <span className="info-adresse">
          {adresseStructure?.numeroRue ?
            numeroRue + ' ' + adresseStructure?.rue :
            numeroVoie + ' ' + adresseStructure?.type_voie + ' ' + adresseStructure?.nom_voie}
        </span>
        <br/>
        <span className="libelle-adresse fr-mr-5w">Code Postal</span>
        <span className="info-adresse">
          {adresseStructure?.codePostal ?? adresseStructure?.code_postal}
        </span>
        <br/>
        <span className="libelle-adresse fr-mr-5w">Ville</span>
        <span className="info-adresse">
          {adresseStructure?.ville ?? adresseStructure?.localite}
        </span>
        <br/>
        <span className="libelle-adresse fr-mr-5w">N° de siret</span>
        <span>
          {siret}
        </span>
      </p>
    </div>
  );
}

Recapitulatif.propTypes = {
  nomStructure: PropTypes.string,
  siret: PropTypes.string,
  adresseStructure: PropTypes.object
};

export default Recapitulatif;
