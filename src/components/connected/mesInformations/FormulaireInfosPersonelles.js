import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker, { registerLocale } from 'react-datepicker';

import { formInformationsActions } from '../../../actions/informations.actions';
import telephoneHorsMetropole from '../../../data/indicatifs.json';
import ModalUpdateForm from './ModalUpdateForm';
import fr from 'date-fns/locale/fr';

registerLocale('fr', fr);

function FormulaireInfosPersonnelles() {

  const dispatch = useDispatch();

  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const structure = useSelector(state => state.structure?.structure);
  const form = useSelector(state => state.formulaireInformations);

  const erreursFormulaire = useSelector(state => state.formulaireInformations?.errorsFormulaire);
  const erreurNumeroTelephone = erreursFormulaire?.errors?.filter(erreur => erreur?.telephone)[0]?.telephone;
  const erreurEmailPerso = erreursFormulaire?.errors?.filter(erreur => erreur?.email)[0]?.email;

  const [inputs, setInputs] = useState({
    conseillerPrenom: '',
    conseillerNom: '',
    conseillerEmail: '',
    conseillerTelephone: '',
    conseillerDateDeNaissance: new Date(),
    conseillerSexe: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const todayDate = new Date();
  const maxDate = todayDate.getFullYear() - 18;
  const minDate = todayDate.getFullYear() - 99;

  const formatTelephone = value => {
    if (value?.substr(0, 1) !== '+') {
      const findIndicatif = telephoneHorsMetropole.find(r => r.codeDepartement === structure?.codeDepartement);
      return (value && !['+33', '+26', '+59'].includes(value.substr(0, 3))) ?
        `${findIndicatif?.indicatif ?? '+33'}${value.substr(1)}` : value;
    }
    return value;
  };

  function handleChange(e) {
    if (e?.target) {
      let { name, value } = e.target;
      if (name === 'conseillerTelephone' && (value.length >= 10)) {
        value = formatTelephone(value);
      }
      setInputs(inputs => ({ ...inputs, [name]: value }));
      dispatch(formInformationsActions.updateField(name, value));
    } else {
      setInputs(inputs => ({ ...inputs, conseillerDateDeNaissance: e }));
      dispatch(formInformationsActions.updateField('conseillerDateDeNaissance', e));
    }
  }

  function handleSubmit() {
    setSubmitted(true);
    dispatch(formInformationsActions.verifyFormulaire(form, conseiller?.telephone));
  }

  useEffect(() => {
    if (erreursFormulaire?.lengthError === 0 && submitted) {
      setShowModal(true);
      window.scrollTo(0, 0);
    }
    setSubmitted(false);
  }, [erreursFormulaire]);

  useEffect(() => {
    if (conseiller !== null && conseiller !== undefined) {
      const telephone = formatTelephone(conseiller?.telephone);
      const telephonePro = formatTelephone(conseiller?.telephonePro);

      dispatch(formInformationsActions.initFormInformations(
        conseiller?.email,
        telephone,
        telephonePro,
        conseiller?.emailPro,
        conseiller?.dateDeNaissance !== undefined ? conseiller.dateDeNaissance : new Date(),
        conseiller.sexe
      ));
      setInputs({
        conseillerPrenom: conseiller.prenom,
        conseillerNom: conseiller.nom,
        conseillerTelephone: telephone,
        conseillerEmail: conseiller?.email,
        conseillerDateDeNaissance: [undefined, null].includes(conseiller?.dateDeNaissance) ? new Date() : conseiller.dateDeNaissance,
        conseillerSexe: conseiller.sexe
      });
    }
  }, [conseiller]);

  return (
    <>
      <ModalUpdateForm form={form} showModal={showModal} setShowModal={setShowModal} formOrigin="informations"/>
      <h2 className="fr-mb-6w sous-titre">Informations personnelles</h2>

      <div className="fr-input-group fr-mb-5w">
        <label className="fr-label" htmlFor="conseiller-prenom">
          Pr&eacute;nom<span className="obligatoire">&nbsp;*</span>
        </label>
        <input
          className="fr-input"
          type="text"
          id="conseiller-prenom"
          name="conseillerPrenom"
          value={inputs?.conseillerPrenom}
          disabled
        />
      </div>

      <div className="fr-input-group fr-mb-5w">
        <label className="fr-label" htmlFor="conseiller-nom">
          Nom<span className="obligatoire">&nbsp;*</span>
        </label>
        <input
          className="fr-input"
          type="text"
          id="conseiller-nom"
          name="conseillerNom"
          value={inputs?.conseillerNom}
          disabled
        />
      </div>

      <div className={`fr-input-group ${erreurEmailPerso ? 'fr-input-group--error' : 'fr-mb-5w'}`}>
        <label className="fr-label" htmlFor="conseiller-email">
          Adresse mail personnelle<span className="obligatoire">&nbsp;*</span>
          <span className="fr-hint-text desc-input">
            Utilis&eacute;e pour votre candidature au dispositif.<br/>
            Sert &eacute;galement &agrave; r&eacute;cup&eacute;rer le mot de passe du mail CnFS.
          </span>
        </label>
        <input
          className={`fr-input ${erreurEmailPerso ? 'fr-input--error' : ''}`}
          aria-describedby="text-input-error-mail-perso-error"
          type="email"
          id="conseiller-email"
          name="conseillerEmail"
          value={inputs?.conseillerEmail}
          onChange={handleChange}
        />
        {erreurEmailPerso &&
          <p id="text-input-error-mail-perso-error" className="fr-error-text">
            {erreurEmailPerso}
          </p>
        }
      </div>

      <div className={`fr-input-group ${erreurNumeroTelephone ? 'fr-input-group--error' : 'fr-mb-5w'}`}>
        <label className="fr-label" htmlFor="conseiller-telephone">
          T&eacute;l&eacute;phone personnel
          <span className="fr-hint-text desc-input">
            Utilis&eacute; lors du recrutement, ou en cas de probl&egrave;me.
          </span>
        </label>
        <input
          className={`fr-input ${erreurNumeroTelephone ? 'fr-input--error' : ''}`}
          aria-describedby="text-input-error-num-perso-error"
          type="tel"
          id="conseiller-telephone"
          placeholder="+33XXXXXXXXX ou +262XXXXXXXXX, ..."
          name="conseillerTelephone"
          value={inputs?.conseillerTelephone ?? ''}
          onChange={handleChange}
        />
        {erreurNumeroTelephone &&
          <p id="text-input-error-num-perso-error" className="fr-error-text">
            {erreurNumeroTelephone}
          </p>
        }
      </div>

      <div className="fr-input-group fr-mb-5w">
        <label className="fr-label" htmlFor="conseiller-date-de-naissance">
          Date de naissance<span className="obligatoire">&nbsp;*</span>
        </label>
        <DatePicker
          id="conseiller-date-de-naissance"
          name="conseillerDateDeNaissance"
          className="fr-input fr-my-1w"
          placeholderText="../../...."
          dateFormat="dd/MM/yyyy"
          locale="fr"
          selected={new Date(inputs?.conseillerDateDeNaissance)}
          onChange={handleChange}
          value={new Date(inputs?.conseillerDateDeNaissance)}
          peekNextMonth
          onChangeRaw={e => e.preventDefault()}
          showMonthDropdown
          showYearDropdown
          maxDate={new Date('12/31/' + maxDate)}
          minDate={new Date('01/01/' + minDate)}
          dropdownMode="select"
          required="required"
        />
      </div>

      <div className="fr-form-group">
        <fieldset className="fr-fieldset fr-fieldset--inline">
          <legend className="fr-fieldset__legend fr-text--regular" id="radio-inline-legend">
            Genre<span className="obligatoire">&nbsp;*</span>
          </legend>
          <div className="fr-fieldset__content">
            <div className="fr-radio-group radio-genre">
              <input type="radio" id="Homme" name="conseillerSexe" value="Homme" onClick={handleChange}
                checked={inputs?.conseillerSexe === 'Homme'} readOnly
              />
              <label className="fr-label" htmlFor="Homme">Homme
              </label>
            </div>
            <div className="fr-radio-group radio-genre">
              <input type="radio" id="Femme" name="conseillerSexe" value="Femme" onClick={handleChange} checked={inputs?.conseillerSexe === 'Femme'} readOnly />
              <label className="fr-label" htmlFor="Femme">Femme
              </label>
            </div>
            <div className="fr-radio-group radio-genre">
              <input type="radio" id="Autre" name="conseillerSexe" value="Autre" onClick={handleChange} checked={inputs?.conseillerSexe === 'Autre'} readOnly />
              <label className="fr-label" htmlFor="Autre">Autre
              </label>
            </div>
          </div>
        </fieldset>
      </div>

      <button className="form-button fr-btn fr-mb-4w" onClick={handleSubmit}>
        Enregistrer
      </button>
    </>
  );
}

export default FormulaireInfosPersonnelles;
