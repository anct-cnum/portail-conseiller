import React, { useEffect } from 'react';
import Thematiques from './Thematiques';
import Tags from './Tags';
import Ressources from './Ressources';
import DerniersAjouts from './DerniersAjouts';
import Footer from '../../Footer';
import { useDispatch, useSelector } from 'react-redux';
import { ressourcesActions } from '../../../actions/ressources.actions';
import ReactTooltip from 'react-tooltip';

function Ressourcerie() {

  const dispatch = useDispatch();

  const ressources = useSelector(state => state.ressources?.ressources);
  const ressourcesLoading = useSelector(state => state.ressources?.ressourcesLoading);
  const ressourcesError = useSelector(state => state.ressources?.ressourcesError);

  const dernierAjout = ressources?.slice(-4);

  useEffect(() => {
    dispatch(ressourcesActions.getRessources());
  }, []);

  return (
    <div className="ressourcerie">
      <div className="rf-container">
        <div className="rf-grid-row">
          <div className="rf-col-12 rf-col-md-10">
            <h1 className="titre rf-mt-2w rf-mb-1w rf-mt-md-5w rf-mb-md-6w">Ressourcerie</h1>
          </div>
          {ressourcesLoading &&
            <div>Chargement de la ressourcerie ...</div>
          }
          {ressourcesError &&
            <div>Erreur lors du chargement de la ressourcerie, veuillez réessayer !</div>
          }
          {(!ressourcesLoading && !ressourcesError) &&
          <>
            <div className="rf-col-6">
              <Thematiques />
              <DerniersAjouts ressources={dernierAjout}/>
            </div>
            <div className="rf-col-6 prochainement" data-tip="
              <img class='infobulle-image' src='/logos/abeille-roue.png'/>
              <div><b>En travaux !</b></div>
              <div>Cette fonctionnalité sera disponible prochainement.</div>">
              <Tags />
            </div>
            <ReactTooltip html={true} className="infobulle" arrowColor="white"/>
          </>
          }
        </div>
      </div>
      {(!ressourcesLoading && !ressourcesError) &&
        <div className="ressources">
          <div className="rf-container">
            <div className="rf-grid-row">
              <Ressources ressources={ressources} />
            </div>
          </div>
        </div>
      }
      <Footer type="support" titreBouton="Donner mon avis sur cette page" />
    </div>
  );
}

export default Ressourcerie;
