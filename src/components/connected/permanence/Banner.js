import React from 'react';

function Banner() {
  return (
    <div className="banniere">
      <div className="rf-container">
        <div className="rf-grid-row">
          <div className="rf-col-offset-1 rf-col-11">
            <h1 className="titre rf-mt-9w rf-mb-6w">Données de localisation et contacts</h1>
          </div>
          <div className="rf-col-offset-1 rf-col-6 texte-banniere rf-mb-7w">
            <span className="important violet">Dans cette page, vous renseignez :</span><br/><br/>
            Vos <span className="important blanc">lieux d’activité</span>, ceux-ci seront visibles sur la carte nationale des conseillers numériques.<br/><br/>
            Les <span className="important vert">informations professionnelles</span> qui serviront à vous donner de la visibilité auprès de vos publics,
             celles-ci seront visibles sur la carte.
          </div>
          <div className="rf-col-5">
            <img src=""/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
