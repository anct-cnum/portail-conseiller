import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { userActions } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

const ModalVerifyCode = ({ setShowModalVerifyCode, email }) => {
  const dispatch = useDispatch();
  const [code, setCode] = useState('');
  const authentication = useSelector(state => state.authentication);
  function handleSendCode() {
    dispatch(userActions.verifyCode(code, email));
  }

  function handleChange(e) {
    const { value } = e.target;
    setCode(value);
  }

  useEffect(() => {
    if (authentication.codeVerified) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setShowModalVerifyCode(false);
    }
  }, [authentication]);


  return (
    <dialog aria-labelledby="fr-modal-reset-password" role="dialog" id="fr-modal-reset-password" className="fr-modal modalOpened">
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
            <div className="fr-modal__body">
              <div className="fr-modal__header">
              </div>
              <div className="fr-modal__content">
                <h1 id="fr-modal-title-modal-1" className="fr-modal__title">
                  <span className="fr-icon-arrow-right-line fr-icon--lg"></span>
                  V&eacute;rification du compte conseiller
                </h1>
                <p>
                  Conform&eacute;ment aux nouvelles r&egrave;gles de s&eacute;curit&eacute;
                  des mots de passe impos&eacute;es par la CNIL, un code de v&eacute;rification
                  vous a &eacute;t&eacute; envoy&eacute; sur votre adresse email de connexion.
                  Merci de le renseigner ici.
                </p>

                <div className="fr-grid-row fr-mt-3w">
                  <label className="fr-label code" htmlFor="code">Code de v&eacute;rification</label>
                  <input
                    id="code"
                    name="code"
                    type="number"
                    value={code}
                    onChange={handleChange}
                    className={`fr-input fr-input-custom`} />
                </div>
              </div>
              <div className="fr-modal__footer">
                <button className="fr-btn fr-ml-auto" onClick={handleSendCode}>
                  V&eacute;rifier le code
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

ModalVerifyCode.propTypes = {
  setShowModalVerifyCode: PropTypes.func,
  email: PropTypes.string
};

export default ModalVerifyCode;
