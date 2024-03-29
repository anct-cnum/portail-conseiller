import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { formSupHierarchiqueActions } from '../../../actions/supHierarchique.actions';
import { formInformationsActions } from '../../../actions/informations.actions';
import { formatTelephone } from '../../../utils/functionFormats';
import { candidatActions } from '../../../actions';

function ModalUpdateForm({ form, showModal, setShowModal, formOrigin }) {
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
    if (formOrigin === 'superieurHierarchique') {
      dispatch(formSupHierarchiqueActions.createSupHierarchique({
        numeroTelephone: formatTelephone(form.numeroTelephone, conseiller?.codeDepartement),
        email: form.email.trim(),
        nom: form.nom.trim(),
        prenom: form.prenom.trim(),
        fonction: form.fonction.trim()
      }, conseiller?._id, user.name, password));
    } else if (formOrigin === 'informations') {
      dispatch(formInformationsActions.updateInformations({
        telephone: formatTelephone(form?.telephone, conseiller?.codeDepartement),
        telephonePro: formatTelephone(form?.telephonePro, conseiller?.codeDepartement),
        emailPro: form.emailPro?.trim(),
        email: form.email.trim(),
        dateDeNaissance: form.dateDeNaissance,
        sexe: form.sexe
      }, conseiller?._id, user.name, password));
    } else if (formOrigin === 'espaceCandidat') {
      dispatch(candidatActions.updateCandidat({
        codeCommune: form.codeCommune.trim(),
        codePostal: form.codePostal.trim(),
        ville: form.ville.trim(),
        location: form.location,
        distanceMax: form.distance,
      },
      conseiller?._id, user.name, password));
    }

    closeModal();
  }
  return (
    <>
      {showModal &&
        <dialog aria-labelledby="fr-modal-supprimer-candidat" role="dialog" id="fr-modal-supprimer-candidat" className="fr-modal modalOpened">
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
                      Pour confirmer vos modifications, merci de saisir votre mot de passe associ&eacute; &agrave; votre espace COOP
                    </h1>
                    <div className="fr-col-6">
                      <label htmlFor="password">Votre mot de passe<span className="obligatoire">&nbsp;*</span></label>
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

ModalUpdateForm.propTypes = {
  form: PropTypes.object,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  formOrigin: PropTypes.string
};

export default ModalUpdateForm;
