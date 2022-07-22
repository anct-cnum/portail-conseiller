import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formInfoPersonnelActions } from '../../../actions/infoPersonnel.actions';
import ModalUpdateForm from './ModalUpdateForm';
import telephoneHorsMetropole from '../../../data/indicatifs.json';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';

registerLocale('fr', fr);
function FormulaireInfosPersonnelles() {
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const erreursFormulaire = useSelector(state => state.formulaireInfoPersonnel?.errorsFormulaire);
  const erreurNumeroTelephone = erreursFormulaire?.errors?.filter(erreur => erreur?.telephone)[0]?.telephone;
  const erreurNumeroTelephonePro = erreursFormulaire?.errors?.filter(erreur => erreur?.telephonePro)[0]?.telephonePro;
  const erreurEmailPerso = erreursFormulaire?.errors?.filter(erreur => erreur?.email)[0]?.email;
  const erreurEmailPro = erreursFormulaire?.errors?.filter(erreur => erreur?.emailPro)[0]?.emailPro;
  const form = useSelector(state => state.formulaireInfoPersonnel);
  const structure = useSelector(state => state.structure?.structure);
  const dispatch = useDispatch();
  
  const [inputs, setInputs] = useState({
    conseillerTelephone: '',
    conseillerTelephonePro: '',
    conseillerEmailPro: '',
    conseillerEmail: '',
    conseillerDateDeNaissance: new Date(),
    conseillerSexe: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { conseillerTelephone, conseillerTelephonePro, conseillerEmail, conseillerDateDeNaissance, conseillerSexe, conseillerEmailPro } = inputs;
  const todayDate = new Date();
  const maxDate = todayDate.getFullYear() - 18;
  const minDate = todayDate.getFullYear() - 99;
  const formatTelephone = value => {
    if (value.substr(0, 1) !== '+') {
      const findIndicatif = telephoneHorsMetropole.find(r => r.codeDepartement === structure?.codeDepartement);
      return (value && !['+33', '+26', '+59'].includes(value.substr(0, 3))) ?
      `${findIndicatif?.indicatif ?? '+33'}${value.substr(1)}` : value;
    }
    return value;
  };
  useEffect(() => {
    if (erreursFormulaire?.lengthError === 0 && submitted) {
      setShowModal(true);
      window.scrollTo(0, 0);
    }
    setSubmitted(false);
  }, [erreursFormulaire]);
  useEffect(() => {
    if (conseiller !== null && conseiller !== undefined) {
      const telephone = formatTelephone(conseiller.telephone);
      const telephonePro = formatTelephone(conseiller.telephonePro);
      dispatch(formInfoPersonnelActions.initFormInfoPersonnel(
        conseiller.email,
        telephone,
        telephonePro,
        conseiller.emailPro,
        conseiller.dateDeNaissance,
        conseiller.sexe
      ));
      setInputs({
        conseillerTelephone: telephone,
        conseillerTelephonePro: telephonePro,
        conseillerEmailPro: conseiller.emailPro,
        conseillerEmail: conseiller.email,
        conseillerDateDeNaissance: conseiller.dateDeNaissance,
        conseillerSexe: conseiller.sexe
      });
    }
  }, [conseiller]);

  function handleChange(e) {
    if (e?.target) {
      let { name, value } = e.target;
      if ((name === 'conseillerTelephone' || name === 'conseillerTelephonePro') && value.length >= 10) {
        value = formatTelephone(value);
      }
      setInputs(inputs => ({ ...inputs, [name]: value }));
      dispatch(formInfoPersonnelActions.updateField(name, value));
    } else {
      setInputs(inputs => ({ ...inputs, conseillerDateDeNaissance: e }));
      dispatch(formInfoPersonnelActions.updateField('conseillerDateDeNaissance', e));
    }
  }

  function handleSubmit() {
    setSubmitted(true);
    dispatch(formInfoPersonnelActions.verifyFormulaire(form, conseiller.telephone));
  }
  return (
    <>
      <ModalUpdateForm form={form} showModal={showModal} setShowModal={setShowModal} />
      <div className="rf-input-group rf-mb-5w">
        <label className="rf-label" htmlFor="conseiller-prenom">
          Pr&eacute;nom
        </label>
        <input
          className="rf-input"
          aria-describedby="text-input-error-desc-error"
          type="text"
          id="conseiller-prenom"
          name="conseillerPrenom"
          disabled
          value={conseiller?.prenom}
        />
      </div>
      <div className="rf-input-group rf-mb-5w">
        <label className="rf-label" htmlFor="conseiller-nom">
          Nom
        </label>
        <input
          className="rf-input"
          aria-describedby="text-input-error-desc-error"
          type="text"
          id="conseiller-nom"
          name="conseillerNom"
          disabled
          value={conseiller?.nom}
        />
      </div>
      <div className={`rf-input-group ${erreurEmailPro ? 'rf-input-group--error' : 'rf-mb-5w'}`}>
        <label className="rf-label" htmlFor="conseiller-email-pro">
          Adresse mail professionnelle
          <span className="rf-hint-text desc-input">Si votre structure vous en a fourni une.</span>
        </label>
        <input
          className={`rf-input ${erreurEmailPro ? 'rf-input--error' : ''}`}
          aria-describedby="text-input-error-desc-error"
          type="email"
          id="conseiller-email-pro"
          name="conseillerEmailPro"
          value={conseillerEmailPro}
          onChange={handleChange}
        />
        {erreurEmailPro &&
          <p id="text-input-error-desc-error" className="rf-error-text">
            {erreurEmailPro}
          </p>
        }
      </div>
      <div className={`rf-input-group ${erreurNumeroTelephonePro ? 'rf-input-group--error' : 'rf-mb-5w'}`}>
        <label className="rf-label" htmlFor="conseiller-telephone-pro">
          T&eacute;l&eacute;phone professionnel
          <span className="rf-hint-text desc-input">Si votre structure vous en a fourni un.</span>
        </label>
        <input
          className={`rf-input ${erreurNumeroTelephonePro ? 'rf-input--error' : ''}`}
          aria-describedby="text-input-error-desc-error"
          type="tel"
          id="conseiller-telephone-pro"
          placeholder="+33XXXXXXXXX ou +262XXXXXXXXX, ..."
          name="conseillerTelephonePro"
          value={conseillerTelephonePro}
          onChange={handleChange}
        />
        {erreurNumeroTelephonePro &&
          <p id="text-input-error-desc-error" className="rf-error-text">
            {erreurNumeroTelephonePro}
          </p>
        }
      </div>
      <div className={`rf-input-group ${erreurNumeroTelephone ? 'rf-input-group--error' : 'rf-mb-5w'}`}>
        <label className="rf-label" htmlFor="conseiller-telephone">
          T&eacute;l&eacute;phone personnel
        </label>
        <input
          className={`rf-input ${erreurNumeroTelephone ? 'rf-input--error' : ''}`}
          aria-describedby="text-input-error-desc-error"
          type="tel"
          id="conseiller-telephone"
          placeholder="+33XXXXXXXXX ou +262XXXXXXXXX, ..."
          name="conseillerTelephone"
          value={conseillerTelephone}
          onChange={handleChange}
        />
        {erreurNumeroTelephone &&
          <p id="text-input-error-desc-error" className="rf-error-text">
            {erreurNumeroTelephone}
          </p>
        }
      </div>
      <div className={`rf-input-group ${erreurEmailPerso ? 'rf-input-group--error' : 'rf-mb-5w'}`}>
        <label className="rf-label" htmlFor="conseiller-email">
          Adresse mail secondaire
          <span className="rf-hint-text desc-input">Celle-ci vous a servi pour candidater au dispositif Conseiller numérique France services.</span>
        </label>
        <input
          className={`rf-input ${erreurEmailPerso ? 'rf-input--error' : ''}`}
          aria-describedby="text-input-error-desc-error"
          type="email"
          id="conseiller-email"
          name="conseillerEmail"
          value={conseillerEmail}
          onChange={handleChange}
        />
        {erreurEmailPerso &&
          <p id="text-input-error-desc-error" className="rf-error-text">
            {erreurEmailPerso}
          </p>
        }
      </div>
      <div className="rf-input-group rf-mb-5w">
        <label className="rf-label" htmlFor="conseiller-date-de-naissance">
          Date de naissance
        </label>
        <DatePicker
          id="conseiller-date-de-naissance"
          name="conseillerDateDeNaissance"
          className="rf-input rf-my-1w"
          placeholderText="../../...."
          dateFormat="dd/MM/yyyy"
          locale="fr"
          selected={new Date(conseillerDateDeNaissance)}
          onChange={handleChange}
          value={new Date(conseillerDateDeNaissance)}
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
      <div className="rf-form-group">
        <fieldset className="rf-fieldset rf-fieldset--inline">
          <legend className="rf-fieldset__legend rf-text--regular" id="radio-inline-legend">
            Genre
          </legend>
          <div className="rf-fieldset__content">
            <div className="rf-radio-group radio-genre">
              <input type="radio" id="Homme" name="conseillerSexe" value="Homme" onClick={handleChange}
                checked={conseillerSexe === 'Homme'}
              />
              <label className="rf-label" htmlFor="Homme">Homme
              </label>
            </div>
            <div className="rf-radio-group radio-genre">
              <input type="radio" id="Femme" name="conseillerSexe" value="Femme" onClick={handleChange} checked={conseillerSexe === 'Femme'} />
              <label className="rf-label" htmlFor="Femme">Femme
              </label>
            </div>
            <div className="rf-radio-group radio-genre">
              <input type="radio" id="Autre" name="conseillerSexe" value="Autre" onClick={handleChange} checked={conseillerSexe === 'Autre'} />
              <label className="rf-label" htmlFor="Autre">Autre
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
