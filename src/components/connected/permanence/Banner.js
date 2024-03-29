import React from 'react';
import { useLocation } from 'react-router-dom';

function Banner() {
  const location = useLocation();
  return (
    <div className="banniere">
      <div className="fr-container">
        <div className="fr-grid-row">
          <div className="fr-col-offset-1 fr-col-11">
            <h1 className="titre fr-mt-9w fr-mb-6w">Donn&eacute;es de localisation et contacts</h1>
          </div>
          <div className="fr-col-1 col-logo"><br/><br/>
            <img className="pin" src="/logos/permanences/pin.svg"/>
            <br/>
            <img className="hexagone" src="/logos/permanences/hexagone.svg"/>
          </div>
          <div className="fr-col-11 fr-col-md-6 texte-banniere fr-mb-7w">
            <span className="important violet">Dans cette page, vous renseignez :</span><br/><br/>
            {location.pathname === 'mes-lieux-activite' &&
            <>
              <span className="important blanc">Vos lieux d&rsquo;activit&eacute;</span>,
              ceux-ci seront visibles sur la carte nationale des conseillers num&eacute;riques.
            </>
            }
            {location.pathname !== 'mes-lieux-activite' &&
              <><span className="important blanc">Votre lieu d&rsquo;activit&eacute;</span>,
              celui-ci sera visible sur la carte nationale des conseillers num&eacute;riques.
              </>
            }
            <br/><br/>
             Les <span className="important vert">informations professionnelles</span> qui serviront &agrave;
            vous donner de la visibilit&eacute; aupr&egrave;s de vos publics,
             celles-ci seront visibles sur la carte.
          </div>
          <div className="fr-col-12 fr-col-md-5 fr-mb-7w carte-banniere">
            <img src="/logos/permanences/cartographie-cnfs.svg"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
