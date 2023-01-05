import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { mesInformationsActions } from '../actions/mesInformations.actions';

function ModalValidationContrat({ form, showModal, setShowModal, setDisabled }) {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const user = useSelector(state => state.authentication.user.user);
  const [password, setPassword] = useState('');
  function closeModal() {
    setShowModal(false);
    setDisabled(false);
  }
  function handleChange(e) {
    if (e?.target) {
      const { value } = e.target;
      setPassword(value);
    }
  }
  useEffect(() => {
    setActive(!!password);
  }, [password]);

  function handleSubmit() {
    dispatch(mesInformationsActions.updateContratActif({
      typeContrat: form?.typeContrat,
      dateDebut: form?.dateDebut,
      dateFin: form?.typeContrat !== 'CDI' ? form?.dateFin : null,
    }, conseiller?._id, user.name, password));
    closeModal();
    setDisabled(true);
  }
  return (
    <>
      {showModal &&
        <dialog aria-labelledby="fr-modal-validation-contrat" role="dialog" id="fr-modal-validation-contrat" className="fr-modal modalOpened">
          <div className="fr-container fr-container--fluid fr-container-md">
            <div className="fr-grid-row fr-grid-row--center">
              <div className="fr-col-11 fr-col-md-10 fr-col-lg-6">
                <div className="fr-modal__body">
                  <div className="fr-modal__header">
                    <button className="fr-link--close fr-link" title="Fermer la fenêtre" onClick={() => {
                      closeModal();
                    }}>Fermer</button>
                  </div>
                  <div className="fr-modal__content">
                    <h1 id="fr-modal-2-title" className="fr-modal__title">
                      <span className="fr-fi-arrow-right-line fr-fi--lg" aria-hidden="true"></span>
                      Je certifie que les informations saisies sont conformes &agrave; celle contenues dans mon contrat de travail.<br/>
                    </h1>
                    <p className="important">Attention il ne sera plus possible d&rsquo;&eacute;diter ces informations par la suite !</p>
                    <div className="fr-col-6">
                      <label htmlFor="password">Votre mot de passe :</label>
                      <input type="password" className="fr-input fr-mt-1w" name="password" id="password" onChange={handleChange} />
                    </div>
                  </div>
                  <div className="fr-modal__footer">
                    <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg fr-btns-group--icon-left">
                      <li>
                        <button className="fr-btn" onClick={handleSubmit} disabled={!active}>
                          Confirmer
                        </button>
                      </li>
                      <li>
                        <button className="fr-btn" onClick={() => {
                          closeModal();
                        }}>
                          Annuler
                        </button>
                      </li>
                    </ul>
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

ModalValidationContrat.propTypes = {
  form: PropTypes.object,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  setDisabled: PropTypes.func,
};

export default ModalValidationContrat;
