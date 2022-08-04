import React from 'react';
import { useDispatch } from 'react-redux';
import { permanenceActions } from '../../../actions';

function Remerciement() {
  const dispatch = useDispatch();
  function closeModal() {
    dispatch(permanenceActions.suspensionFormulaire());
    dispatch(permanenceActions.closePermanence());
  }
  return (
    <dialog aria-labelledby="fr-modal-remerciement" role="dialog" id="fr-modal-remerciement" className="fr-modal modalOpened">
      <div className="fr-container">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-sm-10 fr-col-md-7 fr-modal__body modal-remerciement">
            <div className="fr-modal__content centre fr-mt-n4w">
              <h1 className="fr-modal__title">Merci !</h1>
              <div className="fr-mb-5w">
                <img className="conseillers-carte" src="logos/permanences/carthographie-avec-conseillers-fin.svg"/>
                <div className="remerciement-enregistrees fr-mt-4w">
                  <img className="enregistrees-check" src="logos/permanences/check.svg"/>
                  Vos informations ont &eacute;t&eacute; enregistr&eacute;es.
                </div>
                <div className="fr-mt-4w">
                  Une interface de gestion sera prochainement attribu&eacute;e &agrave; votre responsable via son espace Structure,
                  elle permettra d&rsquo;administrer les lieux d&rsquo;activit&eacute; Conseiller num&eacute;rique France Services cl&eacute;s en main.
                </div>
              </div>
              <div className="centre">
                <button className="fr-btn remerciement-btn" onClick={closeModal} >J&rsquo;ai compris</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default Remerciement;
