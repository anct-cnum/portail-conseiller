import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function ModalAdresseExistante() {

  const existsPermanence = useSelector(state => state.permanence?.existsPermanence);
  const [modalOpen, setModalOpen] = useState(existsPermanence);

  useEffect(() => {
    setModalOpen(existsPermanence);
  }, [existsPermanence]);

  return (
    <>
      {modalOpen &&
      <dialog aria-labelledby="fr-modal-adresse-existante" role="dialog" id="fr-modal-adresse-existante" className="fr-modal modalOpened">
        <div className="fr-container">
          <div className="fr-grid-row fr-grid-row--center">
            <div className="fr-col-12 fr-col-sm-10 fr-col-md-7 fr-modal__body modal-adresse-existante">
              <button className="fr-btn annuler-btn adresse-btn" onClick={() => {
                setModalOpen(null);
              }} >Fermer</button>
              <div className="fr-modal__content">

                <div className="centre">
                  <h1 id="fr-modal-title-modal-adresse-existante" className="fr-modal__title">
                    L&rsquo;adresse que vous avez renseigner existe d&eacute;j&agrave; !
                  </h1>
                  <p>
                    Dans un souci de coh&eacute;rence de donn&eacute;es de la cartographie, il ne peut y avoir plusieurs permanences avec la m&ecirc;me adresse.
                  </p>
                  <p>Merci de renseigner une nouvelle adresse ou de vous ajouter sur le lieu existant. </p>
                  <button className="adresse-existante-btn" title="Fermer" onClick={() => {
                    setModalOpen(null);
                  }}>Fermer</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
      }
    </>
  );
}

export default ModalAdresseExistante;
