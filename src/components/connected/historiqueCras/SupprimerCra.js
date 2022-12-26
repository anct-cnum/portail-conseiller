import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { craActions } from '../../../actions';
import PropTypes from 'prop-types';

function ConfirmationSuppressionCra({ cra }) {
  const dispatch = useDispatch();
  const [modalOpenClose, setModalOpenClose] = useState(false);

  const deleteCra = id => {
    dispatch(craActions.deleteCra(id));
  };
  return (
    <>
      <button className="delete-cra" onClick={() => {
        setModalOpenClose(true);
      }}>
        <i className="ri-delete-bin-line ri-xl"></i>
      </button>
      {modalOpenClose &&
        <dialog aria-labelledby="fr-modal-suppression_cra" role="dialog" id="fr-modal-suppression-cra" className="fr-modal modalOpened">
          <div className="fr-container">
            <div className="fr-grid-row fr-grid-row--center">
              <div className="fr-col-12 fr-col-sm-10 fr-col-md-7 fr-modal__body modal-suppression">
                <div className="fr-modal__content centre fr-mt-n2w">
                  <h1 className="fr-modal__title fr-mb-6w">Suppression du compte rendu d&rsquo;activit&eacute;</h1>
                  <div className="centre">
                    <div>
                      &Ecirc;tes-vous s&ucirc;r de vouloir supprimer ce compte-rendu d&rsquo;activité ? Ceci affectera vos statistiques.
                    </div>
                    <div className="fr-mt-3w">
                      <button className="fr-btn annuler-btn " onClick={() => {
                        setModalOpenClose(false);
                      }} >
                        Annuler
                      </button>
                      <button className="fr-btn suppression-cra" onClick={() => {
                        deleteCra(cra?._id);
                      }} >
                        Supprimer
                      </button>

                    </div>
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

ConfirmationSuppressionCra.propTypes = {
  cra: PropTypes.object
};

export default ConfirmationSuppressionCra;
