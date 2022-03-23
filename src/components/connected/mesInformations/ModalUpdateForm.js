import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { formSupHierarchiqueActions } from '../../../actions/supHierarchique.actions';
import { formInfoPersonnelActions } from '../../../actions/infoPersonnel.actions';

function ModalUpdateForm({ form, showModal, setShowModal, isSupHierarchique = false }) {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const user = useSelector(state => state.authentication.user.user);
  const [password, setPassword] = useState('');
  function closeModal() {
    setShowModal(false);
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
    if (isSupHierarchique) {
      dispatch(formSupHierarchiqueActions.createSupHierarchique({
        numeroTelephone: form.numeroTelephone,
        email: form.email.trim(),
        nom: form.nom.trim(),
        prenom: form.prenom.trim(),
        fonction: form.fonction.trim()
      }, conseiller._id, user.name, password));
    } else {
      dispatch(formInfoPersonnelActions.updateInfoPersonnel({
        telephone: form.telephone,
        telephonePro: form.telephonePro,
        email: form.email.trim(),
        dateDeNaissance: form.dateDeNaissance,
        sexe: form.sexe
      }, conseiller._id, user.name, password));
    }

    closeModal();
  }
  return (
    <>
      {showModal &&
        <dialog aria-labelledby="rf-modal-supprimer-candidat" role="dialog" id="rf-modal-supprimer-candidat" className="rf-modal modalOpened">
          <div className="rf-container rf-container--fluid rf-container-md">
            <div className="rf-grid-row rf-grid-row--center">
              <div className="rf-col-11 rf-col-md-10 rf-col-lg-6">
                <div className="rf-modal__body">
                  <div className="rf-modal__header">
                    <button className="rf-link--close rf-link" title="Fermer la fenêtre" onClick={() => {
                      closeModal();
                    }}>Fermer</button>
                  </div>
                  <div className="rf-modal__content">
                    <h1 id="rf-modal-2-title" className="rf-modal__title">
                      <span className="rf-fi-arrow-right-line rf-fi--lg" aria-hidden="true"></span>
                      Confirmation de modifications
                    </h1>
                    <div className="rf-col-6">
                      <label htmlFor="password">Votre mot de passe :</label>
                      <input type="password" className="rf-input rf-mt-1w" name="password" id="password" onChange={handleChange} />
                    </div>
                  </div>
                  <div className="rf-modal__footer">
                    <ul className="rf-btns-group rf-btns-group--right rf-btns-group--inline-reverse rf-btns-group--inline-lg rf-btns-group--icon-left">
                      <li>
                        <button className="rf-btn" onClick={handleSubmit} disabled={!active}>
                          Modifier
                        </button>
                      </li>
                      <li>
                        <button className="rf-btn" onClick={() => {
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

ModalUpdateForm.propTypes = {
  form: PropTypes.object,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  isSupHierarchique: PropTypes.bool
};

export default ModalUpdateForm;
