import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Oval } from 'react-loader-spinner';

import { permanenceActions, conseillerActions } from '../../../actions';
import { userEntityId } from '../../../helpers';

import Banner from './Banner';
import ContactProfessionel from './ContactProfessionel';
import ListPermanences from './ListPermanences';
import Adresse from './Adresse';
import TypeAcces from './TypeAcces';
import Horaires from './Horaires';
import Validation from './Validation';
import Footer from '../../Footer';
import ValidationImpossible from './ValidationImpossible';

function PermanenceCreate() {
  const dispatch = useDispatch();

  const urlCartographie = import.meta.env.VITE_APP_CARTOGRAPHIE_URL;

  const loading = useSelector(state => state.permanence?.loading);
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const structure = useSelector(state => state.structure?.structure);

  const showError = useSelector(state => state.permanence?.showError);
  const showErrorMessage = useSelector(state => state.permanence?.showErrorMessage);
  const errorCreate = useSelector(state => state.permanence?.error);
  const isCreated = useSelector(state => state.permanence?.isCreated);
  const isUpdated = useSelector(state => state.permanence?.isUpdated);
  const redirection = useSelector(state => state.permanence?.redirection);
  const existsPermanence = useSelector(state => state.permanence?.existsPermanence);

  useEffect(() => {
    const show = [true];
    dispatch(permanenceActions.reloadList(true));
    dispatch(permanenceActions.montrerLieuSecondaire(show));
    dispatch(permanenceActions.updateField('estStructure', false));
    dispatch(permanenceActions.updateLieuEnregistrable('secondaire_0_'));
    if (structure) {
      dispatch(permanenceActions.getListePermanences(structure?._id));
    }
    if (conseiller) {
      dispatch(permanenceActions.updateField('telephonePro', conseiller?.telephonePro));
      dispatch(permanenceActions.updateField('emailPro', conseiller?.emailPro));
    }
  }, [structure, conseiller]);

  useEffect(() => {
    if (isCreated || isUpdated) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        if (redirection !== '/mes-lieux-activite') {
          window.open(urlCartographie + '/' + redirection + '/details', '_blank', 'noopener,noreferrer');
        }
        dispatch(conseillerActions.get(userEntityId()));
        dispatch(permanenceActions.reinitiliserStatut());
        dispatch(permanenceActions.getListePermanences(structure?._id));
        window.location.pathname = '/mes-lieux-activite';
      }, 3000);
    }
  }, [isCreated, isUpdated]);

  return (
    <>
      <div className="spinnerCustom">
        <Oval
          color="#00BFFF"
          height={100}
          width={100}
          visible={loading === true }
        />
      </div>
      <div id="formulaire-horaires-adresse" >
        <Banner/>
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
            {showErrorMessage ?? errorCreate ?
              'Une erreur est survenue lors de la création de votre lieu d’activité.' :
              'Une erreur est survenue lors du traitement de vos informations.'}
              &nbsp;{errorCreate}
          </p>
        }

        {(conseiller && !conseiller?.hasPermanence && structure) &&
          <div className="fr-container">
            <div className="fr-grid-row">
              <div className="fr-col-12 fr-ml-12w">
                <h2 className="titre-acces fr-my-9w ">Vous n&rsquo;avez pas acc&egrave;s &agrave; ce formulaire pour le moment !</h2>
              </div>
            </div>
          </div>
        }
        {(conseiller && conseiller?.hasPermanence && structure) &&
          <>
            <ContactProfessionel conseiller={conseiller} />
            <div className="fr-container">
              <div className="fr-grid-row">
                <div className="fr-col-1 fr-mt-1w col-logo">
                  <img className="pin" src="/logos/permanences/pin.svg"/>
                </div>
                <div className="fr-col-8 ">
                  <h2 className="sous-titre fr-mb-4w">
                    Lieu d&rsquo;activit&eacute; secondaire
                    <span className="baseline fr-mt-1w">
                      Un lieu d&rsquo;activit&eacute; secondaire correspond &agrave; une permanence o&ugrave; vous avez &eacute;t&eacute;
                      d&eacute;l&eacute;gu&eacute;(e) et o&ugrave; vous exercez votre activit&eacute; de mani&egrave;re hebdomadaire.
                    </span>
                  </h2>
                </div>
                {existsPermanence &&
                  <div className="fr-col-offset-1 fr-col-11 fr-mb-4w invalid permanenceExiste">
                      Une permanence a d&eacute;j&agrave; &eacute;t&eacute; cr&eacute;&eacute;e avec les coordonn&eacute;es que vous proposez.<br/>
                      Merci de renseigner une nouvelle adresse ou de vous ajouter sur le lieu existant&nbsp;!
                  </div>
                }
                <ListPermanences
                  prefixId="secondaire_0_"
                  conseillerId={conseiller?._id}
                />

                <Adresse
                  codeDepartement={structure?.codeDepartement}
                  prefixId="secondaire_0_"
                  permanence={null}
                />

                <TypeAcces
                  prefixId="secondaire_0_"
                  islieuPrincipal={false}
                  permanence={null}
                  isUpdate={true}
                />
                <Horaires
                  prefixId="secondaire_0_"
                  horairesId={0}
                  permanence={null}
                />
                <div className="fr-col-12 fr-mt-8w"></div>
                {!existsPermanence &&
                  <Validation
                    conseillerId={conseiller?._id}
                    structureId={structure?._id}
                    redirectionValidation="/mes-lieux-activite"
                    statut="secondaire_0_"
                    codeDepartement={structure?.codeDepartement}
                  />
                }
                {existsPermanence &&
                  <ValidationImpossible statut="secondaire_0_"/>
                }
              </div>
            </div>
          </>
        }
      </div>
      <Footer type="support"/>
    </>
  );
}

export default PermanenceCreate;
