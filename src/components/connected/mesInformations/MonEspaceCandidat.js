import React from 'react';
import Footer from '../../Footer';

function MonEspaceCandidat() {
  const erreur = null;
  const cpVille = null;

  const handleChange = () => {

  };
  
  const handleSubmit = () => {

  };

  return (
    <>
      <div className="mes-informations">
        <div className="fr-container">
          <div className="fr-grid-row">
            <div className="fr-col-12">
              <h1 className="titre fr-mt-10w fr-mb-6w">Mon espace candidat</h1>
              <p className="paragraphe fr-mb-6w">
                Cette page vous permet de modifier vos informations de candidature et de vous d&eacute;clarer disponible afin de
                vous mettre en visibilit&eacute; des structures qui recrutent.
              </p>
            </div>

            <div className="fr-col-12">
              {/** Emplacement Disponibilité */}
              <hr className="fr-my-6w"/>
            </div>

            <div className="fr-col-12 fr-col-md-5">
              <h2 className="sous-titre fr-mb-6w">Ma disponibilit&eacute; g&eacute;ographique</h2>

              <div className={`fr-input-group ${erreur ? 'fr-input-group--error' : 'fr-mb-5w'}`}>
                <label className="fr-label" htmlFor="nom">
                  Nom ou code postal <span className="important">*</span>
                </label>
                <input
                  className={`fr-input ${erreur ? 'fr-input--error' : ''}`}
                  aria-describedby="text-input-error-desc-error"
                  type="text"
                  id="nom"
                  name="nom"
                  value={cpVille}
                  onChange={handleChange}
                />
                {erreur &&
                  <p id="text-input-error-desc-error" className="fr-error-text">
                    {erreur}
                  </p>
                }
              </div>

              <div>
                Depuis ce lieu, pour une mission de conseiller num&eacute;rique,
                je suis pr&ecirc;t(e) &agrave; me d&eacute;placer &agrave; : <span className="important">*</span>
              </div>

              <button className="form-button fr-btn fr-mb-4w" onClick={handleSubmit}>
                Enregistrer
              </button>
            </div>

            <div className="fr-col-12 fr-col-offset-md-1 fr-col-md-5">
              {/** Emplacement CV */}
            </div>

            <div className="fr-col-12">
              <hr/>
              {/** Emplacement PIX */}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
MonEspaceCandidat.propTypes = {

};

export default MonEspaceCandidat;
