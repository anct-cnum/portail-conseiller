import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function ModalAdresseIntrouvable({ prefixId }) {

  const erreursFormulaire = useSelector(state => state.permanence?.errorsFormulaire?.errors);
  const erreurAdresse = erreursFormulaire?.filter(erreur => erreur?.[prefixId + 'location'])[0]?.[prefixId + 'location'] ||
      erreursFormulaire?.filter(erreur => erreur?.[prefixId + 'rueVoie'])[0]?.[prefixId + 'rueVoie'];
  const [modalOpen, setModalOpen] = useState(erreurAdresse);

  useEffect(() => {
    setModalOpen(erreurAdresse);
  }, [erreursFormulaire]);

  return (
    <>
      {modalOpen &&
      <dialog aria-labelledby="fr-modal-adresse-introuvable" role="dialog" id="fr-modal-adresse-introuvable" className="fr-modal modalOpened">
        <div className="fr-container">
          <div className="fr-grid-row fr-grid-row--center">
            <div className="fr-col-12 fr-col-sm-10 fr-col-md-7 fr-modal__body modal-adresse-introuvable">
              <button className="fr-btn annuler-btn adresse-btn" onClick={() => {
                setModalOpen(null);
              }} >Fermer</button>
              <div className="fr-modal__content">

                <div className="centre">
                  <h1 id="fr-modal-title-modal-adresse-introuvable" className="fr-modal__title">
                    Vous n&rsquo;avez s&eacute;lectionn&eacute; aucune adresse.
                  </h1>
                  <p>
                    Si votre adresse est introuvable, nous vous invitons &agrave; contacter le support.
                  </p>
                  <p className="fr-mb-3w">Vos donn&eacute;es saisies ne peuvent pas &ecirc;tre enregistr&eacute;es. </p>
                  <a className="adresse-introuvable-btn fr-px-8w fr-py-2w" href="mailto:conseiller-numerique@anct.gouv.fr">
                    Contactez-nous
                  </a>
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

ModalAdresseIntrouvable.propTypes = {
  prefixId: PropTypes.string,
};

export default ModalAdresseIntrouvable;
