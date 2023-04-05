import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function ModalAdresseIntrouvable({ prefixId }) {

  const erreursFormulaire = useSelector(state => state.permanence.errorsFormulaire?.errors);
  const erreurAdresse = erreursFormulaire?.filter(erreur => erreur?.[prefixId + 'location'])[0]?.[prefixId + 'location'] ||
      erreursFormulaire?.filter(erreur => erreur?.[prefixId + 'rueVoie'])[0]?.[prefixId + 'rueVoie'];

  const handleSubmit = () => {
    location.reload();
    window.open(process.env.REACT_APP_CRISP_URL + '=' + process.env.REACT_APP_CRISP_ID, '_blank', 'noopener noreferrer');
  };

  return (
    <>
      {erreurAdresse &&
      <dialog aria-labelledby="fr-modal-adresse-introuvable" role="dialog" id="fr-modal-adresse-introuvable" className="fr-modal modalOpened">
        <div className="fr-container">
          <div className="fr-grid-row fr-grid-row--center">
            <div className="fr-col-12 fr-col-sm-10 fr-col-md-7 fr-modal__body modal-adresse-introuvable">
              <div className="fr-modal__content">
                <div className="centre">
                  <h1 id="fr-modal-title-modal-adresse-introuvable" className="fr-modal__title">
                    D&eacute;sol&eacute;, votre adresse est introuvable.
                  </h1>
                  <p>
                  Vous n&rsquo;avez s&eacute;lectionn&eacute; aucune adresse. Si votre adresse est introuvable, nous vous invitons &agrave;&nbsp;
                  contacter le support.
                  </p>
                  <p>Vos donn&eacute;es saisies ne peuvent pas &ecirc;tre enregistr&eacute;es. </p>
                  <button className="adresse-introuvable-btn" title="Lien vers l&rsquo;aide crisp" onClick={handleSubmit}>contactez-nous</button>
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
