import React from 'react';
import { useSelector } from 'react-redux';

function MonPix() {
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const lienPix = `${process.env.REACT_APP_PIX_CONNEXION_URL}`;
  const lienCampagnePix = `${process.env.REACT_APP_PIX_CAMPAGNE_URL}?participantExternalId=${conseiller?.idPG}`;
  return (
    <>
      <h2 className="sous-titre fr-mb-5w"><img src="/logos/home-connected/logo-pix.svg" alt="logo Pix" style={{ height: '60px' }}/></h2>
      <div className="fr-mb-6w">
        <a className="fr-link fr-fi-external-link-line fr-link--icon-right fr-mr-7w"
          href={lienPix}
          target="blank"
          rel="noopener noreferrer"
          title="Passer le test PIX" >
          Passer le test PIX
        </a>
        <a className="fr-link fr-fi-external-link-line fr-link--icon-right"
          href={lienCampagnePix}
          target="blank"
          rel="noopener noreferrer"
          title="Accéder à votre test Pix" >
          Acc&eacute;der &agrave; mes r&eacute;sultats PIX
        </a>
      </div>
      <div className="text-pix">
        <div className="fr-mb-3w">Comment consulter mes r&eacute;sultats PIX ?</div>
        <ul>
          <li>Connectez-vous &agrave; votre compte personnel PIX (adresse mail personnelle).</li>
          <li>Acc&egrave;s page Mes certifications &gt; Rubrique Certification &gt; Voir mes <br/> certifications</li>
        </ul>
      </div>
    </>
  );
}

export default MonPix;
