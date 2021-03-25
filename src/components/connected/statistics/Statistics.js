import React from 'react';
import { history } from '../../../helpers';

import ElementButton from './ElementButton';
import LeftPage from './LeftPage';
import RightPage from './RightPage';
import BottomPage from './BottomPage';

function Statistics() {

  return (
    <div className="Statistics">
      <div className="rf-container">
        <div className="rf-grid-row">
          <div className="rf-col-6">
            <h2>Vos Statistiques</h2>
          </div>
          <div className="rf-col-2">
            <ElementButton titre="Accueil" onClick={() => history.push('/') }/>
          </div>
          <div className="rf-col-4">
            <ElementButton titre="Enregistrer un nouvel accompagnement" onClick={() => history.push('/compte-rendu-activite')}/>
          </div>
          <div className="rf-col-4">
            <LeftPage/>
          </div>
          <div className="rf-col-8">
            <RightPage/>
          </div>
          <div className="rf-col-12">
            <BottomPage/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
