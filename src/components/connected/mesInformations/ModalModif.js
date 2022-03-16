import React, { useState } from 'react';
import FlashMessage from 'react-flash-message';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

function modalUpdateForm({ conseiller }) {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    errorInputs: false,
    password: ''
  });
  function handleChange(e) {
    if (e?.target) {
      const { name, value } = e.target;
      setInputs(inputs => ({ ...inputs, [name]: value }));
    }
  }
  function handleSubmit() {

  }
  return (
    <>
      <dialog aria-labelledby="rf-modal-supprimer-candidat" role="dialog" id="rf-modal-supprimer-candidat" className="rf-modal modalOpened">
        <div className="rf-container rf-container--fluid rf-container-md">
          <div className="rf-grid-row rf-grid-row--center">
            <div className="rf-col-11 rf-col-md-10 rf-col-lg-6">
              <div className="rf-modal__body">
                <div className="rf-modal__header">
                  <button className="rf-link--close rf-link" title="Fermer la fenêtre" onClick={() => {
                    setActive(false);
                  }}>Fermer</button>
                </div>
                <div className="rf-modal__content">
                  <div className="rf-col-6">
                    <label htmlFor="password">Votre mot de passe :</label>
                    <input type="password" className="rf-input rf-mt-1w" name="password" id="password" onChange={handleChange} />
                  </div>
                  <div className="rf-mt-7w">
                    <button className="rf-btn rf-col-5" style={{ paddingLeft: '15%' }} onClick={() => {
                      setActive(false);
                    }}>Annuler</button>
                    <button className={active ? 'red-btn rf-col-offset-2 rf-col-5 ' : 'desactiver-btn rf-col-offset-2 rf-col-5'}
                      disabled={!active} onClick={handleSubmit}>
                      Supprimer mes informations
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

modalUpdateForm.propTypes = {
  conseiller: PropTypes.object
};

export default modalUpdateForm;
