import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { userActions } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

const ModalVerifyCode = ({ setShowModalVerifyCode, email }) => {
  const dispatch = useDispatch();
  const [code, setCode] = useState('');
  const messageCodeVerified = useSelector(state => state.authentication?.messageCodeVerified);
  const errorVerifyingCode = useSelector(state => state.authentication?.errorVerifyingCode);

  function handleSendCode() {
    dispatch(userActions.verifyCode(code, email));
  }

  function handleChange(e) {
    setCode(e.target?.value);
  }

  useEffect(() => {
    if (messageCodeVerified) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setShowModalVerifyCode(false);
    }
  }, [messageCodeVerified]);

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
                  V&eacute;rification de votre compte conseiller
                </h1>
                <p>
                  Votre compte a &eacute;t&eacute; verrouill&eacute; par mesure de s&eacute;curit&eacute;.<br/>
                  <b>Pour d&eacute;verrouiller votre compte</b>&nbsp;:<br/>
                  Nous vous avons envoy&eacute; un code de s&eacute;curit&eacute; &agrave; l&rsquo;adresse mail personnelle que vous avez
                  renseign&eacute;e lors de votre inscription.<br/>
                  Une fois que vous aurez entr&eacute; le code, vous pourrez de nouveau acc&eacute;der &agrave; votre compte.
                </p>

                <div className="fr-grid-row fr-mt-3w">
                  <label className={`fr-label code ${errorVerifyingCode ? 'invalid' : ''}`} htmlFor="code">
                    Code de v&eacute;rification
                  </label>
                  <input
                    id="code"
                    name="code"
                    type="number"
                    value={code}
                    onChange={handleChange}
                    className={`fr-input fr-input-custom ${errorVerifyingCode ? ' fr-input--error' : ''}`} />
                  {errorVerifyingCode &&
                    <div className="invalid">{errorVerifyingCode}</div>
                  }
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
