import React, { useState, useEffect } from 'react';
import telephoneHorsMetropole from '../../../data/indicatifs.json';
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
  const structure = useSelector(state => state.structure?.structure);
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

  function handleChange(e) {
    let { name, value } = e.target;
    if ((name === 'numeroTelephone') && value.length >= 10) {
      value = formatTelephone(value);
    }
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
      <div className={`rf-input-group ${erreurPrenom ? 'rf-input-group--error' : 'rf-mb-5w'}`}>
        <label className="rf-label" htmlFor="prenom">
          Pr&eacute;nom
        </label>
        <input
          className={`rf-input ${erreurPrenom ? 'rf-input--error' : ''}`}
          aria-describedby="text-input-error-desc-error"
          type="text"
          id="prenom"
          name="prenom"
          value={prenom}
          onChange={handleChange}
        />
        {erreurPrenom &&
          <p id="text-input-error-desc-error" className="rf-error-text">
            {erreurPrenom}
          </p>
        }
      </div>
      <div className={`rf-input-group ${erreurNom ? 'rf-input-group--error' : 'rf-mb-5w'}`}>
        <label className="rf-label" htmlFor="nom">
          Nom
        </label>
        <input
          className={`rf-input ${erreurNom ? 'rf-input--error' : ''}`}
          aria-describedby="text-input-error-desc-error"
          type="text"
          id="nom"
          name="nom"
          value={nom}
          onChange={handleChange}
        />
        {erreurNom &&
          <p id="text-input-error-desc-error" className="rf-error-text">
            {erreurNom}
          </p>
        }
      </div>
      <div className={`rf-input-group ${erreurFonction ? 'rf-input-group--error' : 'rf-mb-5w'}`}>
        <label className="rf-label" htmlFor="nom">
          Fonction
        </label>
        <input
          className={`rf-input ${erreurFonction ? 'rf-input--error' : ''}`}
          aria-describedby="text-input-error-desc-error"
          type="text"
          id="fonction"
          name="fonction"
          value={fonction}
          onChange={handleChange}
        />
        {erreurFonction &&
          <p id="text-input-error-desc-error" className="rf-error-text">
            {erreurFonction}
          </p>
        }
      </div>
      <div className={`rf-input-group ${erreurEmail ? 'rf-input-group--error' : 'rf-mb-5w'}`}>
        <label className="rf-label" htmlFor="email">
          Adresse mail
        </label>
        <input
          className={`rf-input ${erreurEmail ? 'rf-input--error' : ''}`}
          aria-describedby="text-input-error-desc-error"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        {erreurEmail &&
          <p id="text-input-error-desc-error" className="rf-error-text">
            {erreurEmail}
          </p>
        }
      </div>
      <div className={`rf-input-group ${erreurNumeroTelephone ? 'rf-input-group--error' : 'rf-mb-5w'}`}>
        <label className="rf-label" htmlFor="numeroTelephone">
          Num&eacute;ro de t&eacute;l&eacute;phone
        </label>
        <input
          className={`rf-input ${erreurNumeroTelephone ? 'rf-input--error' : ''}`}
          aria-describedby="text-input-error-desc-error"
          type="numeroTelephone"
          id="numeroTelephone"
          placeholder="+33XXXXXXXXX ou +262XXXXXXXXX, ..."
          name="numeroTelephone"
          value={numeroTelephone}
          onChange={handleChange}
        />
        {erreurNumeroTelephone &&
          <p id="text-input-error-desc-error" className="rf-error-text">
            {erreurNumeroTelephone}
          </p>
        }
      </div>
      <button className="form-button rf-btn rf-mb-4w" onClick={handleSubmit}>
        Enregistrer
      </button>
    </>
  );
}

export default FormulaireSuperieurHierarchique;
