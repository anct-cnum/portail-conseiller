import React, { useState, useEffect } from 'react';
import { formSupHierarchiqueActions } from '../../../actions/supHierarchique.actions';
import { useDispatch, useSelector } from 'react-redux';
import ModalUpdateForm from './ModalUpdateForm';

function FormulaireSuperieurHierarchique() {
  const erreursFormulaire = useSelector(state => state.formulaireSupHierarchique?.errorsFormulaire);
  const erreurNumeroTelephone = erreursFormulaire?.errors?.filter(erreur => erreur?.numeroTelephone)[0]?.numeroTelephone;
  const erreurEmail = erreursFormulaire?.errors?.filter(erreur => erreur?.email)[0]?.email;
  const erreurNom = erreursFormulaire?.errors?.filter(erreur => erreur?.nom)[0]?.nom;
  const erreurPrenom = erreursFormulaire?.errors?.filter(erreur => erreur?.prenom)[0]?.prenom;
  const erreurFonction = erreursFormulaire?.errors?.filter(erreur => erreur?.fonction)[0]?.fonction;
  const form = useSelector(state => state.formulaireSupHierarchique);
  const supHierarchique = useSelector(state => state.conseiller?.conseiller?.supHierarchique);
  const dispatch = useDispatch();
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
  useEffect(() => {
    if (erreursFormulaire?.lengthError === 0 && submitted) {
      setShowModal(true);
      window.scrollTo(0, 0);
    }
    setSubmitted(false);
  }, [erreursFormulaire]);
  useEffect(() => {
    if (supHierarchique !== null && supHierarchique !== undefined) {
      dispatch(formSupHierarchiqueActions.initFormSupHierarchique(supHierarchique));
      setInputs({
        prenom: supHierarchique.prenom,
        nom: supHierarchique.nom,
        numeroTelephone: supHierarchique.numeroTelephone,
        email: supHierarchique.email,
        fonction: supHierarchique.fonction,
      });
    }
  }, [supHierarchique]);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
    dispatch(formSupHierarchiqueActions.updateField(name, value));
  }

  function handleSubmit() {
    setSubmitted(true);
    dispatch(formSupHierarchiqueActions.verifyFormulaire(form));
  }
  return (
    <>
      <ModalUpdateForm form={form} isSupHierarchique={true} showModal={showModal} setShowModal={setShowModal} />
      <div className={`fr-input-group ${erreurPrenom ? 'fr-input-group--error' : 'fr-mb-5w'}`}>
        <label className="fr-label" htmlFor="prenom">
          Pr&eacute;nom
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
          Nom
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
          Fonction
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
          Adresse mail
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
    </>
  );
}

export default FormulaireSuperieurHierarchique;
