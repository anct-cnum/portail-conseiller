import React from 'react';
import { useDispatch } from 'react-redux';
import { permanenceActions } from '../../../actions';

function Remerciement() {
  const dispatch = useDispatch();
  function closeModal() {
    dispatch(permanenceActions.closePermanence());
  }
  return (
    <dialog aria-labelledby="rf-modal-remerciement" role="dialog" id="rf-modal-remerciement" className="rf-modal modalOpened">
      <div className="rf-container">
        <div className="rf-grid-row rf-grid-row--center">
          <div className="rf-col-12 rf-col-sm-10 rf-col-md-7 rf-modal__body modal-remerciement">
            <div className="rf-modal__content centre">
              <h1 className="rf-modal__title">Merci !</h1>
              <div className="rf-mb-6w">
                <img className="conseillers-carte" src="logos/permanences/carthographie-avec-conseillers-fin.svg"/>
                <div className="remerciement-enregistrees rf-mt-3w">
                  <img className="enregistrees-check" src="logos/permanences/check.svg"/>
                  Vos informations ont été enregistrées.
                </div>
                <div className="rf-mt-3w">
                  Une interface de gestion sera prochainement attribu&eacute;e &agrave; votre responsable via son espace Structure,
                  elle permettra d&rsquo;administrer les lieux d&rsquo;activit&eacute; Conseiller num&eacute;rique France Services cl&eacute;s en main.
                </div>
                <div className="rf-mt-3w rf-mb-5w">
                  &Agrave; terme, un outil similaire sera mis &agrave; votre disposition sur la Coop. En outre, une version enrichie du formulaire vous
                  permettra de renseigner vos lieux d&rsquo;activit&eacute;s de mani&egrave;re plus pr&eacute;cise, et ainsi d&rsquo;&ecirc;tre mieux
                  identifi&eacute; par vos usagers.
                </div>

              </div>
              <div className="centre">
                <button className="rf-btn remerciement-btn" onClick={closeModal} >J&rsquo;ai compris</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default Remerciement;
