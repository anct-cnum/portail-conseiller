import React from 'react';
import Thematiques from './Thematiques';
import Tags from './Tags';

function Ressourcerie() {

  return (
    <div className="ressourcerie">
      <div className="rf-container">
        <div className="rf-grid-row">
          <div className="rf-col-12 rf-col-md-10">
            <h1 className="titre rf-mt-2w rf-mb-1w rf-mt-md-5w rf-mb-md-6w">Ressourcerie</h1>
          </div>
          <div className="rf-col-6">
            <Thematiques />
          </div>
          <div className="rf-col-offset-1 rf-col-5">
            <Tags />
          </div>
          <div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Ressourcerie;
