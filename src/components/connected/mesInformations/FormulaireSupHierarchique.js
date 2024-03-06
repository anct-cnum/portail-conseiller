import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formSupHierarchiqueActions } from '../../../actions/supHierarchique.actions';
import telephoneHorsMetropole from '../../../data/indicatifs.json';
import ModalUpdateForm from './ModalUpdateForm';
import Footer from '../../Footer';
import { alerteActions } from '../../../actions';
import Alerte from '../../common/Alerte';

function FormulaireSuperieurHierarchique() {

  const dispatch = useDispatch();

  const supHierarchique = useSelector(state => state.conseiller?.conseiller?.supHierarchique);
  const formSupHierarchique = useSelector(state => state.formulaireSupHierarchique);
  const structure = useSelector(state => state.structure?.structure);

  const erreurNumeroTelephone = formSupHierarchique?.errorsFormulaire?.errors?.filter(erreur => erreur?.numeroTelephone)[0]?.numeroTelephone;
  const erreurEmail = formSupHierarchique?.errorsFormulaire?.errors?.filter(erreur => erreur?.email)[0]?.email;
  const erreurNom = formSupHierarchique?.errorsFormulaire?.errors?.filter(erreur => erreur?.nom)[0]?.nom;
  const erreurPrenom = formSupHierarchique?.errorsFormulaire?.errors?.filter(erreur => erreur?.prenom)[0]?.prenom;
  const erreurFonction = formSupHierarchique?.errorsFormulaire?.errors?.filter(erreur => erreur?.fonction)[0]?.fonction;

  const [inputs, setInputs] = useState({
    prenom: '',
    nom: '',
    fonction: '',
    email: '',
    numeroTelephone: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { prenom, nom, fonction, email, numeroTelephone } = inputs;

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
    if ((name === 'numeroTelephone') && (value.length >= 10)) {
      value = formatTelephone(value);
    }
    setInputs(inputs => ({ ...inputs, [name]: value }));
    dispatch(formSupHierarchiqueActions.updateField(name, value));
  }

  function handleSubmit() {
    setSubmitted(true);
    dispatch(formSupHierarchiqueActions.verifyFormulaire(formSupHierarchique));
  }

  useEffect(() => {
    if (formSupHierarchique?.errorsFormulaire?.lengthError === 0 && submitted) {
      setShowModal(true);
      window.scrollTo(0, 0);
    }
    setSubmitted(false);
  }, [formSupHierarchique?.errorsFormulaire]);

  useEffect(() => {
    if (supHierarchique !== null && supHierarchique !== undefined) {
      const numeroTelephone = formatTelephone(supHierarchique.numeroTelephone);
      dispatch(formSupHierarchiqueActions.initFormSupHierarchique(supHierarchique));
      setInputs({
        prenom: supHierarchique.prenom,
        nom: supHierarchique.nom,
        numeroTelephone,
        email: supHierarchique.email,
        fonction: supHierarchique.fonction,
      });
    }
  }, [supHierarchique]);

  useEffect(() => {
    dispatch(alerteActions.getMessageAlerte({

    }));
  }, [structure]);


  useEffect(() => {
    if (formSupHierarchique?.isCreated) {
      dispatch(alerteActions.getMessageAlerte({
        type: 'valid',
        message: 'Vos informations ont bien été enregistrées',
        icon: 'ri-check-line ri-xl'
      }));
    }
    if (formSupHierarchique?.error) {
      dispatch(alerteActions.getMessageAlerte({
        type: 'invalid',
        message: formSupHierarchique.error,
        icon: 'ri-close-line ri-xl'
      }));
    }
    dispatch(formSupHierarchiqueActions.initFormSupHierarchiqueMessage({ isCreated: false, showError: false }));
  }, [formSupHierarchique?.isCreated, formSupHierarchique?.error]);

  return (
    <>
      <ModalUpdateForm form={formSupHierarchique} showModal={showModal} setShowModal={setShowModal} formOrigin="superieurHierarchique" />
      <div className="mes-informations">
        <Alerte />
        <div className="fr-container">
          <div className="fr-grid-row">
            <div className="fr-col-12">
              <h1 className="titre fr-mt-10w fr-mb-6w">Contact de mon responsable</h1>
              <p className="paragraphe fr-mb-6w">
                Utilis&eacute; pour communiquer des informations concernant le dispositif et l&rsquo;animation du r&eacute;seau
                &agrave; votre employeur : invitation &agrave; des webinaires, envoi de documents explicatifs, newsletter, etc.
              </p>
            </div>
            <div className="fr-col-12 fr-col-md-4">
              <div className={`fr-input-group ${erreurPrenom ? 'fr-input-group--error' : 'fr-mb-5w'}`}>
                <label className="fr-label" htmlFor="prenom">
                  Pr&eacute;nom<span className="obligatoire">&nbsp;*</span>
                </label>
                <input
                  className={`fr-input ${erreurPrenom ? 'fr-input--error' : ''}`}
                  aria-describedby="text-input-error-desc-error"
                  type="text"
                  id="prenom"
                  name="prenom"
                  value={prenom}
                  onChange={handleChange}
                />
                {erreurPrenom &&
                  <p id="text-input-error-desc-error" className="fr-error-text">
                    {erreurPrenom}
                  </p>
                }
              </div>
              <div className={`fr-input-group ${erreurNom ? 'fr-input-group--error' : 'fr-mb-5w'}`}>
                <label className="fr-label" htmlFor="nom">
                  Nom<span className="obligatoire">&nbsp;*</span>
                </label>
                <input
                  className={`fr-input ${erreurNom ? 'fr-input--error' : ''}`}
                  aria-describedby="text-input-error-desc-error"
                  type="text"
                  id="nom"
                  name="nom"
                  value={nom}
                  onChange={handleChange}
                />
                {erreurNom &&
                  <p id="text-input-error-desc-error" className="fr-error-text">
                    {erreurNom}
                  </p>
                }
              </div>
              <div className={`fr-input-group ${erreurFonction ? 'fr-input-group--error' : 'fr-mb-5w'}`}>
                <label className="fr-label" htmlFor="nom">
                  Fonction<span className="obligatoire">&nbsp;*</span>
                </label>
                <input
                  className={`fr-input ${erreurFonction ? 'fr-input--error' : ''}`}
                  aria-describedby="text-input-error-desc-error"
                  type="text"
                  id="fonction"
                  name="fonction"
                  value={fonction}
                  onChange={handleChange}
                />
                {erreurFonction &&
                  <p id="text-input-error-desc-error" className="fr-error-text">
                    {erreurFonction}
                  </p>
                }
              </div>
              <div className={`fr-input-group ${erreurEmail ? 'fr-input-group--error' : 'fr-mb-5w'}`}>
                <label className="fr-label" htmlFor="email">
                  Adresse mail<span className="obligatoire">&nbsp;*</span>
                </label>
                <input
                  className={`fr-input ${erreurEmail ? 'fr-input--error' : ''}`}
                  aria-describedby="text-input-error-desc-error"
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
                {erreurEmail &&
                  <p id="text-input-error-desc-error" className="fr-error-text">
                    {erreurEmail}
                  </p>
                }
              </div>
              <div className={`fr-input-group ${erreurNumeroTelephone ? 'fr-input-group--error' : 'fr-mb-5w'}`}>
                <label className="fr-label" htmlFor="numeroTelephone">
                  Num&eacute;ro de t&eacute;l&eacute;phone
                </label>
                <input
                  className={`fr-input ${erreurNumeroTelephone ? 'fr-input--error' : ''}`}
                  aria-describedby="text-input-error-desc-error"
                  type="numeroTelephone"
                  id="numeroTelephone"
                  placeholder="+33XXXXXXXXX ou +262XXXXXXXXX, ..."
                  name="numeroTelephone"
                  value={numeroTelephone}
                  onChange={handleChange}
                />
                {erreurNumeroTelephone &&
                  <p id="text-input-error-desc-error" className="fr-error-text">
                    {erreurNumeroTelephone}
                  </p>
                }
              </div>
              <button className="form-button fr-btn fr-mb-4w" onClick={handleSubmit}>
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer type="support" />
    </>
  );
}

export default FormulaireSuperieurHierarchique;
