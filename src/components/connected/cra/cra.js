import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../../Header';
import Footer from '../../Footer';

function Cra() {

  const user = useSelector(state => state.authentication.user.user);

  return (
    <>
      <Header linkAccount={user?.name}/>
      <div className="rf-container">
        <div className="rf-grid-row rf-grid-row--center rf-my-7w">
          <span>sasie du cra...</span>
        </div>
      </div>
      <Footer type="support" titreBouton="Donner mon avis sur cette page"/>
    </>
  );
}

export default Cra;
