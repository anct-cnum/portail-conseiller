import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Validation from './Validation';
import Remerciement from './Remerciement';
import Footer from '../../Footer';
import { useLocation } from 'react-router-dom';
import Banner from './Banner';
import ContactProfessionel from './ContactProfessionel';
import PermanenceSecondaire from './PermanenceSecondaire';
import PermanencePrincipale from './PermanencePrincipale';
import { permanenceActions } from '../../../actions';

function Permanence() {
  const dispatch = useDispatch();
  const location = useLocation();

  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const structure = useSelector(state => state.structure?.structure);

  const showError = useSelector(state => state.permanence?.showError);
  const showErrorMessage = useSelector(state => state.permanence?.showErrorMessage);
  const isEnded = useSelector(state => state.permanence?.isEnded);

  useEffect(() => {
    if (structure?._id) {
      dispatch(permanenceActions.getListePermanences(structure?._id));
    }

  }, [structure?._id]);

  return (
    <>

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

        <ContactProfessionel />
        <div className="rf-container">
          <div className="rf-grid-row">
            <PermanencePrincipale structure={structure} conseillerId={conseiller?._id}/>
          </div>
        </div>
        <PermanenceSecondaire structure={structure} conseillerId={conseiller?._id} structureId={structure?._id} />
        <div className="rf-container">
          <div className="rf-grid-row">
            <Validation conseillerId={conseiller?._id} structureId={structure?._id} />
          </div>
        </div>
      </div>
      <Footer type="support"/>
    </>
  );
}

export default Permanence;

