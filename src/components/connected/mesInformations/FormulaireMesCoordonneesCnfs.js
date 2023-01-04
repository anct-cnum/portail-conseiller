import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { registerLocale } from 'react-datepicker';
import telephoneHorsMetropole from '../../../data/indicatifs.json';
import fr from 'date-fns/locale/fr';
import { formInfoPersonnelActions } from '../../../actions/infoPersonnel.actions';
import { Link } from 'react-router-dom';
import ModalUpdateForm from './ModalUpdateForm';
registerLocale('fr', fr);

function FormulaireMesCoordonneesCnfs({ conseiller, user }) {
  const dispatch = useDispatch();

  const erreursFormulaire = useSelector(state => state.formulaireInfoPersonnel?.errorsFormulaire);
  const erreurNumeroTelephonePro = erreursFormulaire?.errors?.filter(erreur => erreur?.telephonePro)[0]?.telephonePro;
  const erreurEmailPro = erreursFormulaire?.errors?.filter(erreur => erreur?.emailPro)[0]?.emailPro;
  const structure = useSelector(state => state.structure?.structure);
  const form = useSelector(state => state.formulaireInfoPersonnel);

  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [inputs, setInputs] = useState({
    conseillerTelephonePro: '',
    conseillerEmailPro: '',
    nom: conseiller?.nom ?? '',
    prenom: conseiller?.prenom ?? ''
  });

  const formatTelephone = value => {
    if (value?.substr(0, 1) !== '+') {
      const findIndicatif = telephoneHorsMetropole.find(r => r.codeDepartement === structure?.codeDepartement);
      return (value && !['+33', '+26', '+59'].includes(value.substr(0, 3))) ?
        `${findIndicatif?.indicatif ?? '+33'}${value.substr(1)}` : value;
    }
    return value;
  };
  function handleChange(e) {
    let { name, value } = e.target;
    if ((name === 'conseillerTelephonePro') && (value.length >= 10)) {
      value = formatTelephone(value);
    }
    setInputs(inputs => ({ ...inputs, [name]: value }));
    dispatch(formInfoPersonnelActions.updateField(name, value));
  }

  function handleSubmit() {
    setSubmitted(true);
    dispatch(formInfoPersonnelActions.verifyFormulaire(form, conseiller.telephone));
  }

  useEffect(() => {
    if (erreursFormulaire?.lengthError === 0 && submitted) {
      setShowModal(true);
      window.scrollTo(0, 0);
    }
    setSubmitted(false);
  }, [erreursFormulaire]);

  return (
    <div className="fr-col-5">
      <h2>Mes Coordonées CnFS</h2>
      <ModalUpdateForm form={form} showModal={showModal} setShowModal={setShowModal} />
      <div className="contact-mail">
        <img src="/logos/home-connected/icone-courriel.svg" />
        <div className="infos-user fr-mb-md-6w">
          <span>{user?.name}</span>
          <Link to={{
            pathname: '/mot-de-passe-oublie',
            state: {
              fromModifPassword: true,
            },
          }} className="modif-password">
            Modification de mon mot de passe
          </Link>
        </div>
      </div>
      <div className="fr-input-group fr-mb-5w">
        <label className="fr-label" htmlFor="conseiller-prenom">
          Pr&eacute;nom
        </label>
        <input
          className="fr-input"
          aria-describedby="text-input-error-desc-error"
          type="text"
          id="conseiller-prenom"
          name="conseillerPrenom"
          disabled
          value={inputs?.prenom}
        />
      </div>
      <div className="fr-input-group fr-mb-5w">
        <label className="fr-label" htmlFor="conseiller-nom">
          Nom
        </label>
        <input
          className="fr-input"
          aria-describedby="text-input-error-desc-error"
          type="text"
          id="conseiller-nom"
          name="conseillerNom"
          disabled
          value={inputs?.nom}
        />
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
          value={inputs?.conseillerEmailPro}
          onChange={handleChange}
        />
        {erreurEmailPro &&
          <p className="fr-error-text">
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
          <p className="fr-error-text">
            {erreurNumeroTelephonePro}
          </p>
        }
      </div>
      <button className="form-button fr-btn fr-mb-4w" onClick={handleSubmit}>
        Enregistrer
      </button>
    </div>
  );
}
FormulaireMesCoordonneesCnfs.propTypes = {
  conseiller: PropTypes.object,
  user: PropTypes.object
};
export default FormulaireMesCoordonneesCnfs;
