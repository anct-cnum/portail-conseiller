import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { conseillerActions, permanenceActions } from '../../../actions';
import { userEntityId } from '../../../helpers';


import PermanenceSecondaireUpdate from './PermanenceSecondaireUpdate';
import ContactProfessionel from './ContactProfessionel';
import PermanencePrincipale from './PermanencePrincipale';
import PermanenceSecondaire from './PermanenceSecondaire';
import Remerciement from './Remerciement';
import Validation from './Validation';
import Ouverture from './Ouverture';
import Footer from '../../Footer';
import Banner from './Banner';

function Permanence() {
  const dispatch = useDispatch();

  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const structure = useSelector(state => state.structure?.structure);
  const listPermanences = useSelector(state => state.permanence?.permanences);

  const showError = useSelector(state => state.permanence?.showError);
  const showErrorMessage = useSelector(state => state.permanence?.showErrorMessage);
  const isEnded = useSelector(state => state.permanence?.isEnded);

  const isDeleted = useSelector(state => state.permanence.isDeleted);
  const isConseillerDeleted = useSelector(state => state.permanence.isConseillerDeleted);

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
  }, [isDeleted, isConseillerDeleted]);

  return (
    <>
      {conseiller &&
      <>
        { location.pathname !== '/lieux-activite' &&
          <Ouverture />
        }

        { (isEnded && location.pathname === '/accueil') &&
          <Remerciement/>
        }
        <div id="formulaire-horaires-adresse" >
          <Banner />

          {showError &&
            <p className="rf-label flashBag invalid">
              {showErrorMessage ?? 'Une erreur est survenue lors du traitement de vos informations'}
            </p>
          }

          {isDeleted &&
            <p className="rf-label flashBag">
              Le lieu d&rsquo;activit&eacute; &agrave; bien &eacute;t&eacute; supprim&eacute;.
            </p>
          }

          {isConseillerDeleted &&
            <p className="rf-label flashBag">
              Vous avez bien &eacute;t&eacute; retir&eacute; du lieu d&rsquo;activit&eacute;.
            </p>
          }

          <ContactProfessionel conseiller={conseiller} />
          <div className="rf-container">
            <div className="rf-grid-row">
              <PermanencePrincipale structure={structure} conseillerId={conseiller?._id} isUpdate={conseiller?.hasPermanence}/>
            </div>
          </div>
          {!conseiller?.hasPermanence &&
          <PermanenceSecondaire structure={structure}
            conseillerId={conseiller?._id} structureId={structure?._id}
            isUpdate={location.pathname === '/lieux-activite'}/>
          }
          {(conseiller?.hasPermanence && listPermanences) &&
            <PermanenceSecondaireUpdate conseillerId={conseiller?._id} permanences={listPermanences}/>
          }
          <div className="rf-container">
            <div className="rf-grid-row">
              <Validation conseillerId={conseiller?._id} structureId={structure?._id}
                isUpdate={conseiller?.hasPermanence} permanences={listPermanences}/>
            </div>
          </div>
        </div>
        <Footer type="support"/>
      </>
      }
    </>
  );
}

export default Permanence;

