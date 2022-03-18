import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { formInfoPersonnelActions } from '../../../actions/infoPersonnel.actions';
import ModalUpdateForm from './ModalUpdateForm';

function FormulaireInfosPersonnelles() {
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const erreursFormulaire = useSelector(state => state.formulaireInfoPersonnel?.errorsFormulaire);
  const erreurNumeroTelephone = erreursFormulaire?.errors?.filter(erreur => erreur?.telephone)[0]?.telephone;
  const erreurNumeroTelephonePro = erreursFormulaire?.errors?.filter(erreur => erreur?.telephonePro)[0]?.telephonePro;
  const erreurEmailPerso = erreursFormulaire?.errors?.filter(erreur => erreur?.email)[0]?.email;
  const form = useSelector(state => state.formulaireInfoPersonnel);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    telephone: '',
    telephonePro: '',
    email: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { telephone, telephonePro, email } = inputs;

  useEffect(() => {
    if (erreursFormulaire?.lengthError === 0 && submitted) {
      setShowModal(true);
      window.scrollTo(0, 0);
    }
    setSubmitted(false);
  }, [erreursFormulaire]);
  useEffect(() => {
    if (conseiller !== null && conseiller !== undefined) {
      dispatch(formInfoPersonnelActions.initFormInfoPersonnel(conseiller.email, conseiller.telephone, conseiller.telephonePro));
      setInputs({
        telephone: conseiller.telephone,
        telephonePro: conseiller.telephonePro,
        email: conseiller.email,
      });
    }
  }, [conseiller]);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
    dispatch(formInfoPersonnelActions.updateField(name, value));
  }

  function handleSubmit() {
    setSubmitted(true);
    dispatch(formInfoPersonnelActions.verifyFormulaire(form));
  }
  function calcAge(birthDate) {
    const now = dayjs();
    const yearDiff = now.diff(birthDate, 'years');

    return yearDiff;
  }
  return (
    <>
      <ModalUpdateForm form={form} showModal={showModal} setShowModal={setShowModal} />
      <div className="rf-input-group rf-mb-5w">
        <label className="rf-label" htmlFor="prenom">
          Pr&eacute;nom
        </label>
        <input
          className="rf-input"
          aria-describedby="text-input-error-desc-error"
          type="text"
          id="prenom"
          name="prenom"
          disabled
          value={conseiller?.prenom}
        />
      </div>
      <div className="rf-input-group rf-mb-5w">
        <label className="rf-label" htmlFor="nom">
          Nom
        </label>
        <input
          className="rf-input"
          aria-describedby="text-input-error-desc-error"
          type="text"
          id="nom"
          name="nom"
          disabled
          value={conseiller?.nom}
        />
      </div>
      <div className={`rf-input-group ${erreurNumeroTelephonePro ? 'rf-input-group--error' : 'rf-mb-5w'}`}>
        <label className="rf-label" htmlFor="telephonePro">
          T&eacute;l&eacute;phone professionnel
          <span className="rf-hint-text desc-input">Si votre structure vous en a fourni un.</span>
        </label>
        <input
          className={`rf-input ${erreurNumeroTelephonePro ? 'rf-input--error' : ''}`}
          aria-describedby="text-input-error-desc-error"
          type="tel"
          id="telephonePro"
          placeholder="+33XXXXXXXXX ou +262XXXXXXXXX, ..."
          name="telephonePro"
          value={telephonePro}
          onChange={handleChange}
        />
        {erreurNumeroTelephonePro &&
          <p id="text-input-error-desc-error" className="rf-error-text">
            {erreurNumeroTelephonePro}
          </p>
        }
      </div>
      <div className={`rf-input-group ${erreurNumeroTelephone ? 'rf-input-group--error' : 'rf-mb-5w'}`}>
        <label className="rf-label" htmlFor="telephone">
          T&eacute;l&eacute;phone personnel
        </label>
        <input
          className={`rf-input ${erreurNumeroTelephone ? 'rf-input--error' : ''}`}
          aria-describedby="text-input-error-desc-error"
          type="telephone"
          id="telephone"
          placeholder="+33XXXXXXXXX ou +262XXXXXXXXX, ..."
          name="telephone"
          value={telephone}
          onChange={handleChange}
        />
        {erreurNumeroTelephone &&
          <p id="text-input-error-desc-error" className="rf-error-text">
            {erreurNumeroTelephone}
          </p>
        }
      </div>
      <div className={`rf-input-group ${erreurEmailPerso ? 'rf-input-group--error' : 'rf-mb-5w'}`}>
        <label className="rf-label" htmlFor="email">
          Adresse mail secondaire
          <span className="rf-hint-text desc-input">Celle-ci vous a servi pour candidater au dispositif Conseiller numérique France services.</span>
        </label>
        <input
          className={`rf-input ${erreurEmailPerso ? 'rf-input--error' : ''}`}
          aria-describedby="text-input-error-desc-error"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        {erreurEmailPerso &&
          <p id="text-input-error-desc-error" className="rf-error-text">
            {erreurEmailPerso}
          </p>
        }
      </div>
      <div className="rf-input-group rf-mb-5w">
        <label className="rf-label" htmlFor="prenom">
          &Acirc;ge
        </label>
        <input
          className="rf-input"
          aria-describedby="text-input-error-desc-error"
          type="text"
          id="prenom"
          disabled
          name="prenom"
          value={calcAge(conseiller?.dateDeNaissance)}
        />
      </div>
      <div className="rf-form-group">
        <fieldset className="rf-fieldset rf-fieldset--inline" disabled="disabled">
          <legend className="rf-fieldset__legend rf-text--regular" id="radio-inline-legend">
            Genre
          </legend>
          <div className="rf-fieldset__content">
            <div className="rf-radio-group radio-genre">
              <input type="radio" id="radio-inline-1" name="radio-inline" value="Homme"
                checked={conseiller?.sexe === 'Homme'}
              />
              <label className="rf-label" htmlFor="radio-inline-1">Homme
              </label>
            </div>
            <div className="rf-radio-group radio-genre">
              <input type="radio" id="radio-inline-2" name="radio-inline" value="Femme" checked={conseiller?.sexe === 'Femme'} />
              <label className="rf-label" htmlFor="radio-inline-2">Femme
              </label>
            </div>
            <div className="rf-radio-group radio-genre">
              <input type="radio" id="radio-inline-3" name="radio-inline" value="Autre" checked={conseiller?.sexe === 'Autre'} />
              <label className="rf-label" htmlFor="radio-inline-3">Autre
              </label>
            </div>
          </div>
        </fieldset>
      </div>
      <button className="form-button rf-btn rf-mb-4w" onClick={handleSubmit}>
        Enregistrer
      </button>
    </>
  );
}

export default FormulaireInfosPersonnelles;
