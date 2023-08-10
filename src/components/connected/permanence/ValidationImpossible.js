import React from 'react';
import PropTypes from 'prop-types';
import ModalAdresseExistante from './Components/ModalAdresseExistante';

function ValidationImpossible({ statut }) {

  return (
    <>
      <ModalAdresseExistante/>
      <div className="fr-col-offset-1 fr-col-4">
        <button className="fr-link fr-fi-external-link-line fr-link--icon-right invalid-btn" disabled>
          Enregistrer et voir la carte nationale
        </button>
        <div className="fr-mb-12w fr-mt-4w">
          ( <span className="obligatoire">*</span> ) champs obligatoires
        </div>
      </div>

      <div className="fr-col-5">
        <button className="fr-btn fr-mb-4w invalid-btn" disabled>
        Enregistrer&nbsp;
          {
            statut === 'update' && <>les modifications</>
          }
          et revenir &agrave;&nbsp;
          {statut === null && <>l&rsquo;accueil</>}
          {statut !== null && <>la liste</>}
        </button>
      </div>
    </>
  );
}

ValidationImpossible.propTypes = {
  statut: PropTypes.string,
};

export default ValidationImpossible;
