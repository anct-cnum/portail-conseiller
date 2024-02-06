import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { formInformationsActions } from '../../../actions/informations.actions';
import ModalUpdateForm from './ModalUpdateForm';
import telephoneHorsMetropole from '../../../data/indicatifs.json';

function FormulaireInfosProfessionnelles() {

  const dispatch = useDispatch();

  const structure = useSelector(state => state.structure?.structure);
  const user = useSelector(state => state.authentication?.user?.user);
  const form = useSelector(state => state.formulaireInformations);
  const conseiller = useSelector(state => state.conseiller?.conseiller);

  const erreursFormulaire = useSelector(state => state.formulaireInformations?.errorsFormulaire);
  const erreurNumeroTelephonePro = erreursFormulaire?.errors?.filter(erreur => erreur?.telephonePro)[0]?.telephonePro;
  const erreurEmailPro = erreursFormulaire?.errors?.filter(erreur => erreur?.emailPro)[0]?.emailPro;

  const [inputs, setInputs] = useState({
    conseillerTelephonePro: '',
    conseillerEmailPro: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
      if (name === 'conseillerTelephonePro' && value.length >= 10) {
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
        conseillerTelephone: telephone,
        conseillerTelephonePro: telephonePro,
        conseillerEmailPro: conseiller?.emailPro,
        conseillerEmail: conseiller?.email,
        conseillerDateDeNaissance: conseiller?.dateDeNaissance !== undefined ? conseiller.dateDeNaissance : new Date(),
        conseillerSexe: conseiller.sexe
      });
    }
  }, [conseiller]);
  return (
    <>
      <ModalUpdateForm form={form} showModal={showModal} setShowModal={setShowModal} formOrigin="informations"/>

      <h2 className="fr-mb-6w sous-titre">Informations professionnelles</h2>
      {conseiller?.estCoordinateur === true &&
        <div className="infos-user fr-mb-md-6w">
          <img src="/logos/icone-conseiller-coordinateur.svg" />
          <span className="coordinateur-text">Coordinateur</span>
        </div>
      }

      <div className="fr-mb-2w">Adresse mail CnFS</div>
      <div className="contact-mail">
        <img src="/logos/home-connected/icone-courriel.svg" />
        <div className="infos-user fr-mb-md-6w">
          <span>{user.name}</span>
          <Link to={{
            pathname: '/mot-de-passe-oublie',
            state: {
              fromModifPassword: true,
            },
          }} className="modif-password">
            Modification de mon mot de passe <span className="fr-fi-external-link-line fr-link--icon"></span>
          </Link>
        </div>
      </div>

      <div className={`fr-input-group ${erreurEmailPro ? 'fr-input-group--error' : 'fr-mb-5w'}`}>
        <label className="fr-label" htmlFor="conseiller-email-pro">
          Adresse mail professionnelle
          <span className="fr-hint-text desc-input">Si votre structure vous en a fourni une.</span>
        </label>
        <input
          className={`fr-input ${erreurEmailPro ? 'fr-input--error' : ''}`}
          aria-describedby="text-input-error-desc-error"
          type="email"
          id="conseiller-email-pro"
          name="conseillerEmailPro"
          value={inputs?.conseillerEmailPro ?? ''}
          onChange={handleChange}
        />
        {erreurEmailPro &&
          <p id="text-input-error-desc-error" className="fr-error-text">
            {erreurEmailPro}
          </p>
        }
      </div>

      <div className={`fr-input-group ${erreurNumeroTelephonePro ? 'fr-input-group--error' : 'fr-mb-5w'}`}>
        <label className="fr-label" htmlFor="conseiller-telephone-pro">
          T&eacute;l&eacute;phone professionnel
          <span className="fr-hint-text desc-input">Si votre structure vous en a fourni un.</span>
        </label>
        <input
          className={`fr-input ${erreurNumeroTelephonePro ? 'fr-input--error' : ''}`}
          aria-describedby="text-input-error-desc-error"
          type="tel"
          id="conseiller-telephone-pro"
          placeholder="+33XXXXXXXXX ou +262XXXXXXXXX, ..."
          name="conseillerTelephonePro"
          value={inputs?.conseillerTelephonePro ?? ''}
          onChange={handleChange}
        />
        {erreurNumeroTelephonePro &&
          <p id="text-input-error-desc-error" className="fr-error-text">
            {erreurNumeroTelephonePro}
          </p>
        }
      </div>

      <button className="form-button fr-btn fr-mb-4w" onClick={handleSubmit}>
        Enregistrer
      </button>
    </>
  );
}

export default FormulaireInfosProfessionnelles;
