import React from 'react';

function Banner() {
  return (
    <div className="banniere">
      <div className="rf-container">
        <div className="rf-grid-row">
          <div className="rf-col-offset-1 rf-col-11">
            <h1 className="titre rf-mt-9w rf-mb-6w">Donn&eacute;es de localisation et contacts</h1>
          </div>
          <div className="rf-col-1 col-logo"><br/><br/>
            <img className="pin" src="/logos/permanences/pin.svg"/>
            <br/>
            <img className="hexagone" src="/logos/permanences/hexagone.svg"/>
          </div>
          <div className="rf-col-11 rf-col-md-6 texte-banniere rf-mb-7w">
            <span className="important violet">Dans cette page, vous renseignez :</span><br/><br/>
            Vos <span className="important blanc">lieux d&rsquo;activit&eacute;</span>,
            ceux-ci seront visibles sur la carte nationale des conseillers num&eacute;riques.<br/><br/>
            Les <span className="important vert">informations professionnelles</span> qui serviront &agrave;
            vous donner de la visibilit&eacute; aupr&egrave;s de vos publics,
             celles-ci seront visibles sur la carte.
          </div>
          <div className="rf-col-12 rf-col-md-5 rf-mb-7w carte-banniere">
            <img src="/logos/permanences/cartographie-cnfs.svg"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
