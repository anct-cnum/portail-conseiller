import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { permanenceActions } from '../../../actions';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tooltip';
import Pluralize from 'react-pluralize';

function SupprimerPermanence({ permanence, isDisabled, count }) {
  const dispatch = useDispatch();
  const [modalOpenClose, setModalOpenClose] = useState(false);

  const deletePermanence = idPermanence => {
    dispatch(permanenceActions.deletePermanence(idPermanence));
    dispatch(permanenceActions.reloadList(true));
    setModalOpenClose(false);
  };
  const deleteConseillerPermanence = idPermanence => {
    dispatch(permanenceActions.deleteConseillerPermanence(idPermanence));
    dispatch(permanenceActions.reloadList(true));
    setModalOpenClose(false);
  };

  return (
    <>
      { isDisabled &&
        <button className="fr-btn supprimer-btn disabled-btn"
          disabled={true} data-tooltip-id="infobulle-menu"
          data-tooltip-html="Ne peut pas &ecirc;tre supprimer si c&rsquo;est votre lieu principal d&rsquo;activit&eacute;"
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
      <Tooltip className="infobulle" id="infobulle-menu" arrowColor="white"/>

      {modalOpenClose &&
        <dialog aria-labelledby="fr-modal-suppression" role="dialog" id="fr-modal-suppression" className="fr-modal modalOpened">
          <div className="fr-container">
            <div className="fr-grid-row fr-grid-row--center">
              <div className="fr-col-12 fr-col-sm-10 fr-col-md-7 fr-modal__body modal-suppression">
                <div className="fr-modal__content centre fr-mt-n2w">
                  <h1 className="fr-modal__title fr-mb-6w">Suppression du lieu d’activité</h1>
                  <div className="centre">
                    {count > 0 &&
                      <div className="fr-mb-5w">
                        (*)&nbsp;Ce lieu comporte&nbsp;
                        <Pluralize
                          singular={`compte rendu d'activité`}
                          plural={`comptes rendus d'activités`}
                          count={count}
                          showCount={true} />. La suppression
                        impliquera &eacute;galement une suppression de la permanence dans les CRAs.
                      </div>
                    }
                    <div className="fr-mb-5w">
                      <button className="fr-btn annuler-btn " onClick={() => {
                        setModalOpenClose(false);
                      }} >Annuler</button>
                    </div>
                    <div className="fr-mb-3w">
                      <button className="fr-btn suppression-btn" onClick={() => {
                        deleteConseillerPermanence(permanence?._id);
                      }} >Masquer les informations du lieu engistr&eacute;es</button>
                    </div>
                    <div className="fr-mb-6w">
                      Si vous &ecirc;tes la seule personne assign&eacute;e &agrave; ce lieu, ce dernier ne sera plus affich&eacute; sur la carte nationale.
                      Si vous &ecirc;tes plusieurs, votre nom ne sera plus affich&eacute;. Vous pourrez à nouveau s&eacute;lectionner ce lieu
                      d&rsquo;activit&eacute; dans les &eacute;l&eacute;ments pr&eacute;-enregistr&eacute;s.
                    </div>

                    {permanence?.conseillers?.length === 1}
                    <button className="fr-btn suppression-definitive" onClick={() => {
                      deletePermanence(permanence?._id);
                    }} >Supprimer d&eacute;finitivement</button>
                    <div className="fr-mt-3w">
                    Les informations seront d&eacute;finitivement supprim&eacute;es de la base de donn&eacute;es. Cette action est irr&eacute;versible.
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
  count: PropTypes.number,
};

export default SupprimerPermanence;
