import React from 'react';
import CodePostal from './CodePostal';
import Canal from './Canal';
import Activite from './Activite';
import Age from './Age';
import Themes from './Themes';
import Statut from './Statut';
import Duree from './Duree';
import Accompagnement from './Accompagnement';
import ValidationButton from './Components/ValidationButton';
import Footer from '../../Footer';

function Cra() {

  return (
    <>
      <div className="rf-container cra">
        <div className="rf-grid-row rf-grid-row--center rf-my-md-12w rf-pt-1w rf-pb-3w">
          <h1 className="titre">Mon suivi d&rsquo;activité</h1>
        </div>
        <CodePostal/>
        <Canal/>
        <Activite/>
        <Age/>
        <Statut/>
        <Themes/>
        <Duree/>
        <Accompagnement/>
        <ValidationButton/>
      </div>
      <Footer type="support"/>
    </>
  );
}

export default Cra;
