import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-loader-spinner';
import { conseillerActions, permanenceActions } from '../../../actions';
import { userEntityId, history } from '../../../helpers';

import ContactProfessionel from './ContactProfessionel';
import PermanencePrincipale from './PermanencePrincipale';
import PermanenceSecondaire from './PermanenceSecondaire';
import Remerciement from './Remerciement';
import Validation from './Validation';
import Ouverture from './Ouverture';
import Footer from '../../Footer';
import Banner from './Banner';
import ValidationImpossible from './ValidationImpossible';

function Permanence() {
  const dispatch = useDispatch();
  const urlCartographie = process.env.REACT_APP_CARTOGRAPHIE_URL;
  const loading = useSelector(state => state.permanence?.loading);
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const structure = useSelector(state => state.structure?.structure);
  const listPermanences = useSelector(state => state.permanence?.permanences);

  const showError = useSelector(state => state.permanence?.showError);
  const showErrorMessage = useSelector(state => state.permanence?.showErrorMessage);
  const showErrorCreate = useSelector(state => state.permanence?.error);
  const errorAllUpdated = useSelector(state => state.permanence?.errorAllUpdated);
  const isEnded = useSelector(state => state.permanence?.isEnded);

  const isDeleted = useSelector(state => state.permanence?.isDeleted);
  const isConseillerDeleted = useSelector(state => state.permanence?.isConseillerDeleted);
  const isAllUpdated = useSelector(state => state.permanence?.isAllUpdated);
  const redirection = useSelector(state => state.permanence?.redirection);
  const existsPermanence = useSelector(state => state.permanence?.existsPermanence);

  // eslint-disable-next-line max-len
  const permanencePrincipale = listPermanences && listPermanences?.find(permanence => permanence?.lieuPrincipalPour?.includes(conseiller?._id));

  useEffect(() => {
    if (!conseiller) {
      dispatch(conseillerActions.get(userEntityId()));
    }
    if (structure?._id) {
      dispatch(permanenceActions.getListePermanences(structure?._id));
    }
  }, [structure?._id]);

  useEffect(() => {
    if (isConseillerDeleted || isDeleted) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        dispatch(permanenceActions.getListePermanences(structure?._id));
      }, 3000);
    }
    if (isAllUpdated) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        if (redirection !== '/accueil') {
          window.open(urlCartographie + '/' + redirection + '/details', '_blank', 'noopener,noreferrer');
        }
        dispatch(permanenceActions.getListePermanences(structure?._id));
        history.push('/mes-lieux-activite');
      }, 3000);
    }
  }, [isDeleted, isConseillerDeleted, isAllUpdated]);

  return (
    <>
      <div className="spinnerCustom">
        <Spinner
          type="Oval"
          color="#00BFFF"
          height={100}
          width={100}
          visible={loading === true }
        />
      </div>
      {conseiller &&
      <>
        { location.pathname !== '/lieux-activite' &&
          <Ouverture />
        }

        { (isEnded && (location.pathname === '/accueil' || location.pathname === '/mes-lieux-activite')) &&
          <Remerciement/>
        }
        { ((location.pathname === '/lieux-activite' && conseiller?.hasPermanence) ||
          (location.pathname !== '/lieux-activite' && !conseiller?.hasPermanence)) &&
          <div id="formulaire-horaires-adresse" >
            <Banner />

            {showError &&
              <p className="fr-label flashBag invalid">
                {showErrorMessage &&
                  showErrorMessage
                }
                {showErrorCreate &&
                  showErrorCreate
                }
                {errorAllUpdated &&
                  'Une erreur est survenue lors de la mise à jour de vos lieux d’activité'
                }
              </p>
            }

            {isDeleted &&
              <p className="fr-label flashBag">
                Le lieu d&rsquo;activit&eacute; &agrave; bien &eacute;t&eacute; supprim&eacute;.
              </p>
            }

            {isConseillerDeleted &&
              <p className="fr-label flashBag">
                Vous avez bien &eacute;t&eacute; retir&eacute; du lieu d&rsquo;activit&eacute;.
              </p>
            }

            {isAllUpdated &&
              <p className="fr-label flashBag">
                Vos lieux d&rsquo;activit&eacute; ont bien &eacute;t&eacute; mis &agrave; jour.
              </p>
            }

            <ContactProfessionel conseiller={conseiller} />

            {existsPermanence &&
              <div className="fr-col-offset-1 fr-col-11 fr-mb-4w invalid permanenceExiste">
                  Une permanence a déjà été créée avec les coordonnées que vous proposez.<br/>
                  Merci de renseigner une nouvelle adresse ou de vous ajouter sur le lieu existant !
              </div>
            }

            <div className="fr-container">
              <div className="fr-grid-row">
                {!permanencePrincipale &&
                  <PermanencePrincipale structure={structure} conseillerId={conseiller?._id} isUpdate={conseiller?.hasPermanence}/>
                }
                {permanencePrincipale &&
                  <>
                    <div className="fr-col-1 col-logo fr-mt-10w">
                      <img className="pin" src="logos/permanences/pin.svg"/>
                    </div>
                    <div className="fr-col-11">
                      <h2 className="sous-titre fr-mt-9w fr-mb-7w">Votre lieu d&rsquo;activit&eacute; principal</h2>
                      <h4>Votre lieu principal d&rsquo;activit&eacute; &agrave; bien &eacute;t&eacute; enregistr&eacute;</h4>
                    </div>
                  </>
                }
              </div>
            </div>

            <PermanenceSecondaire structure={structure}
              conseillerId={conseiller?._id} structureId={structure?._id}
              isUpdate={location.pathname === '/lieux-activite'}
              codeDepartement={conseiller?.codeDepartementStructure}
            />

            <div className="fr-container">
              <div className="fr-grid-row">
                {!existsPermanence &&
                  <Validation conseillerId={conseiller?._id} structureId={structure?._id}
                    isUpdate={conseiller?.hasPermanence} permanences={listPermanences} statut={null}/>
                }
                {existsPermanence &&
                  <ValidationImpossible statut={null}/>
                }
              </div>
            </div>
          </div>
        }
        { ((location.pathname === '/lieux-activite' && !conseiller?.hasPermanence) ||
          (location.pathname !== '/lieux-activite' && conseiller?.hasPermanence)) &&
          <div id="formulaire-horaires-adresse" >
            <Banner />
            <div className="fr-container">
              <div className="fr-grid-row">
                <div className="fr-col-12 fr-ml-12w">
                  <h2 className="titre-acces fr-my-9w ">Vous n&rsquo;avez pas acc&egrave;s &agrave; ce formulaire pour le moment !</h2>
                </div>
              </div>
            </div>
          </div>
        }
        <Footer type="support"/>
      </>
      }
    </>
  );
}

export default Permanence;

