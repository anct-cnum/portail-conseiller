import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { formSupHierarchiqueActions } from '../../../actions/supHierarchique.actions';
import { useDispatch, useSelector } from 'react-redux';

function FormulaireInfosPersonnelles() {
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const erreursFormulaire = useSelector(state => state.formulaireSupHierarchique?.errorsFormulaire);
  const erreurNumeroTelephone = erreursFormulaire?.errors?.filter(erreur => erreur?.numeroTelephone)[0]?.numeroTelephone;
  const erreurNumeroTelephonePro = erreursFormulaire?.errors?.filter(erreur => erreur?.telephonePro)[0]?.telephonePro;
  const erreurEmailPerso = erreursFormulaire?.errors?.filter(erreur => erreur?.email)[0]?.email;
  const form = useSelector(state => state.formulaireSupHierarchique);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    telephone: '',
    telephonePro: '',
    email: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const { telephone, telephonePro, email } = inputs;

  useEffect(() => {
    if (erreursFormulaire?.lengthError === 0 && submitted) {
      // dispatch(formSupHierarchiqueActions.createSupHierarchique({
      //   numeroTelephone: form.numeroTelephone,
      //   email: form.email.trim(),
      //   nom: form.nom.trim(),
      //   prenom: form.prenom.trim(),
      //   fonction: form.fonction.trim()
      // }, conseiller._id));
      window.scrollTo(0, 0);
    }
    setSubmitted(false);
  }, [erreursFormulaire]);
  useEffect(() => {
    if (conseiller !== null && conseiller !== undefined) {
      dispatch(formSupHierarchiqueActions.initFormSupHierarchique(conseiller));
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
    dispatch(formSupHierarchiqueActions.updateField(name, value));
  }

  function handleSubmit() {
    setSubmitted(true);
    dispatch(formSupHierarchiqueActions.verifyFormulaire(form));
  }
  function calcAge(birthDate) {
    const now = dayjs();
    const yearDiff = now.diff(birthDate, 'years');

    return yearDiff;
  }
  return (
    <>
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
      <div className="rf-input-group rf-mb-5w">
        <label className="rf-label" htmlFor="telephone-pro">
          T&eacute;l&eacute;phone professionnel
          <span className="rf-hint-text desc-input">Si votre structure vous en a fourni un.</span>
        </label>
        <input
          className="rf-input"
          aria-describedby="text-input-error-desc-error"
          type="tel"
          id="telephone-pro"
          name="telephone-pro"
          value={telephonePro}
          onChange={handleChange}
        />
        {erreurNumeroTelephonePro &&
          <p id="text-input-error-desc-error" className="rf-error-text">
            {erreurNumeroTelephonePro}
          </p>
        }
      </div>
      <div className="rf-input-group rf-mb-5w">
        <label className="rf-label" htmlFor="telephone-perso">
          T&eacute;l&eacute;phone personnel
        </label>
        <input
          className="rf-input"
          aria-describedby="text-input-error-desc-error"
          type="tel"
          id="telephone-perso"
          name="telephone-perso"
          value={telephone}
          onChange={handleChange}
        />
        {erreurNumeroTelephone &&
          <p id="text-input-error-desc-error" className="rf-error-text">
            {erreurNumeroTelephone}
          </p>
        }
      </div>
      <div className="rf-input-group rf-mb-5w">
        <label className="rf-label" htmlFor="email">
          Adresse mail secondaire
          <span className="rf-hint-text desc-input">Celle-ci vous a servi pour candidater au dispositif Conseiller numérique France services.</span>
        </label>
        <input
          className="rf-input"
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
