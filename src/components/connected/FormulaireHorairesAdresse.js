import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FlashMessage from 'react-flash-message';
import Footer from '../Footer';
import { formulaireHorairesAdresseActions } from '../../actions/formulaireHorairesAdresse.actions';

function FormulaireHorairesAdresse() {

  const dispatch = useDispatch();
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const userEmail = useSelector(state => state.authentication?.user.user.name);
  const structure = useSelector(state => state.structure?.structure);
  const isAdresseCachee = useSelector(state => state.horairesAdresse?.isAdresseCachee);
  const adresseStructure = structure?.insee.etablissement.adresse;

  const telephoneHorsMetropole = [
    { codeDepartement: '971', indicatif: '+590' },
    { codeDepartement: '972', indicatif: '+596' },
    { codeDepartement: '973', indicatif: '+594' },
    { codeDepartement: '974', indicatif: '+262' },
    { codeDepartement: '976', indicatif: '+269' },
  ];

  let indicatif = structure?.codeDepartement.length === 3 ?
    telephoneHorsMetropole?.find(item => item.codeDepartement === structure?.codeDepartement).indicatif : '+33';

  const date = '21/01/22';
  const [inputs, setInputs] = useState({
    errorInputs: false,
    lieuActivite: '', siret: structure?.insee.entreprise.siret_siege_social, numeroTelephone: '', email: '', siteWeb: '',
    numeroVoie: adresseStructure.numero_voie, rueVoie: adresseStructure.type_voie + ' ' + adresseStructure?.nom_voie,
    codePostal: adresseStructure.code_postal, ville: adresseStructure.localite,
    lundiMatinDebut: '', lundiMatinFin: '', lundiApresMidiDebut: '', lundiApresMidiFin: '',
    mardiMatinDebut: '', mardiMatinFin: '', mardiApresMidiDebut: '', mardiApresMidiFin: '',
    mercrediMatinDebut: '', mercrediMatinFin: '', mercrediApresMidiDebut: '', mercrediApresMidiFin: '',
    jeudiMatinDebut: '', jeudiMatinFin: '', jeudiApresMidiDebut: '', jeudiApresMidiFin: '',
    vendrediMatinDebut: '', vendrediMatinFin: '', vendrediApresMidiDebut: '', vendrediApresMidiFin: '',
    samediMatinDebut: '', samediMatinFin: '', samediApresMidiDebut: '', samediApresMidiFin: '',
    dimancheMatinDebut: '', dimancheMatinFin: '', dimancheApresMidiDebut: '', dimancheApresMidiFin: '',
    itinerance: ''
  });

  const { errorInputs, lieuActivite, siret, numeroTelephone, email, siteWeb, numeroVoie, rueVoie, codePostal, ville,
    lundiMatinDebut, lundiMatinFin, lundiApresMidiDebut, lundiApresMidiFin,
    mardiMatinDebut, mardiMatinFin, mardiApresMidiDebut, mardiApresMidiFin,
    mercrediMatinDebut, mercrediMatinFin, mercrediApresMidiDebut, mercrediApresMidiFin,
    jeudiMatinDebut, jeudiMatinFin, jeudiApresMidiDebut, jeudiApresMidiFin,
    vendrediMatinDebut, vendrediMatinFin, vendrediApresMidiDebut, vendrediApresMidiFin,
    samediMatinDebut, samediMatinFin, samediApresMidiDebut, samediApresMidiFin,
    dimancheMatinDebut, dimancheMatinFin, dimancheApresMidiDebut, dimancheApresMidiFin,
    itinerance } = inputs;

  function handleAdresse(boolean) {
    dispatch(formulaireHorairesAdresseActions.cacherAdresse(boolean));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  }

  function handleSubmit() {
    setInputs(inputs => ({ ...inputs }));
    if (formulaireHorairesAdresseActions.isFormulaireValide(inputs)) {
      /*
      dispatch(formulaireHorairesAdresseActions.createHorairesAdresse(conseiller._id, {
        nomEnseigne: lieuActivite,
        numeroTelephone: numeroTelephone,
        email: email,
        siteWeb: siteWeb,
        siret: siret,
        adresse: {
          numeroRue: numeroVoie,
          rue: rueVoie,
          codePostal: codePostal,
          ville: ville
        },
        horaires: {
          lundi: { matin: [lundiMatinDebut, lundiMatinFin], apresMidi: [lundiApresMidiDebut, lundiApresMidiFin] },
          mardi: { matin: [mardiMatinDebut, mardiMatinFin], apresMidi: [mardiApresMidiDebut, mardiApresMidiFin] },
          mercredi: { matin: [mercrediMatinDebut, mercrediMatinFin], apresMidi: [mercrediApresMidiDebut, mercrediApresMidiFin] },
          jeudi: { matin: [jeudiMatinDebut, jeudiMatinFin], apresMidi: [jeudiApresMidiDebut, jeudiApresMidiFin] },
          vendredi: { matin: [vendrediMatinDebut, vendrediMatinFin], apresMidi: [vendrediApresMidiDebut, vendrediApresMidiFin] },
          samedi: { matin: [samediMatinDebut, samediMatinFin], apresMidi: [samediApresMidiDebut, samediApresMidiFin] },
          dimanche: { matin: [dimancheMatinDebut, dimancheMatinFin], apresMidi: [dimancheApresMidiDebut, dimancheApresMidiFin] },
        },
        itinerant: itinerance,
      }));*/
    } else {

    }
  }

  return (
    <>
      <div id="formulaire-horaires-adresse" className="rf-container">
        <div className="rf-grid-row">
          <div className="rf-col-12">
            <h1 className="titre rf-mt-9w rf-mb-1w">Informations d&rsquo;acc&egrave;s et contact CnFS </h1>
            <p className="derniere-modification rf-mb-5w">Derni&egrave;re modification de vos informations effectu&eacute;e le {date}</p>
            <h2 className="sous-titre rf-mb-4w">{structure?.nom}</h2>
            <p className="rf-mb-5w">
              <span className="libelle-adresse rf-mr-3w">Adresse</span>
              <span className="info-adresse">
                {adresseStructure?.numero_voie + ' ' + adresseStructure?.type_voie + ' ' + adresseStructure?.nom_voie}
              </span>
              <br/>
              <span className="libelle-adresse rf-mr-3w">Code Postal</span>
              <span className="info-adresse">
                {adresseStructure?.code_postal}
              </span>
              <br/>
              <span className="libelle-adresse rf-mr-3w">Ville</span>
              <span className="info-adresse">
                {adresseStructure?.localite}
              </span>
              <br/>
              <span className="libelle-adresse rf-mr-3w">N° de siret</span>
              <span>
                {structure?.insee.entreprise.siret_siege_social}
              </span>
            </p>
            <form className="rf-container rf-container--fluid">
              <div className="rf-grid-row rf-grid-row--gutters">
                <div className="question rf-col-12 rf-mb-5w">
                  Ces informations correspondent-elles à votre lieu principal d&rsquo;activit&eacute; ? <span className="obligatoire">*</span>
                  <fieldset className="rf-fieldset rf-fieldset--inline rf-mt-2w">
                    <div className="rf-fieldset__content">
                      <div className="rf-radio-group">
                        <input type="radio" id="Oui" name="exact" value="Oui" onClick={() => {
                          handleAdresse(true);
                        }}/>
                        <label className="rf-label" htmlFor="Oui">Oui</label>
                      </div>
                      <div className="rf-radio-group">
                        <input type="radio" id="Non" name="exact" value="Non" required="required" onClick={() => {
                          handleAdresse(false);
                        }}/>
                        <label className="rf-label" htmlFor="Non">Non</label>
                      </div>
                    </div>
                  </fieldset>
                </div>

                <label className="rf-label rf-col-10 rf-col-sm-7 rf-col-md-4 rf-mb-5w" htmlFor="lieu-activite">
                  Nom de mon lieu principal d&rsquo;activit&eacute; <span className="obligatoire">*</span>
                  <input className="rf-input rf-mt-2v" type="text" id="lieu-activite" name="lieuActivite" required="required" onChange={handleChange}/>
                </label>
                {!isAdresseCachee &&
                  <>
                    <label className="rf-label rf-col-10 rf-col-sm-7 rf-col-md-4 rf-mb-5w" htmlFor="siret">
                      Num&eacute;ro de siret (optionnel)
                      <a href="https://www.pappers.fr/" title="Liens vers https://www.pappers.fr/" target="blank" rel="noreferrer">
                        <i className="rf-ml-1w ri-information-line ri-xl ri-info"></i>
                      </a>
                      <input className="rf-input rf-mt-2v" type="number" id="siret" name="siret" maxLength={14} onChange={handleChange} />
                    </label>

                    <div className="rf-col-offset-3"></div>
                  </>
                }
                {isAdresseCachee &&
                  <div className="rf-col-offset-4"></div>
                }

                <label className="rf-label rf-col-10 rf-col-sm-7 rf-col-md-4 rf-mb-5w" htmlFor="numero-telephone">
                  Num&eacute;ro de t&eacute;l&eacute;phone (accueil) <span className="obligatoire">*</span>
                  <input className="rf-input rf-mt-2v" type="tel" id="numero-telephone" name="numeroTelephone"
                    required="required" placeholder={indicatif + 'X XX XX XX XX'} onChange={handleChange}/>
                </label>

                <div className="rf-col-offset-4"></div>

                <label className="rf-label rf-col-10 rf-col-sm-7 rf-col-md-4 rf-mb-5w" htmlFor="email">
                  Mail <span className="obligatoire">*</span>
                  <input className="rf-input rf-mt-2v" type="text" id="email" name="email" required="required" value={userEmail} onChange={handleChange}/>
                </label>

                <div className="rf-col-offset-4"></div>

                <label className="rf-label rf-col-10 rf-col-sm-7 rf-col-md-4 rf-mb-9w" htmlFor="site-web">
                  Site web (optionnel)
                  <input className="rf-input rf-mt-2v" type="url" id="site-web" name="siteWeb" onChange={handleChange}/>
                </label>
                {!isAdresseCachee &&
                <>
                  <h2 className="sous-titre rf-col-12 rf-mb-4w">Coordonn&eacute;es de mon lieu d&rsquo;activit&eacute;</h2>

                  <label className="rf-label rf-col-10 rf-col-sm-7 rf-col-md-4 rf-mb-5w" htmlFor="numero-voie">
                    Num&eacute;ro de voie <span className="obligatoire">*</span>
                    <input className="rf-input rf-mt-2v" type="text" id="numero-voie" name="numeroVoie" required="required" onChange={handleChange} />
                  </label>

                  <div className="rf-col-offset-4"></div>

                  <label className="rf-label rf-col-10 rf-col-sm-7 rf-col-md-4 rf-mb-5w" htmlFor="rue-voie">
                    Rue <span className="obligatoire">*</span>
                    <input className="rf-input rf-mt-2v" type="text" id="rue-voie" name="rueVoie" required="required" onChange={handleChange} />
                  </label>

                  <div className="rf-col-offset-4"></div>

                  <label className="rf-label rf-col-10 rf-col-sm-7 rf-col-md-4 rf-mb-5w" htmlFor="code-postal">
                    Code Postal <span className="obligatoire">*</span>
                    <input className="rf-input rf-mt-2v" type="text" id="code-postal" name="codePostal" required="required" onChange={handleChange} />
                  </label>

                  <div className="rf-col-offset-4"></div>

                  <label className="rf-label rf-col-10 rf-col-sm-7 rf-col-md-4 rf-mb-9w" htmlFor="ville">
                    Ville <span className="obligatoire">*</span>
                    <input className="rf-input rf-mt-2v" type="text" id="ville" name="ville" required="required" onChange={handleChange} />
                  </label>
                </>
                }
                <h2 className="sous-titre rf-col-12 rf-mb-4w">Horaires de mon lieu d&rsquo;activit&eacute;</h2>
                <div className="rf-col-12">
                  <table className="rf-mb-9w">
                    <thead>
                      <tr>
                        <th></th>
                        <th><div className="rf-mr-md-2w">Matin</div></th>
                        <th><div className="rf-mr-md-2w">Apr&egrave;s-midi</div></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="jour">Lundi</td>
                        <td>
                          <input className="horaires-debut rf-mb-md-1w" type="time" required name="lundiMatinDebut" onChange={handleChange}/>
                          <input className="horaires-fin rf-mr-2w" type="time" required name="lundiMatinFin" onChange={handleChange}/>
                        </td>
                        <td>
                          <input className="horaires-debut rf-mb-md-1w" type="time" required name="lundiApresMidiDebut" onChange={handleChange}/>
                          <input className="horaires-fin rf-mr-2w" type="time" required name="lundiApresMidiFin" onChange={handleChange}/>
                        </td>
                        <td>
                        </td>
                      </tr>
                      <tr>
                        <td className="jour">Mardi</td>
                        <td>
                          <input className="horaires-debut rf-mb-md-1w" type="time" required name="mardiMatinDebut" onChange={handleChange}/>
                          <input className="horaires-fin rf-mr-2w" type="time" required name="vendrediMatinFin" onChange={handleChange}/>
                        </td>
                        <td>
                          <input className="horaires-debut rf-mb-md-1w" type="time" required name="mardiApresMidiDebut" onChange={handleChange}/>
                          <input className="horaires-fin rf-mr-2w" type="time" required name="mardiApresMidiFin" onChange={handleChange}/>
                        </td>
                      </tr>
                      <tr>
                        <td className="jour">Mercredi</td>
                        <td>
                          <input className="horaires-debut rf-mb-md-1w" type="time" required name="mercrediMatinDebut" onChange={handleChange}/>
                          <input className="horaires-fin rf-mr-2w" type="time" required name="mercrediMatinFin" onChange={handleChange}/>
                        </td>
                        <td>
                          <input className="horaires-debut rf-mb-md-1w" type="time" required name="mercrediApresMidiDebut" onChange={handleChange}/>
                          <input className="horaires-fin rf-mr-2w" type="time" required name="mercrediApresMidiFin" onChange={handleChange}/>
                        </td>
                      </tr>
                      <tr>
                        <td className="jour">Jeudi</td>
                        <td>
                          <input className="horaires-debut rf-mb-md-1w" type="time" required name="jeudiMatinDebut" onChange={handleChange}/>
                          <input className="horaires-fin rf-mr-2w" type="time" required name="jeudiMatinFin" onChange={handleChange}/>
                        </td>
                        <td>
                          <input className="horaires-debut rf-mb-md-1w" type="time" required name="jeudiApresMidiDebut" onChange={handleChange}/>
                          <input className="horaires-fin rf-mr-2w" type="time" required name="jeudiApresMidiFin" onChange={handleChange}/>
                        </td>
                      </tr>
                      <tr>
                        <td className="jour">Vendredi</td>
                        <td>
                          <input className="horaires-debut rf-mb-md-1w" type="time" required name="vendrediMatinDebut" onChange={handleChange}/>
                          <input className="horaires-fin rf-mr-2w" type="time" required name="vendrediMatinFin" onChange={handleChange}/>
                        </td>
                        <td>
                          <input className="horaires-debut rf-mb-md-1w" type="time" required name="vendrediApresMidiDebut" onChange={handleChange}/>
                          <input className="horaires-fin rf-mr-2w" type="time" required name="vendrediApresMidiFin" onChange={handleChange}/>
                        </td>
                      </tr>
                      <tr>
                        <td className="jour">Samedi</td>
                        <td>
                          <input className="horaires-debut rf-mb-md-1w" type="time" required name="samediMatinDebut" onChange={handleChange}/>
                          <input className="horaires-fin rf-mr-2w" type="time" required name="samediMatinFin" onChange={handleChange}/>
                        </td>
                        <td>
                          <input className="horaires-debut rf-mb-md-1w" type="time" required name="samediApresMidiDebut" onChange={handleChange}/>
                          <input className="horaires-fin rf-mr-2w" type="time" required name="samediApresMidiFin" onChange={handleChange}/>
                        </td>
                      </tr>
                      <tr>
                        <td className="jour">Dimanche</td>
                        <td>
                          <input className="horaires-debut rf-mb-md-1w" type="time" required name="dimancheMatinDebut" onChange={handleChange}/>
                          <input className="horaires-fin rf-mr-2w" type="time" required name="dimancheMatinFin" onChange={handleChange}/>
                        </td>
                        <td>
                          <input className="horaires-debut rf-mb-md-1w" type="time" required name="dimancheApresMidiDebut" onChange={handleChange}/>
                          <input className="horaires-fin rf-mr-2w" type="time" required name="dimancheApresMidiFin" onChange={handleChange}/>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <h2 className="sous-titre rf-col-12 rf-mb-4w">A propos de mon activit&eacute; de conseiller num&eacute;rique</h2>

                <div className="question rf-col-12 rf-mb-9w">
                  Effectuez-vous des accompagnements en itin&eacute;rance ? <span className="obligatoire">*</span>
                  <fieldset className="rf-fieldset rf-fieldset--inline rf-mt-2w">
                    <div className="rf-fieldset__content">
                      <div className="rf-radio-group">
                        <input type="radio" id="itinerance-Oui" name="itinerance" value="true" onChange={handleChange} />
                        <label className="rf-label" htmlFor="itinerance-Oui">Oui</label>
                      </div>
                      <div className="rf-radio-group">
                        <input type="radio" id="itinerance-Non" name="itinerance" value="false" required="required" onChange={handleChange}/>
                        <label className="rf-label" htmlFor="itinerance-Non">Non</label>
                      </div>
                    </div>
                  </fieldset>
                </div>
                <div className="rf-col-4">
                  <button className="rf-btn validation-btn rf-mb-15w" onClick={handleSubmit}>Enregistrer les informations</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer type="support"/>
    </>
  );
}

export default FormulaireHorairesAdresse;

