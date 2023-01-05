import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import { mesInformationsActions } from '../../../actions/mesInformations.actions';
import ModalValidationContrat from '../../ModalValidationContrat';

registerLocale('fr', fr);

function FormulaireContrat() {
  const dispatch = useDispatch();
  const erreursFormulaire = useSelector(state => state.mesInformations?.errorsFormulaire);
  const erreurTypeContrat = erreursFormulaire?.errors?.filter(erreur => erreur?.typeContrat)[0]?.typeContrat;
  const erreurDateDebut = erreursFormulaire?.errors?.filter(erreur => erreur?.dateDebut)[0]?.dateDebut;
  const erreurDateFin = erreursFormulaire?.errors?.filter(erreur => erreur?.dateFin)[0]?.dateFin;
  const contratActif = useSelector(state => state.mesInformations.contratActif);
  const form = useSelector(state => state.mesInformations);

  const [inputs, setInputs] = useState({
    dateDebut: '',
    dateFin: '',
    typeContrat: '',
  });
  const [disabled, setDisabled] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const perennisation = process.env.REACT_APP_MATTERMOST_URL + '/cnum/channels/perennisation-des-cnfs';

  function handleChange(e) {
    let { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
    if (value === 'CDI') {
      setInputs(inputs => ({ ...inputs, dateFin: null }));
    }
    dispatch(mesInformationsActions.updateField(name, value));
  }
  function handleChangeDebut(e) {
    setInputs(inputs => ({ ...inputs, dateDebut: e }));
    dispatch(mesInformationsActions.updateField('dateDebut', e));

  }
  function handleChangeFin(e) {
    setInputs(inputs => ({ ...inputs, dateFin: e }));
    dispatch(mesInformationsActions.updateField('dateFin', e));

  }
  function handleSubmit() {
    setSubmitted(true);
    dispatch(mesInformationsActions.verifyFormulaireContrat(form));
  }

  useEffect(() => {
    setDisabled(false);
    if (erreursFormulaire?.lengthError === 0 && submitted) {
      setShowModal(true);
      setDisabled(true);
      window.scrollTo(0, 0);
    }
    setSubmitted(false);
  }, [erreursFormulaire]);

  useEffect(() => {
    if (contratActif) {
      setInputs({
        dateDebut: new Date(contratActif?.dateDebut),
        dateFin: contratActif?.dateFin === null ? null : new Date(contratActif?.dateFin),
        typeContrat: contratActif?.typeContrat
      });
      setDisabled(true);
    }
  }, [contratActif]);

  return (
    <div className="fr-col-5">
      <h2>Mon contrat de travail</h2>
      <p className="paragraphe">Informations inscrites dans le contrat de travail</p>
      <ModalValidationContrat form={form} showModal={showModal} setShowModal={setShowModal} setDisabled={setDisabled} />
      <div className="fr-input-group fr-col-9">
        <fieldset className={`fr-fieldset fr-fieldset--inline ${erreurTypeContrat ? 'fr-fieldset--error' : ''}`}>
          <legend className="fr-fieldset__legend fr-text--regular" id="contrat-legend">
          Type de contrat en cours :
          </legend>
          <div className="fr-fieldset__content">
            <div className="fr-radio-group radio-contrat">
              <input type="radio" id="contrat-1" name="typeContrat" value="CDD" readOnly
                onClick={handleChange} checked={inputs?.typeContrat === 'CDD'} disabled={disabled}/>
              <label className="fr-label" htmlFor="contrat-1">CDD</label>
            </div>
            <div className="fr-radio-group radio-contrat fr-mb-3w">
              <input type="radio" id="contrat-3" name="typeContrat" value="CDI" readOnly
                onClick={handleChange} checked={inputs?.typeContrat === 'CDI'} disabled={disabled}/>
              <label className="fr-label" htmlFor="contrat-3">CDI</label>
            </div>
            <div className="fr-radio-group">
              <input type="radio" id="contrat-2" name="typeContrat" value="Agent titulaire" readOnly
                onClick={handleChange} checked={inputs?.typeContrat === 'Agent titulaire'} disabled={disabled}/>
              <label className="fr-label" htmlFor="contrat-2">Agent titulaire</label>
            </div>
          </div>
        </fieldset>
        {erreurTypeContrat &&
          <p className="fr-error-text">
            {erreurTypeContrat}
          </p>
        }
      </div>
      <div className="fr-input-group fr-mb-5w">
        <label className="fr-label" htmlFor="dateDebut">Date de début du contrat</label>
        <DatePicker
          placeholderText="../../...."
          id="dateDebut"
          name="dateDebut"
          className={`fr-input ${erreurDateDebut ? 'fr-input--error' : ''}`}
          dateFormat="dd/MM/yyyy"
          locale="fr"
          selected={inputs.dateDebut}
          onChange={handleChangeDebut}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          minDate={new Date('01/01/2021')}
          required="required"
          disabled={disabled}
        />
        {erreurDateDebut &&
          <p className="fr-error-text">
            {erreurDateDebut}
          </p>
        }
      </div>
      {inputs.typeContrat !== 'CDI' &&
        <div className="fr-input-group fr-mb-5w">
          <label className="fr-label" htmlFor="dateFin">Date de fin du contrat</label>
          <DatePicker
            placeholderText="../../...."
            id="dateFin"
            name="dateFin"
            className={`fr-input ${erreurDateFin ? 'fr-input--error' : ''}`}
            dateFormat="dd/MM/yyyy"
            locale="fr"
            selected={inputs.dateFin}
            onChange={handleChangeFin}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            minDate={inputs.dateDebut ?? new Date()}
            required="required"
            disabled={disabled}
          />
          {erreurDateFin &&
            <p className="fr-error-text">
              {erreurDateFin}
            </p>
          }
        </div>
      }
      <div>
        <button className="form-button fr-btn fr-mb-4w" onClick={handleSubmit} disabled={disabled}>
          Enregistrer
        </button>
      </div>
      <div className="fr-col-10 fr-mt-5w">
        <p>Pour suivre l&rsquo;actualit&eacute; du reconventionnement du dispositif et &eacute;changer avec les CnFS, rendez-vous sur :</p>
        <a href={perennisation} className="fr-link fr-fi-external-link-line fr-link--icon-right perennisation-btn">
          <img src="/logos/bulle-ressourcerie.svg" alt="liens Mattermost vers le sujet de la p&eacute;rennisation"/>
          <span>#P&eacute;rennisation des CnFS</span>
        </a>
      </div>
    </div>
  );
}

export default FormulaireContrat;
