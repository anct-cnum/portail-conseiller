import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FlashMessage from 'react-flash-message';
import Footer from '../Footer';

function FormulaireHorairesAdresse() {

  const dispatch = useDispatch();
  const structure = useSelector(state => state?.structure?.structure);
  const adresseStructure = structure?.insee.etablissement.adresse;
  const date = '21/01/22';

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
                <p className="question rf-col-12 rf-mb-5w">
                  Ces informations correspondent-elles à votre lieu principal d&rsquo;activit&eacute; ? <span className="obligatoire">*</span>
                  <fieldset className="rf-fieldset rf-fieldset--inline rf-mt-2w">
                    <div className="rf-fieldset__content">
                      <div className="rf-radio-group">
                        <input type="radio" id="Oui" name="exact" value="Oui" />
                        <label className="rf-label" htmlFor="Oui">Oui</label>
                      </div>
                      <div className="rf-radio-group">
                        <input type="radio" id="Non" name="exact" value="Non" required="required"/>
                        <label className="rf-label" htmlFor="Non">Non</label>
                      </div>
                    </div>
                  </fieldset>
                </p>

                <label className="rf-label rf-col-10 rf-col-sm-7 rf-col-md-4 rf-mb-5w" htmlFor="lieu-activite">
                  Nom de mon lieu principal d&rsquo;activit&eacute; <span className="obligatoire">*</span>
                  <input className="rf-input rf-mt-2v" type="text" id="lieu-activite" name="lieu-activite"/>
                </label>

                <label className="rf-label rf-col-10 rf-col-sm-7 rf-col-md-4 rf-mb-5w" htmlFor="siret">
                  Num&eacute;ro de siret (optionnel)
                  <a href="https://www.pappers.fr/" title="Liens vers https://www.pappers.fr/" target="blank" rel="noreferrer">
                    <i className="rf-ml-1w ri-information-line ri-xl ri-info"></i>
                  </a>
                  <input className="rf-input rf-mt-2v" type="number" id="siret" name="siret"/>
                </label>

                <div className="rf-col-offset-3"></div>

                <label className="rf-label rf-col-10 rf-col-sm-7 rf-col-md-4 rf-mb-5w" htmlFor="numero-telephone">
                  Num&eacute;ro de t&eacute;l&eacute;phone (accueil) <span className="obligatoire">*</span>
                  <input className="rf-input rf-mt-2v" type="text" id="numero-telephone" name="numero-telephone"/>
                </label>

                <div className="rf-col-offset-4"></div>

                <label className="rf-label rf-col-10 rf-col-sm-7 rf-col-md-4 rf-mb-5w" htmlFor="email">
                  Mail <span className="obligatoire">*</span>
                  <input className="rf-input rf-mt-2v" type="text" id="email" name="email"/>
                </label>

                <div className="rf-col-offset-4"></div>

                <label className="rf-label rf-col-10 rf-col-sm-7 rf-col-md-4 rf-mb-9w" htmlFor="site-web">
                  Site web (optionnel)
                  <input className="rf-input rf-mt-2v" type="text" id="site-web" name="site-web"/>
                </label>

                <h2 className="sous-titre rf-col-12 rf-mb-4w">Coordonn&eacute;es de mon lieu d&rsquo;activit&eacute;</h2>

                <label className="rf-label rf-col-10 rf-col-sm-7 rf-col-md-4 rf-mb-5w" htmlFor="numero-voie">
                  Num&eacute;ro de voie <span className="obligatoire">*</span>
                  <input className="rf-input rf-mt-2v" type="text" id="numero-voie" name="numero-voie"/>
                </label>

                <div className="rf-col-offset-4"></div>

                <label className="rf-label rf-col-10 rf-col-sm-7 rf-col-md-4 rf-mb-5w" htmlFor="rue-voie">
                  Rue <span className="obligatoire">*</span>
                  <input className="rf-input rf-mt-2v" type="text" id="rue-voie" name="rue-voie"/>
                </label>

                <div className="rf-col-offset-4"></div>

                <label className="rf-label rf-col-10 rf-col-sm-7 rf-col-md-4 rf-mb-5w" htmlFor="code-postal">
                  Code Postal <span className="obligatoire">*</span>
                  <input className="rf-input rf-mt-2v" type="text" id="code-postal" name="code-postal"/>
                </label>

                <div className="rf-col-offset-4"></div>

                <label className="rf-label rf-col-10 rf-col-sm-7 rf-col-md-4 rf-mb-9w" htmlFor="ville">
                  Ville <span className="obligatoire">*</span>
                  <input className="rf-input rf-mt-2v" type="text" id="ville" name="ville"/>
                </label>

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
                          <input className="horaires-debut rf-mb-md-1w" type="time" required/>
                          <input className="horaires-fin rf-mr-2w" type="time" required/>
                        </td>
                        <td>
                          <input className="horaires-debut rf-mb-md-1w" type="time" required/>
                          <input className="horaires-fin rf-mr-2w" type="time" required/>
                        </td>
                      </tr>
                      <tr>
                        <td className="jour">Mardi</td>
                        <td>
                          <input className="horaires-debut rf-mb-md-1w" type="time" required/>
                          <input className="horaires-fin rf-mr-2w" type="time" required/>
                        </td>
                        <td>
                          <input className="horaires-debut rf-mb-md-1w" type="time" required/>
                          <input className="horaires-fin rf-mr-2w" type="time" required/>
                        </td>
                      </tr>
                      <tr>
                        <td className="jour">Mercredi</td>
                        <td>
                          <input className="horaires-debut rf-mb-md-1w" type="time" required/>
                          <input className="horaires-fin rf-mr-2w" type="time" required/>
                        </td>
                        <td>
                          <input className="horaires-debut rf-mb-md-1w" type="time" required/>
                          <input className="horaires-fin rf-mr-2w" type="time" required/>
                        </td>
                      </tr>
                      <tr>
                        <td className="jour">Jeudi</td>
                        <td>
                          <input className="horaires-debut rf-mb-md-1w" type="time" required/>
                          <input className="horaires-fin rf-mr-2w" type="time" required/>
                        </td>
                        <td>
                          <input className="horaires-debut rf-mb-md-1w" type="time" required/>
                          <input className="horaires-fin rf-mr-2w" type="time" required/>
                        </td>
                      </tr>
                      <tr>
                        <td className="jour">Vendredi</td>
                        <td>
                          <input className="horaires-debut rf-mb-md-1w" type="time" required/>
                          <input className="horaires-fin rf-mr-2w" type="time" required/>
                        </td>
                        <td>
                          <input className="horaires-debut rf-mb-md-1w" type="time" required/>
                          <input className="horaires-fin rf-mr-2w" type="time" required/>
                        </td>
                      </tr>
                      <tr>
                        <td className="jour">Samedi</td>
                        <td>
                          <input className="horaires-debut rf-mb-md-1w" type="time" required/>
                          <input className="horaires-fin rf-mr-2w" type="time" required/>
                        </td>
                        <td>
                          <input className="horaires-debut rf-mb-md-1w" type="time" required/>
                          <input className="horaires-fin rf-mr-2w" type="time" required/>
                        </td>
                      </tr>
                      <tr>
                        <td className="jour">Dimanche</td>
                        <td>
                          <input className="horaires-debut rf-mb-md-1w" type="time" required/>
                          <input className="horaires-fin rf-mr-2w" type="time" required/>
                        </td>
                        <td>
                          <input className="horaires-debut rf-mb-md-1w" type="time" required/>
                          <input className="horaires-fin rf-mr-2w" type="time" required/>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <h2 className="sous-titre rf-col-12 rf-mb-4w">A propos de mon activit&eacute; de conseiller num&eacute;rique</h2>

                <p className="question rf-col-12 rf-mb-9w">
                  Effectuez-vous des accompagnements en itin&eacute;rance ? <span className="obligatoire">*</span>
                  <fieldset className="rf-fieldset rf-fieldset--inline rf-mt-2w">
                    <div className="rf-fieldset__content">
                      <div className="rf-radio-group">
                        <input type="radio" id="itinerance-Oui" name="itinerance" value="Oui" />
                        <label className="rf-label" htmlFor="itinerance-Oui">Oui</label>
                      </div>
                      <div className="rf-radio-group">
                        <input type="radio" id="itinerance-Non" name="itinerance" value="Non" required="required"/>
                        <label className="rf-label" htmlFor="itinerance-Non">Non</label>
                      </div>
                    </div>
                  </fieldset>
                </p>
                <div className="rf-col-4">
                  <button className="rf-btn validation-btn rf-mb-15w">Enregistrer les informations</button>
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

