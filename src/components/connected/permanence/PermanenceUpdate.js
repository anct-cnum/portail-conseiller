import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import horairesInitiales from '../../../data/horairesInitiales.json';
import { permanenceActions } from '../../../actions';
import { history } from '../../../helpers';

import Banner from './Banner';
import Recapitulatif from './Recapitulatif';
import ContactProfessionel from './ContactProfessionel';
import ListPermanences from './ListPermanences';
import Adresse from './Adresse';
import TypeAcces from './TypeAcces';
import Horaires from './Horaires';
import Validation from './Validation';
import Footer from '../../Footer';


function PermanenceUpdate({ match }) {

  const dispatch = useDispatch();

  const idPermanence = match.params.idPermanence;

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

  const adresseStructure = structure?.insee?.etablissement?.adresse;
  const urlCartographie = process.env.REACT_APP_CARTOGRAPHIE_URL;


  const [estlieuPrincipal, setEstLieuPrincipal] = useState(null);
  const [defaultCheckedOui, setDefaultCheckedOui] = useState(null);
  const [defaultCheckedNon, setDefaultCheckedNon] = useState(null);

  const updateGeocodeAdress = (maPermanence, prefixId) => {
    const adresseGeoloc = {
      numero: maPermanence?.adresse?.numeroRue,
      rue: maPermanence?.adresse?.rue,
      codePostal: maPermanence?.adresse?.codePostal,
      ville: maPermanence?.adresse?.ville.toUpperCase()
    };

    dispatch(permanenceActions.getGeocodeAdresse(
      adresseGeoloc,
      prefixId)
    );
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
    dispatch(permanenceActions.updateField('principal_ville', null));
    dispatch(permanenceActions.updateField('principal_location', null));
    dispatch(permanenceActions.setHorairesLoading(loadingHoraires));

    if (estStructure) {
      maPermanence = listPermanences.filter(permanence => permanence?.estStructure === true)[0];
      dispatch(permanenceActions.setChampsMaPermanence(
        maPermanence,
        'principal_',
        conseiller)
      );
      updateGeocodeAdress(maPermanence, 'principal_');
    } else {
      dispatch(permanenceActions.rebootGeocodeAdresse(maPermanence.lieuPrincipalPour.includes(conseiller?._id) ? 'principal_' : 'secondaire_0_'));
      dispatch(permanenceActions.disabledField(maPermanence.lieuPrincipalPour.includes(conseiller?._id) ? 'principal_' : 'secondaire_0_', false));
      dispatch(permanenceActions.updateLieuEnregistrable(maPermanence.lieuPrincipalPour.includes(conseiller?._id) ? 'principal_' : 'secondaire_0_'));
      dispatch(permanenceActions.updateField(
        maPermanence.lieuPrincipalPour.includes(conseiller?._id) ? 'principal_checkboxSiret' : 'secondaire_0_checkboxSiret', false
      ));

      if (!maPermanence.lieuPrincipalPour.includes(conseiller?._id)) {
        const show = [true];
        dispatch(permanenceActions.montrerLieuSecondaire(show));
      }

      updateGeocodeAdress(maPermanence, maPermanence.lieuPrincipalPour.includes(conseiller?._id) ? 'principal_' : 'secondaire_0_');
    }
  }

  useEffect(() => {
    if (structure) {
      dispatch(permanenceActions.getListePermanences(structure._id));
    }
    if (!maPermanence) {
      dispatch(permanenceActions.getMaPermanence(idPermanence));
    } else if (conseiller) {
      setEstLieuPrincipal(maPermanence.lieuPrincipalPour.includes(conseiller?._id));
      if (maPermanence.estStructure && maPermanence.lieuPrincipalPour.includes(conseiller?._id)) {
        setDefaultCheckedOui(true);
        setDefaultCheckedNon(false);
      } else {
        setDefaultCheckedNon(true);
        setDefaultCheckedOui(false);
      }

      dispatch(permanenceActions.setChampsMaPermanence(
        maPermanence,
        maPermanence.lieuPrincipalPour.includes(conseiller?._id) ? 'principal_' : 'secondaire_0_',
        conseiller)
      );

      const adresseGeoloc = {
        numero: maPermanence?.adresse?.numeroRue,
        rue: maPermanence?.adresse?.rue,
        codePostal: maPermanence?.adresse?.codePostal,
        ville: maPermanence?.adresse?.ville.toUpperCase()
      };

      dispatch(permanenceActions.getGeocodeAdresse(
        adresseGeoloc,
        maPermanence.lieuPrincipalPour.includes(conseiller?._id) ? 'principal_' : 'secondaire_0_')
      );
      dispatch(permanenceActions.updateLieuEnregistrable(maPermanence.lieuPrincipalPour.includes(conseiller?._id) ? 'principal_' : 'secondaire_0_'));
      dispatch(permanenceActions.updateField(
        maPermanence.lieuPrincipalPour.includes(conseiller?._id) ? 'principal_checkboxSiret' : 'secondaire_0_checkboxSiret', false
      ));
      if (!maPermanence.lieuPrincipalPour.includes(conseiller?._id)) {
        const show = [true];
        dispatch(permanenceActions.montrerLieuSecondaire(show));
      }
    }
  }, [maPermanence, conseiller, structure]);

  useEffect(() => {
    if (isCreated || isUpdated) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        if (redirection === '/mes-lieux-activite') {
          history.push(redirection);
        } else {
          window.open(urlCartographie + '/' + conseiller._id + '/details', '_blank');
        }
        dispatch(permanenceActions.reinitiliserStatut());
        dispatch(permanenceActions.getListePermanences(structure?._id));
      }, 3000);
    }
  }, [isUpdated, isCreated]);

  return (
    <>
      {(!maPermanenceLoading && !maPermanenceError) &&
        <>
          <div id="formulaire-horaires-adresse" >
            <Banner/>

            {(isCreated || isUpdated) &&
              <p className="rf-label flashBag">
                Votre lieu d&rsquo;activit&eacute; a bien &eacute;t&eacute;&nbsp;
                {isCreated && <>cr&eacute;&eacute;</>}
                {isUpdated && <>mis &agrave; jour</>},
                {redirection === '/mes-lieux-activite' &&
                <>
                  &nbsp;vous allez &ecirc;tre redirig&eacute; vers votre liste de lieux d&rsquo;activit&eacute;.
                </>
                }
              </p>
            }

            {showError &&
              <p className="rf-label flashBag invalid">
                {showErrorMessage ?? errorUpdated ?
                  'Une erreur est survenue lors de la mise à jour de votre lieu d’activité' :
                  'Une erreur est survenue lors du traitement de vos informations'}
              </p>
            }

            {(conseiller && maPermanence && structure) &&
              <>
                <ContactProfessionel conseiller={conseiller} />
                <div className="rf-container">
                  <div className="rf-grid-row">
                    {maPermanence.lieuPrincipalPour.includes(conseiller?._id) &&
                      <Recapitulatif
                        nomStructure={structure?.nom}
                        siret={structure?.siret}
                        adresseStructure={adresseStructure}
                      />
                    }
                    <div className="rf-col-1 col-logo">
                      <img className="pin rf-mt-8w" src="/logos/permanences/pin.svg"/>
                    </div>
                    <div className="rf-col-8 ">
                      <h2 className="sous-titre rf-mt-7w rf-mb-4w">
                        {!estlieuPrincipal &&
                        <>
                          Lieu d&rsquo;activit&eacute; secondaire
                          <span className="baseline rf-mt-1w">
                            Un lieu d&rsquo;activit&eacute; secondaire correspond &agrave; une permanence o&ugrave; vous avez &eacute;t&eacute;
                            d&eacute;l&eacute;gu&eacute;(e) et o&ugrave; vous exercez votre activit&eacute; de mani&egrave;re hebdomadaire.
                          </span>
                        </> }
                        {estlieuPrincipal && <> Lieu d&rsquo;activit&eacute; principal </> }
                      </h2>
                    </div>
                    {estlieuPrincipal &&
                      <div className="rf-col-offset-1 rf-col-11">
                        <div className="rf-col-12 rf-mb-7w">
                          Le nom et l&rsquo;adresse de la structure d&rsquo;accueil mentionn&eacute;e ci-dessus est-elle votre&nbsp;
                          <b>lieu d&rsquo;activit&eacute; principal</b> ?&nbsp;
                          <span className="obligatoire">*</span>
                          <fieldset className="rf-fieldset rf-fieldset--inline rf-mt-2w">
                            <div className="rf-fieldset__content">
                              <div className="rf-radio-group">
                                <input type="radio" id="Oui" name="principalLieuActivite" value="Oui" defaultChecked={defaultCheckedOui}
                                  required="required" onClick={() => {
                                    handleAdresse(true);
                                  }}
                                />
                                <label className="rf-label" htmlFor="Oui">
                                  Oui
                                </label>
                              </div>
                              <div className="rf-radio-group">
                                <input type="radio" id="Non" name="principalLieuActivite" value="Non" defaultChecked={defaultCheckedNon}
                                  required="required" onClick={() => {
                                    handleAdresse(false);
                                  }}
                                />
                                <label className="rf-label" htmlFor="Non">
                                  Non
                                </label>
                              </div>
                            </div>
                          </fieldset>
                        </div>
                      </div>
                    }


                    <ListPermanences
                      prefixId={estlieuPrincipal ? 'principal_' : 'secondaire_0_' }
                      conseillerId={conseiller._id}
                      permanenceActuelId={maPermanence._id}
                    />

                    <Adresse
                      codeDepartement={structure?.codeDepartement}
                      prefixId={estlieuPrincipal ? 'principal_' : 'secondaire_0_' }
                      isUpdate={true}
                      permanence={maPermanence}
                      conseillerId={conseiller._id}
                    />
                    <TypeAcces
                      prefixId={estlieuPrincipal ? 'principal_' : 'secondaire_0_' }
                      islieuPrincipal={estlieuPrincipal}
                      permanence={maPermanence}
                      isUpdate={true}
                    />
                    <Horaires
                      prefixId={estlieuPrincipal ? 'principal_' : 'secondaire_0_' }
                      horairesId={0}
                      permanence={maPermanence}
                      isUpdate={true}
                    />
                    <div className="rf-col-12 rf-mt-8w"></div>
                    <Validation
                      conseillerId={conseiller?._id}
                      structureId={structure?._id}
                      redirectionValidation="/mes-lieux-activite"
                      statut={estlieuPrincipal ? 'principal_' : 'secondaire_0_' }
                    />
                  </div>
                </div>
              </>
            }
          </div>
        </>
      }

      <Footer type="support"/>
    </>
  );
}

PermanenceUpdate.propTypes = {
  match: PropTypes.object
};

export default PermanenceUpdate;