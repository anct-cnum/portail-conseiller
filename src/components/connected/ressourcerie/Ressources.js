import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Ressource from './Ressource';

function Ressources({ ressources }) {

  const [cacherMail, setCacherMail] = useState(false);
  const [cacherEchanger, setCacherEchanger] = useState(false);
  const [cacherEmploi, setCacherEmploi] = useState(false);
  const [cacherDemarches, setCacherDemarches] = useState(false);
  const [cacherNaviguer, setCacherNaviguer] = useState(false);
  const [cacherInstaller, setCacherInstaller] = useState(false);
  const [cacherContenus, setCacherContenus] = useState(false);

  const tabMail = [];
  const tabEchanger = [];
  const tabEmploi = [];
  const tabDemarches = [];
  const tabNaviguer = [];
  const tabInstaller = [];
  const tabContenus = [];

  ressources?.forEach(ressource => {
    if (ressource.categorie === 'Mail') {
      tabMail.push(ressource);
    }
    if (ressource.categorie === 'Échanger avec ses proches') {
      tabEchanger.push(ressource);
    }
    if (ressource.categorie === 'Emploi') {
      tabEmploi.push(ressource);
    }
    if (ressource.categorie === 'Démarches en ligne') {
      tabDemarches.push(ressource);
    }
    if (ressource.categorie === 'Naviguer sur internet') {
      tabNaviguer.push(ressource);
    }
    if (ressource.categorie === 'Installer et utiliser des applications utiles sur son smartphone') {
      tabInstaller.push(ressource);
    }
    if (ressource.categorie === 'Créer et gérer ses contenus numériques') {
      tabContenus.push(ressource);
    }
  });

  return (
    <>
      <div className="rf-col-12">
        <hr className="sans-marge"/>
        <div className={cacherMail ? 'aggrandir rf-mt-2w rf-mb-2w' : 'reduire rf-mt-2w rf-mb-2w'} onClick={() => setCacherMail(!cacherMail)}></div>
      </div>
      <h2 className="rf-col-12 titre-thematique rf-mb-9w" id="mail">
        <img className="image-thematique" src="/logos/cra/logo-courriel.svg" alt="Mail" />
        Mail
      </h2>
      {!cacherMail && tabMail?.map((ressource, idx) => {
        return (<Ressource key={idx} ressource={ressource}/>);
      })}

      <div className="rf-col-12">
        <hr className="sans-marge rf-mt-3w"/>
        <div className={cacherEchanger ? 'aggrandir rf-mt-2w rf-mb-2w' : 'reduire rf-mt-2w rf-mb-2w'} onClick={() => setCacherEchanger(!cacherEchanger)}></div>
      </div>
      <h2 className="rf-col-12 titre-thematique rf-mb-9w" id="echange">
        <img className="image-thematique" src="/logos/cra/logo-echanger-proches.svg" alt="Échanger avec ses proches" />
        Échanger avec ses proches
      </h2>
      {!cacherEchanger && tabEchanger?.map((ressource, idx) => {
        return (<Ressource key={idx} ressource={ressource}/>);
      })}

      <div className="rf-col-12">
        <hr className="sans-marge rf-mt-3w"/>
        <div className={cacherEmploi ? 'aggrandir rf-mt-2w rf-mb-2w' : 'reduire rf-mt-2w rf-mb-2w'} onClick={() => setCacherEmploi(!cacherEmploi)}></div>
      </div>
      <h2 className="rf-col-12 titre-thematique rf-mb-9w" id="emploi">
        <img className="image-thematique" src="/logos/cra/logo-trouver-emploi.svg" alt="Emploi" />
        Emploi
      </h2>
      {!cacherEmploi && tabEmploi?.map((ressource, idx) => {
        return (<Ressource key={idx} ressource={ressource}/>);
      })}

      <div className="rf-col-12">
        <hr className="sans-marge rf-mt-3w"/>
        <div className={cacherDemarches ? 'aggrandir rf-mt-2w rf-mb-2w' : 'reduire rf-mt-2w rf-mb-2w'}
          onClick={() => setCacherDemarches(!cacherDemarches)}></div>
      </div>
      <h2 className="rf-col-12 titre-thematique rf-mb-9w" id="demarches">
        <img className="image-thematique" src="/logos/cra/logo-demarche-en-ligne.svg" alt="Démarches en ligne" />
        Démarches en ligne
      </h2>
      {!cacherDemarches && tabDemarches?.map((ressource, idx) => {
        return (<Ressource key={idx} ressource={ressource}/>);
      })}

      <div className="rf-col-12">
        <hr className="sans-marge rf-mt-3w"/>
        <div className={cacherNaviguer ? 'aggrandir rf-mt-2w rf-mb-2w' : 'reduire rf-mt-2w rf-mb-2w'} onClick={() => setCacherNaviguer(!cacherNaviguer)}></div>
      </div>
      <h2 className="rf-col-12 titre-thematique rf-mb-9w" id="naviguer">
        <img className="image-thematique" src="/logos/cra/logo-naviguer-internet.svg" alt="Naviguer sur internet" />
        Naviguer sur internet
      </h2>
      {!cacherNaviguer && tabNaviguer?.map((ressource, idx) => {
        return (<Ressource key={idx} ressource={ressource}/>);
      })}

      <div className="rf-col-12">
        <hr className="sans-marge rf-mt-3w"/>
        <div className={cacherInstaller ? 'aggrandir rf-mt-2w rf-mb-2w' : 'reduire rf-mt-2w rf-mb-2w'}
          onClick={() => setCacherInstaller(!cacherInstaller)}></div>
      </div>
      <h2 className="rf-col-12 titre-thematique rf-mb-9w" id="smartphone">
        <img className="image-thematique" src="/logos/cra/logo-telephone-portable.svg" alt="Installer et utiliser des applications sur son smartphone" />
        Installer et utiliser des applications utiles sur son smartphone</h2>
      {!cacherInstaller && tabInstaller?.map((ressource, idx) => {
        return (<Ressource key={idx} ressource={ressource}/>);
      })}

      <div className="rf-col-12">
        <hr className="sans-marge rf-mt-3w"/>
        <div className={cacherContenus ? 'aggrandir rf-mt-2w rf-mb-2w' : 'reduire rf-mt-2w rf-mb-2w'} onClick={() => setCacherContenus(!cacherContenus)}></div>
      </div>
      <h2 className="rf-col-12 titre-thematique rf-mb-9w" id="contenus">
        <img className="image-thematique" src="/logos/cra/logo-contenus-numeriques.svg" alt="Créer et gérer ses contenus numériques" />
        Créer et gérer ses contenus numériques</h2>
      {!cacherContenus && tabContenus?.map((ressource, idx) => {
        return (<Ressource key={idx} ressource={ressource}/>);
      })}
    </>
  );
}

Ressources.propTypes = {
  ressources: PropTypes.array,
};

export default Ressources;
