import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../../Header';
import Footer from '../../Footer';
import SelectCP from './Components/SelectCP';

function Cra() {

  const user = useSelector(state => state.authentication.user.user);

  return (
    <>
      <Header linkAccount={user?.name}/>
      <div className="rf-container cra">
        <div className="rf-grid-row rf-grid-row--center rf-my-md-12w rf-pt-1w rf-pb-3w">
          <span className="titre">Mon suivi d&rsquo;activité</span>
        </div>
        <div className="rf-grid-row rf-grid-row--gutters rf-grid-row--middle rf-mb-7w">
          <div className="rf-col-1"></div>
          <div className="rf-col-xs-10 rf-col-sm-10 rf-col-md-2">
            <span className="question">Où l&rsquo;accompagnement a-t-il eu lieu ?</span>
          </div>
          <div className="responsiveSelect">
            <SelectCP/>
          </div>
        </div>
      </div>
      <Footer type="support" titreBouton="Donner mon avis sur cette page"/>
    </>
  );
}

export default Cra;
