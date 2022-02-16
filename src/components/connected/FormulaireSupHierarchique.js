import React, { useState, useEffect } from 'react';
import { formSupHierarchiqueActions } from '../../actions/supHierarchique.actions';
import { useDispatch, useSelector } from 'react-redux';
import { supHierarchiqueService } from '../../services/supHierarchique.service';

function FormulaireSuperieurHierarchique() {
    const erreursFormulaire = useSelector(state => state.formulaireSupHierarchique?.errorsFormulaire);
    const erreurNumeroTelephone = erreursFormulaire?.errors?.filter(erreur => erreur?.numeroTelephone)[0]?.numeroTelephone;
    const erreurEmail = erreursFormulaire?.errors?.filter(erreur => erreur?.email)[0]?.email;
    const erreurNom = erreursFormulaire?.errors?.filter(erreur => erreur?.nom)[0]?.nom;
    const erreurPrenom = erreursFormulaire?.errors?.filter(erreur => erreur?.prenom)[0]?.prenom;
    const erreurFonction = erreursFormulaire?.errors?.filter(erreur => erreur?.fonction)[0]?.fonction;
    const dispatch = useDispatch();
    const form = useSelector(state => state.formSupHierarchique);
    const [inputs, setInputs] = useState({
        prenom: '',
        nom: '',
        fonction: '',
        email: '',
        numeroTelephone: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { prenom, nom, fonction, email, numeroTelephone } = inputs;
    // useEffect(() => {
    //     if (erreursFormulaire?.lengthError === 0 && setSubmitted) {
    //         if (form) {
    //             console.log("dfds");
    //             // dispatch(permanenceActions.updatePermanence(permanence._id, permanence));
    //         } else {
    //             dispatch(supHierarchiqueService.createSupHierarchique({
    //                 numeroTelephone: form.numeroTelephone,
    //                 email: form.email,
    //                 nom: form.nom,
    //                 prenom: form.prenom
    //             }));
    //         }
    //     }
    //     setSubmitted(false);
    // }, [erreursFormulaire]);
    useEffect(() => {
        if (form !== null && form !== undefined) {
            dispatch(formSupHierarchiqueActions.initFormSupHierarchique(form));
        }
    }, [form]);

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
        <div className="form-sup-hierarchique">
            <div className="rf-container">
                <div className="rf-grid-row">
                    <div className="rf-col-12">
                        <h1 className="titre rf-mt-15w rf-mb-4w rf-mb-md-4w">Mes informations personnelles et contact de mon responsable</h1>
                    </div>
                    <div className="rf-col-12 rf-col-md-6">
                        <h2 className="rf-mb-md-5v sous-titre">Mes informations personnelles</h2>
                    </div>
                    <div className="rf-col-12 rf-col-md-6">
                        <div className="rf-ml-md-10w">
                            <h2 className="rf-mb-md-4w sous-titre">Contact de mon responsable</h2>
                            <p className="paragraphe rf-mb-3w">Ces coordonn&eacute;es pourront &ecirc;tre utilis&eacute;es pour communiquer des informations concernant
                                le dispositif et l&rsquo;animation du r&eacute;seau à votre employeur (ex: invitation à des webinaires,
                                envoi de documents explicatifs, newsletter, etc.)
                            </p>
                            <div className={`rf-input-group ${submitted && erreurPrenom ? 'rf-input-group--error' : 'rf-mb-5w'}`}>
                                <label className="rf-label" htmlFor="prenom">
                                    Prénom
                                </label>
                                <input
                                    className={`rf-input ${submitted && erreurPrenom ? 'rf-input--error' : ''}`}
                                    aria-describedby="text-input-error-desc-error"
                                    type="text"
                                    id="prenom"
                                    name="prenom"
                                    value={prenom}
                                    onChange={handleChange}
                                />
                                {submitted && erreurPrenom &&
                                    <p id="text-input-error-desc-error" className="rf-error-text">
                                        {erreurPrenom}
                                    </p>
                                }
                            </div>
                            <div className={`rf-input-group ${submitted && erreurNom ? 'rf-input-group--error' : 'rf-mb-5w'}`}>
                                <label className="rf-label" htmlFor="nom">
                                    Nom
                                </label>
                                <input
                                    className={`rf-input ${submitted && erreurNom ? 'rf-input--error' : ''}`}
                                    aria-describedby="text-input-error-desc-error"
                                    type="text"
                                    id="nom"
                                    name="nom"
                                    value={nom}
                                    onChange={handleChange}
                                />
                                {submitted && erreurNom &&
                                    <p id="text-input-error-desc-error" className="rf-error-text">
                                        {erreurNom}
                                    </p>
                                }
                            </div>
                            <div className={`rf-input-group ${submitted && erreurFonction ? 'rf-input-group--error' : 'rf-mb-5w'}`}>
                                <label className="rf-label" htmlFor="nom">
                                    Fonction
                                </label>
                                <input
                                    className={`rf-input ${submitted && erreurFonction ? 'rf-input--error' : ''}`}
                                    aria-describedby="text-input-error-desc-error"
                                    type="text"
                                    id="fonction"
                                    name="fonction"
                                    value={fonction}
                                    onChange={handleChange}
                                />
                                {submitted && erreurFonction &&
                                    <p id="text-input-error-desc-error" className="rf-error-text">
                                        {erreurFonction}
                                    </p>
                                }
                            </div>
                            <div className={`rf-input-group ${submitted && erreurEmail ? 'rf-input-group--error' : 'rf-mb-5w'}`}>
                                <label className="rf-label" htmlFor="email">
                                    Adresse email
                                </label>
                                <input
                                    className={`rf-input ${submitted && erreurEmail ? 'rf-input--error' : ''}`}
                                    aria-describedby="text-input-error-desc-error"
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                />
                                {submitted && erreurEmail &&
                                    <p id="text-input-error-desc-error" className="rf-error-text">
                                        {erreurEmail}
                                    </p>
                                }
                            </div>
                            <div className={`rf-input-group ${submitted && erreurNumeroTelephone ? 'rf-input-group--error' : 'rf-mb-5w'}`}>
                                <label className="rf-label" htmlFor="numeroTelephone">
                                    Numéro de téléphone
                                </label>
                                <input
                                    className={`rf-input ${submitted && erreurNumeroTelephone ? 'rf-input--error' : ''}`}
                                    aria-describedby="text-input-error-desc-error"
                                    type="numeroTelephone"
                                    id="numeroTelephone"
                                    name="numeroTelephone"
                                    value={numeroTelephone}
                                    onChange={handleChange}
                                />
                                {submitted && erreurNumeroTelephone &&
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
    );
}

export default FormulaireSuperieurHierarchique;
