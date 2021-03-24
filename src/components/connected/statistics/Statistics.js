import React from 'react';

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
            <ElementButton titre="Accueil"/>
          </div>
          <div className="rf-col-4">
            <ElementButton titre="Enregistrer un nouvel accompagnement"/>
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
/*
          */
