import React from 'react';
import PropTypes from 'prop-types';
import { userActions } from '../../actions';
import { useDispatch } from 'react-redux';

const ModalResetPassword = ({ setShowModalResetPassword, hiddenEmail, username }) => {
  const dispatch = useDispatch();

  function handleSendEmail() {
    dispatch(userActions.forgottenPassword(username));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowModalResetPassword(false);
  }
  return (
    <dialog aria-labelledby="fr-modal-reset-password" role="dialog" id="fr-modal-reset-password" className="fr-modal modalOpened">
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                <button
                  className="fr-btn--close fr-btn"
                  title="Fermer la fenêtre modale"
                  aria-controls="fr-modal-1"
                  onClick={() => setShowModalResetPassword(false)}>
                  Fermer
                </button>
              </div>
              <div className="fr-modal__content">
                <h1 id="fr-modal-title-modal-1" className="fr-modal__title">
                  <span className="fr-icon-arrow-right-line fr-icon--lg"></span>
                  Vos mots de passe ont été réinitialisés
                </h1>
                <p>
                  Afin de respecter les nouvelles règles en matière de sécurité,
                  les mots de passe de votre bôite mail, votre compte mattermost ainsi que votre compte COOP ont étaient réinitialisés.
                  Vous allez recevoir un message sur votre adresse e-mail personnelle (celle qui
                  vous a servi à candidater au dispositif Conseiller numérique) qui vous permettra
                  de réinitialiser votre mot de passe.
                </p>
                <div className="fr-grid-row">
                  <span>Votre adresse e-mail personnelle&nbsp;:&nbsp;</span>
                  <strong style={{ textAlign: 'center', fontSize: '1.2rem' }}>{hiddenEmail}</strong>
                </div>
              </div>
              <div className="fr-modal__footer">
                <button className="fr-btn fr-ml-auto" onClick={handleSendEmail}>
                  Envoyer le lien
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

ModalResetPassword.propTypes = {
  setShowModalResetPassword: PropTypes.func,
  hiddenEmail: PropTypes.string,
  username: PropTypes.string,
};

export default ModalResetPassword;
