import React, { useState, useEffect } from 'react';
import { formSupHierarchiqueActions } from '../../actions/supHierarchique.actions';
import { useDispatch, useSelector } from 'react-redux';
import FlashMessage from 'react-flash-message';

function FormulaireSuperieurHierarchique() {
  const erreursFormulaire = useSelector(state => state.formulaireSupHierarchique?.errorsFormulaire);
  const erreurNumeroTelephone = erreursFormulaire?.errors?.filter(erreur => erreur?.numeroTelephone)?.numeroTelephone;
  const erreurEmail = erreursFormulaire?.errors?.filter(erreur => erreur?.email)[0]?.email;
  const erreurNom = erreursFormulaire?.errors?.filter(erreur => erreur?.nom)[0]?.nom;
  const erreurPrenom = erreursFormulaire?.errors?.filter(erreur => erreur?.prenom)[0]?.prenom;
  const erreurFonction = erreursFormulaire?.errors?.filter(erreur => erreur?.fonction)[0]?.fonction;
  const conseiller = useSelector(state => state.conseiller?.conseiller);
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
  const { prenom, nom, fonction, email, numeroTelephone } = inputs;
  useEffect(() => {
    if (erreursFormulaire?.lengthError === 0 && submitted) {
      dispatch(formSupHierarchiqueActions.createSupHierarchique({
        numeroTelephone: form.numeroTelephone,
        email: form.email,
        nom: form.nom,
        prenom: form.prenom,
        fonction: form.fonction
      }, conseiller._id));
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
    window.scrollTo(0, 0);
  }
  return (
    <>
      {form.isCreated &&
        <FlashMessage duration={5000}>
          <p className="rf-label flashBag">
            Vos informations ont bien &eacute;t&eacute; enregistr&eacute;es&nbsp;
            <i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
          </p>
        </FlashMessage>
      }
      {form.error &&
        <FlashMessage duration={5000}>
          <p className="rf-label flashBag invalid">
            {form.error}
            <i className="ri-close-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
          </p>
        </FlashMessage>
      }
      <div className="form-sup-hierarchique">
        <div className="rf-container">
          <div className="rf-grid-row">
            <div className="rf-col-12">
              <h1 className="titre rf-mt-15w rf-mb-4w rf-mb-md-4w">Mes informations personnelles et contact de mon responsable</h1>
            </div>
            <div className="rf-col-12 rf-col-md-6">
              <div>
                <h2 className="rf-mb-md-4w sous-titre">Mes informations personnelles</h2>
                <p className="paragraphe rf-mb-3w">En cours de d&eacute;veloppement</p>
              </div>
            </div>
            <div className="rf-col-12 rf-col-md-6">
              <div className="rf-ml-md-10w">
                <h2 className="rf-mb-md-4w sous-titre">Contact de mon responsable</h2>
                <p className="paragraphe rf-mb-3w">Ces coordonn&eacute;es pourront &ecirc;tre utilis&eacute;es pour communiquer des informations concernant
                  le dispositif et l&rsquo;animation du r&eacute;seau à votre employeur (ex: invitation à des webinaires,
                  envoi de documents explicatifs, newsletter, etc.)
                </p>
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
                    Adresse email
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
                <button className="form-button rf-btn" onClick={handleSubmit}>
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormulaireSuperieurHierarchique;
