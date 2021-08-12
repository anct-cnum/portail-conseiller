import React from 'react';
import Footer from '../Footer';

function Welcome() {
  return (
    <>
      <div className="welcome">
        <div className="rf-container">
          <div className="rf-grid-row rf-grid-row--center">

            <div className="rf-col-12 rf-col-md-10">
              <h1 className="titre rf-mt-2w rf-mb-1w rf-mt-md-5w rf-mb-md-8w">Bienvenue sur <br className="br-sm"/>l&rsquo;Espace Coop</h1>
            </div>

            <div className="rf-col-12 rf-mb-md-6w"></div>
          </div>
        </div>
      </div>
      <Footer type="support"/>
    </>
  );
}

export default Welcome;
