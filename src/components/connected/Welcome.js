import React from 'react';
import Footer from '../Footer';

function Welcome() {

  return (
    <>
      <div className="rf-container cra">
        <div className="rf-grid-row rf-grid-row--center rf-my-md-12w rf-pt-1w rf-pb-3w">
          <h1 className="titre">Bienvenue dans votre espace !</h1>
        </div>
        <div className="rf-grid-row rf-grid-row--center rf-my-md-12w rf-pt-1w rf-pb-3w">
          <p>Vous pouvez ici saisir vos accompagnements et consulter vos statistiques associées</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Welcome;
