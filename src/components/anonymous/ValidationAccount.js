import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

function ValidationAccount() {

  function handleSubmit() {
    //TODO dispatch choose password and go to last step
  }

  return (
    <div className="validationAccount">
      <Header linkAccount="toto@gmail.com"/>
      {/* Start content */}
      <div className="rf-container" style={{ backgroundColor: '#2a2a2a', margin: '0px', maxWidth: 'unset' }}>
        <div className="rf-grid-row rf-grid-row--top rf-grid-row--center rf-mb-5w">
          <div className="rf-col-1"></div>
          {/* Title */}
          <div className="rf-col-10 rf-mt-12w" style={{ textAlign: 'center' }}>
            <h2 style={{ margin: '0' }}>Vos coordonnées professionnelles</h2>
          </div>
          <div className="rf-col-1"></div>
        </div>
        <div className="rf-grid-row rf-grid-row--center rf-mb-7w">
          <div className="rf-col-3"></div>
          <div className="rf-col-6" style={{ textAlign: 'center' }}>
            <p>
              <strong>Vous y êtes presque ! Après votre validation, vous accéderez à la visualisation intéractive des conseillers numériques France Services,
                ainsi qu&rsquo;aux ressources qui vous permettront de démarrer votre activité dans les meilleures conditions.
                Une fois que vous êtes connecté(e), il vous est également possible de modifier vos données personnelles (nom, prénom).
              </strong>
            </p>
          </div>
          <div className="rf-col-3"></div>
        </div>
        <div className="rf-grid-row rf-grid-row--center rf-pb-12w">
          <div className="rf-col-3"></div>
          <div className="rf-col-6" style={{ textAlign: 'center', color: '#BFBFE3' }}>
            <p className="rf-mb-4w">
              <strong>Jonathan Dupond</strong>
            </p>
            <p className="rf-mb-4w">
              <strong>CCAS de Strasbourg</strong>
            </p>
            <p className="rf-mb-4w">
              <strong>5 rue des paquerettes</strong>
            </p>
            <p className="rf-mb-4w">
              <strong>67000</strong>
            </p>
            <p className="rf-mb-7w" style={{ textTransform: 'uppercase' }}>
              <strong>strasbourg</strong>
            </p>
            <p className="rf-pb-3w">
              <button className="rf-btn rf-text--bold big-btn finalButton" onClick={handleSubmit}
                style={{ background: 'white', width: '50%' }}>Finaliser mon accès</button>
            </p>
          </div>
          <div className="rf-col-3"></div>
        </div>
      </div>
      {/* End content */}
      <Footer type="support"/>
    </div>
  );

}

export default ValidationAccount;
