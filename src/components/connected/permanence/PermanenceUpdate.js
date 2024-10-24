import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Oval } from 'react-loader-spinner';

import horairesInitiales from '../../../data/horairesInitiales.json';
import { permanenceActions, conseillerActions } from '../../../actions';
import { userEntityId } from '../../../helpers';

import Banner from './Banner';
import Recapitulatif from './Recapitulatif';
import ContactProfessionel from './ContactProfessionel';
import ListPermanences from './ListPermanences';
import Adresse from './Adresse';
import TypeAcces from './TypeAcces';
import Horaires from './Horaires';
import Validation from './Validation';
import Footer from '../../Footer';
import { formatAdresse, formatRue } from '../../../utils/functionFormats';
import ValidationImpossible from './ValidationImpossible';
import { useParams } from 'react-router-dom';

function PermanenceUpdate() {
  const { idPermanence } = useParams();
  const dispatch = useDispatch();

  const loading = useSelector(state => state.permanence?.loading);
  const listPermanences = useSelector(state => state.permanence?.permanences);
  const maPermanenceError = useSelector(state => state.permanence?.maPermanenceError);
  const maPermanenceLoading = useSelector(state => state.permanence?.maPermanenceLoading);
  let maPermanence = useSelector(state => state.permanence?.maPermanence);
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const structure = useSelector(state => state.structure?.structure);
  const loadingHoraires = useSelector(state => state.permanence?.loadingHoraires);

  const showError = useSelector(state => state.permanence?.showError);
  const showErrorMessage = useSelector(state => state.permanence?.showErrorMessage);
  const errorUpdated = useSelector(state => state.permanence?.error);
  const isUpdated = useSelector(state => state.permanence?.isUpdated);
  const isCreated = useSelector(state => state.permanence?.isCreated);
  const redirection = useSelector(state => state.permanence?.redirection);
  const existsPermanence = useSelector(state => state.permanence?.existsPermanence);

  const adresseStructure = structure?.insee?.adresse;
  const urlCartographie = import.meta.env.VITE_APP_CARTOGRAPHIE_URL;


  const [estlieuPrincipal, setEstLieuPrincipal] = useState(null);
  const [defaultCheckedOui, setDefaultCheckedOui] = useState(null);
  const [defaultCheckedNon, setDefaultCheckedNon] = useState(null);

  const updateGeocodeAdress = (maPermanence, prefixId) => {
    const adresse = {
      numero: maPermanence?.adresse?.numeroRue,
      rue: maPermanence?.adresse?.rue,
      codePostal: maPermanence?.adresse?.codePostal,
      ville: maPermanence?.adresse?.ville?.toUpperCase()
    };
    const adresseGeoloc = JSON.parse(JSON.stringify(adresse,
      (key, value) => (value === null) ? '' : value
    ));
    dispatch(permanenceActions.getGeocodeAdresse(
      adresseGeoloc,
      prefixId)
    );
  };

  const fillPermanencePrincipale = (permanencePrincipale, estStructure) => {
    const rue = formatRue(null, adresseStructure?.type_voie, adresseStructure?.libelle_voie);
    const adresse = formatAdresse(permanencePrincipale?.adresse, adresseStructure, rue);

    dispatch(permanenceActions.updateField('principal_idPermanence', permanencePrincipale?._id ?? null));
    dispatch(permanenceActions.updateField('lieuPrincipalPour', permanencePrincipale?.lieuPrincipalPour));
    dispatch(permanenceActions.updateField('principal_numeroTelephone', permanencePrincipale?.numeroTelephone ?? null));
    dispatch(permanenceActions.updateField('principal_email', permanencePrincipale?.email ?? null));
    dispatch(permanenceActions.updateField('principal_siteWeb', permanencePrincipale?.siteWeb ?? null));

    dispatch(permanenceActions.updateField('principal_typeAcces', permanencePrincipale?.typeAcces ?? null));
    permanencePrincipale?.typeAcces?.forEach(type => {
      dispatch(permanenceActions.updateField('principal_' + type, true));
    });
    const horaires = permanencePrincipale?.horaires ?? horairesInitiales;
    dispatch(permanenceActions.updateField('principal_horaires', { principal_horaires: horaires }));
    dispatch(permanenceActions.updateField('principal_conseillers', permanencePrincipale?.conseillers ?? null));
    dispatch(permanenceActions.updateField('principal_nomEnseigne', permanencePrincipale?.nomEnseigne ?? structure?.nom));
    dispatch(permanenceActions.updateField('principal_siret', permanencePrincipale?.siret ?? structure?.siret));
    dispatch(permanenceActions.updateField('principal_numeroVoie',
      permanencePrincipale?.adresse?.numeroRue ?? adresseStructure?.numero_voie));
    dispatch(permanenceActions.updateField('principal_rueVoie',
      permanencePrincipale?.adresse?.rue ?? rue));
    dispatch(permanenceActions.updateField('principal_codePostal',
      permanencePrincipale?.adresse?.codePostal ?? adresseStructure?.code_postal));
    dispatch(permanenceActions.updateField('principal_codeCommune',
      permanencePrincipale?.adresse?.codeCommune ?? adresseStructure?.codeCommune));
    dispatch(permanenceActions.updateField('principal_ville',
      permanencePrincipale?.adresse?.ville?.toUpperCase() ?? adresseStructure?.libelle_commune?.toUpperCase()));
    dispatch(permanenceActions.updateField('principal_adresse', adresse?.toUpperCase()));
    dispatch(permanenceActions.updateField('principal_location', estStructure ? structure?.location : null));
    if (loadingHoraires) {
      loadingHoraires[0] = true;
      dispatch(permanenceActions.setHorairesLoading(loadingHoraires));
    }
    dispatch(permanenceActions.disabledField('principal_', rue?.trim() === '' ? false : estStructure));
  };

  function handleAdresse(estStructure) {
    loadingHoraires[0] = true;
    dispatch(permanenceActions.updateField('estStructure', estStructure));
    dispatch(permanenceActions.updateField('principal_idPermanence', 'nouveau'));
    dispatch(permanenceActions.updateField('principal_numeroTelephone', null));
    dispatch(permanenceActions.updateField('principal_email', null));
    dispatch(permanenceActions.updateField('principal_siteWeb', null));
    dispatch(permanenceActions.updateField('principal_libre', null));
    dispatch(permanenceActions.updateField('principal_rdv', null));
    dispatch(permanenceActions.updateField('principal_prive', null));
    dispatch(permanenceActions.updateField('principal_horaires', { 'principal_horaires': horairesInitiales }));
    dispatch(permanenceActions.updateField('principal_conseillers', null));
    dispatch(permanenceActions.updateField('principal_nomEnseigne', null));
    dispatch(permanenceActions.updateField('principal_siret', null));
    dispatch(permanenceActions.updateField('principal_numeroVoie', null));
    dispatch(permanenceActions.updateField('principal_rueVoie', null));
    dispatch(permanenceActions.updateField('principal_codePostal', null));
    dispatch(permanenceActions.updateField('principal_codeCommune', null));
    dispatch(permanenceActions.updateField('principal_ville', null));
    dispatch(permanenceActions.updateField('principal_adresse', null));
    dispatch(permanenceActions.updateField('principal_location', null));
    dispatch(permanenceActions.setHorairesLoading(loadingHoraires));

    const adresseGeoloc = estStructure ? {
      numero: maPermanence?.adresse?.numeroRue ?? adresseStructure?.numero_voie,
      rue: formatRue(maPermanence?.adresse?.rue, adresseStructure?.type_voie, adresseStructure?.libelle_voie),
      codePostal: maPermanence?.adresse?.codePostal ?? adresseStructure?.code_postal,
      ville: maPermanence?.adresse?.ville?.toUpperCase() ?? adresseStructure?.libelle_commune?.toUpperCase()
    } : {};

    if (estStructure) {
      maPermanence = listPermanences?.filter(permanence => permanence?.estStructure === true)[0];
      fillPermanencePrincipale(maPermanence, estStructure);
      updateGeocodeAdress(maPermanence, 'principal_');
    } else {
      dispatch(permanenceActions.rebootGeocodeAdresse(maPermanence?.lieuPrincipalPour?.includes(conseiller?._id) ? 'principal_' : 'secondaire_0_'));
      dispatch(permanenceActions.disabledField(
        maPermanence?.lieuPrincipalPour?.includes(conseiller?._id) ? 'principal_' : 'secondaire_0_', adresseGeoloc?.rue?.trim() === '' ? false : estStructure
      ));
      dispatch(permanenceActions.updateLieuEnregistrable(maPermanence?.lieuPrincipalPour?.includes(conseiller?._id) ? 'principal_' : 'secondaire_0_'));
      dispatch(permanenceActions.updateField(
        maPermanence?.lieuPrincipalPour?.includes(conseiller?._id) ? 'principal_checkboxSiret' : 'secondaire_0_checkboxSiret', false
      ));
      if (!maPermanence?.lieuPrincipalPour?.includes(conseiller?._id)) {
        const show = [true];
        dispatch(permanenceActions.montrerLieuSecondaire(show));
      }
      updateGeocodeAdress(maPermanence, maPermanence?.lieuPrincipalPour?.includes(conseiller?._id) ? 'principal_' : 'secondaire_0_');
    }
    dispatch(permanenceActions.getGeocodeAdresse(adresseGeoloc, 'principal_'));
  }

  useEffect(() => {
    if (structure) {
      dispatch(permanenceActions.getListePermanences(structure?._id));
    }
    if (!maPermanence) {
      dispatch(permanenceActions.getMaPermanence(idPermanence));
    } else if (conseiller) {
      if ((maPermanence?._id !== idPermanence)) {
        dispatch(permanenceActions.getMaPermanence(idPermanence));
      }
      setEstLieuPrincipal(maPermanence?.lieuPrincipalPour?.includes(conseiller?._id));
      if (maPermanence.estStructure && maPermanence?.lieuPrincipalPour?.includes(conseiller?._id)) {
        setDefaultCheckedOui(true);
        setDefaultCheckedNon(false);
      } else {
        setDefaultCheckedNon(true);
        setDefaultCheckedOui(false);
      }

      dispatch(permanenceActions.setChampsMaPermanence(
        maPermanence,
        maPermanence?.lieuPrincipalPour?.includes(conseiller?._id) ? 'principal_' : 'secondaire_0_',
        conseiller)
      );

      const adresse = {
        numero: maPermanence?.adresse?.numeroRue,
        rue: maPermanence?.adresse?.rue ?? '',
        codePostal: maPermanence?.adresse?.codePostal,
        ville: maPermanence?.adresse?.ville?.toUpperCase()
      };
      const adresseGeoloc = JSON.parse(JSON.stringify(adresse,
        (key, value) => (value === null) ? '' : value
      ));
      dispatch(permanenceActions.getGeocodeAdresse(
        adresseGeoloc,
        maPermanence?.lieuPrincipalPour?.includes(conseiller?._id) ? 'principal_' : 'secondaire_0_')
      );
      dispatch(permanenceActions.updateLieuEnregistrable(maPermanence?.lieuPrincipalPour?.includes(conseiller?._id) ? 'principal_' : 'secondaire_0_'));
      dispatch(permanenceActions.updateField(
        maPermanence?.lieuPrincipalPour?.includes(conseiller?._id) ? 'principal_checkboxSiret' : 'secondaire_0_checkboxSiret', false
      ));
      dispatch(permanenceActions.disabledField(
        maPermanence?.lieuPrincipalPour?.includes(conseiller?._id) ? 'principal_' : 'secondaire_0_', adresse?.rue === '' ? false : maPermanence?.estStructure
      ));

      const show = [!maPermanence?.lieuPrincipalPour?.includes(conseiller?._id)];
      dispatch(permanenceActions.montrerLieuSecondaire(show));
    }
  }, [maPermanence, conseiller, structure]);

  useEffect(() => {
    if (isCreated || isUpdated) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        if (redirection !== '/mes-lieux-activite') {
          window.open(urlCartographie + '/' + redirection + '/details', '_blank', 'noopener,noreferrer');
        }
        dispatch(permanenceActions.reloadList(true));
        dispatch(conseillerActions.get(userEntityId()));
        dispatch(permanenceActions.reinitiliserStatut());
        dispatch(permanenceActions.getListePermanences(structure?._id));
        window.location.pathname = '/mes-lieux-activite';
      }, 3000);
    }
  }, [isUpdated, isCreated]);

  return (
    <>
      <div className="spinnerCustom">
        <Oval
          color="#00BFFF"
          height={100}
          width={100}
          visible={loading === true}
        />
      </div>
      {(!maPermanenceLoading && !maPermanenceError) &&
        <>
          <div id="formulaire-horaires-adresse" >
            <Banner />

            {(isCreated || isUpdated) &&
              <p className="fr-label flashBag">
                Votre lieu d&rsquo;activit&eacute; a bien &eacute;t&eacute;&nbsp;
                {isCreated && <>cr&eacute;&eacute;</>}
                {isUpdated && <>mis &agrave; jour</>}
                {redirection === '/mes-lieux-activite' &&
                  <>
                    ,&nbsp;vous allez &ecirc;tre redirig&eacute; vers votre liste de lieux d&rsquo;activit&eacute;.
                  </>
                }
              </p>
            }

            {showError &&
              <p className="fr-label flashBag invalid">
                {showErrorMessage ?? errorUpdated ?
                  'Une erreur est survenue lors de la mise à jour de votre lieu d’activité.' :
                  'Une erreur est survenue lors du traitement de vos informations.'}<br />
                {errorUpdated}
              </p>
            }

            {(conseiller && maPermanence && structure) &&
              <>
                <ContactProfessionel conseiller={conseiller} />
                <div className="fr-container">
                  <div className="fr-grid-row">
                    {maPermanence?.lieuPrincipalPour.includes(conseiller?._id) &&
                      <Recapitulatif
                        nomStructure={structure?.nom}
                        siret={structure?.siret}
                        adresseStructure={adresseStructure}
                      />
                    }
                    <div className="fr-col-1 col-logo">
                      <img className="pin fr-mt-8w" src="/logos/permanences/pin.svg" />
                    </div>
                    <div className="fr-col-8 ">
                      <h2 className="sous-titre fr-mt-7w fr-mb-4w">
                        {!estlieuPrincipal &&
                          <>
                            Lieu d&rsquo;activit&eacute; secondaire
                            <span className="baseline fr-mt-1w">
                              Un lieu d&rsquo;activit&eacute; secondaire correspond &agrave; une permanence o&ugrave; vous avez &eacute;t&eacute;
                              d&eacute;l&eacute;gu&eacute;(e) et o&ugrave; vous exercez votre activit&eacute; de mani&egrave;re hebdomadaire.
                            </span>
                          </>}
                        {estlieuPrincipal && <> Lieu d&rsquo;activit&eacute; principal </>}
                      </h2>
                      {existsPermanence &&
                        <div className="fr-col-offset-1 fr-col-11 fr-mb-4w invalid permanenceExiste">
                          Une permanence a d&eacute;j&agrave; &eacute;t&eacute; cr&eacute;&eacute;e avec les coordonn&eacute;es que vous proposez.<br />
                          Merci de renseigner une nouvelle adresse ou de vous ajouter sur le lieu existant&nbsp;!
                        </div>
                      }
                    </div>
                    {estlieuPrincipal &&
                      <div className="fr-col-offset-1 fr-col-11">
                        <div className="fr-col-12 fr-mb-7w">
                          Le nom et l&rsquo;adresse de la structure d&rsquo;accueil mentionn&eacute;e ci-dessus est-elle votre&nbsp;
                          <b>lieu d&rsquo;activit&eacute; principal</b> ?&nbsp;
                          <span className="obligatoire">*</span>
                          <fieldset className="fr-fieldset fr-fieldset--inline fr-mt-2w">
                            <div className="fr-fieldset__content">
                              <div className="fr-radio-group">
                                <input type="radio" id="Oui" name="principalLieuActivite" value="Oui" defaultChecked={defaultCheckedOui}
                                  required="required" onClick={() => {
                                    handleAdresse(true);
                                  }}
                                />
                                <label className="fr-label" htmlFor="Oui">
                                  Oui
                                </label>
                              </div>
                              <div className="fr-radio-group">
                                <input type="radio" id="Non" name="principalLieuActivite" value="Non" defaultChecked={defaultCheckedNon}
                                  required="required" onClick={() => {
                                    handleAdresse(false);
                                  }}
                                />
                                <label className="fr-label" htmlFor="Non">
                                  Non
                                </label>
                              </div>
                            </div>
                          </fieldset>
                        </div>
                      </div>
                    }


                    <ListPermanences
                      prefixId={estlieuPrincipal ? 'principal_' : 'secondaire_0_'}
                      conseillerId={conseiller?._id}
                      permanenceActuelId={maPermanence?._id}
                    />

                    <Adresse
                      codeDepartement={structure?.codeDepartement}
                      prefixId={estlieuPrincipal ? 'principal_' : 'secondaire_0_'}
                      permanence={maPermanence}
                    />
                    <TypeAcces
                      prefixId={estlieuPrincipal ? 'principal_' : 'secondaire_0_'}
                      islieuPrincipal={estlieuPrincipal}
                      permanence={maPermanence}
                      isUpdate={true}
                    />
                    <Horaires
                      prefixId={estlieuPrincipal ? 'principal_' : 'secondaire_0_'}
                      horairesId={0}
                    />
                    <div className="fr-col-12 fr-mt-8w"></div>

                    {!existsPermanence &&
                      <Validation
                        conseillerId={conseiller?._id}
                        structureId={structure?._id}
                        redirectionValidation="/mes-lieux-activite"
                        statut={estlieuPrincipal ? 'principal_' : 'secondaire_0_'}
                        idPermanenceUrl={idPermanence}
                      />
                    }
                    {existsPermanence &&
                      <ValidationImpossible statut={estlieuPrincipal ? 'principal_' : 'secondaire_0_'} />
                    }
                  </div>
                </div>
              </>
            }
          </div>
        </>
      }

      <Footer type="support" />
    </>
  );
}

export default PermanenceUpdate;
