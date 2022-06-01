import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { permanenceActions } from '../../../actions';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

function SupprimerPermanence({ permanence, isDisabled }) {
  const dispatch = useDispatch();

  const [modalOpenClose, setModalOpenClose] = useState(false);

  const deletePermanence = idPermanence => {
    dispatch(permanenceActions.deletePermanence(idPermanence));
    setModalOpenClose(false);
  };
  const deleteConseillerPermanence = idPermanence => {
    dispatch(permanenceActions.deleteConseillerPermanence(idPermanence));
    setModalOpenClose(false);
  };

  return (
    <>
      { isDisabled &&
        <button className="rf-btn supprimer-btn disabled-btn"
          disabled={true} data-tip="Ne peut pas être supprimer si c'est votre lieu principal d'activité"
          onClick={() => {
            setModalOpenClose(false);
          }}>
            Supprimer
        </button>
      }
      { !isDisabled &&
        <button className="supprimer-btn"
          onClick={() => {
            setModalOpenClose(true);
          }}>
            Supprimer
        </button>
      }
      <ReactTooltip html={true} className="infobulle" arrowColor="white"/>

      {modalOpenClose &&
        <dialog aria-labelledby="rf-modal-suppression" role="dialog" id="rf-modal-suppression" className="rf-modal modalOpened">
          <div className="rf-container">
            <div className="rf-grid-row rf-grid-row--center">
              <div className="rf-col-12 rf-col-sm-10 rf-col-md-7 rf-modal__body modal-suppression">
                <div className="rf-modal__content centre rf-mt-n2w">
                  <h1 className="rf-modal__title rf-mb-6w">Suppression du lieu d’activité</h1>
                  <div className="centre">
                    <div className="rf-mb-5w">
                      <button className="rf-btn annuler-btn " onClick={() => {
                        setModalOpenClose(false);
                      }} >Annuler</button>
                    </div>
                    <div className="rf-mb-3w">
                      <button className="rf-btn suppression-btn" onClick={() => {
                        deleteConseillerPermanence(permanence._id);
                      }} >Masquer les informations du lieu engistr&eacute;es</button>
                    </div>
                    <div className="rf-mb-6w">
                      Si vous &ecirc;tes la seule personne assign&eacute;e &agrave; ce lieu, ce dernier ne sera plus affich&eacute; sur la carte nationale.
                      Si vous &ecirc;tes plusieurs, votre nom ne sera plus affich&eacute;. Vous pourrez à nouveau s&eacute;lectionner ce lieu
                      d&rsquo;activit&eacute; dans les &eacute;l&eacute;ments pr&eacute;-enregistr&eacute;s.
                    </div>

                    {permanence?.conseillers.length === 1}
                    <button className="rf-btn suppression-definitive" onClick={() => {
                      deletePermanence(permanence._id);
                    }} >Supprimer d&eacute;finitivement</button>
                    <div className="rf-mt-3w">
                    Les informations seront d&eacute;finitivement supprim&eacute;es de la base de donn&eacute;es.Cette action est irr&eacute;versible.
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

SupprimerPermanence.propTypes = {
  permanence: PropTypes.object,
  isDisabled: PropTypes.bool,
};

export default SupprimerPermanence;
