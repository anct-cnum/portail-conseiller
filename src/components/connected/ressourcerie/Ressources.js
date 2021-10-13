import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Ressource from './Ressource';

function Ressources({ ressources }) {

  const [cacherMail, setCacherMail] = useState(false);
  const [cacherEchanger, setCacherEchanger] = useState(false);
  const [cacherEmploi, setCacherEmploi] = useState(false);
  const [cacherDemarches, setCacherDemarches] = useState(false);
  const [cacherSmartphone, setCacherSmartphone] = useState(false);
  const [cacherContenus, setCacherContenus] = useState(false);
  const [cacherTraitement, setCacherTraitement] = useState(false);
  const [cacherAccompagner, setCacherAccompagner] = useState(false);
  const [cacherEquipement, setCacherEquipement] = useState(false);
  const [cacherCNIL, setCacherCNIL] = useState(false);

  const tabMail = ressources?.filter(ressource => ressource.categorie === 'Courriel');
  const tabEchanger = ressources?.filter(ressource => ressource.categorie === 'Échanger avec ses proches');
  const tabEmploi = ressources?.filter(ressource => ressource.categorie === 'Emploi');
  const tabDemarches = ressources?.filter(ressource => ressource.categorie === 'Démarches en ligne');
  const tabTraitement = ressources?.filter(ressource => ressource.categorie === 'Traitement de texte');
  const tabSmartphone = ressources?.filter(ressource => ressource.categorie === 'Smartphone, applications mobile');
  const tabContenus = ressources?.filter(ressource => ressource.categorie === 'Créer et gérer ses contenus numériques');
  const tabAccompagner = ressources?.filter(ressource => ressource.categorie === 'Accompagner son enfant');
  const tabEquipement = ressources?.filter(ressource => ressource.categorie === 'Prendre en main un équipement informatique');
  const tabCNIL = ressources?.filter(ressource => ressource.categorie === 'Fiches CNIL');

  return (
    <>
      <div className="rf-col-12">
        <hr className="sans-marge"/>
        <div className={cacherMail ? 'aggrandir rf-mt-2w rf-mb-2w' : 'reduire rf-mt-2w rf-mb-2w'} onClick={() => setCacherMail(!cacherMail)}></div>
      </div>
      <h2 className="rf-col-12 titre-thematique rf-mb-9w" id="mail">
        <img className="image-thematique" src="/logos/cra/logo-courriel.svg" alt="Courriel" />
        Courriel
      </h2>
      {!cacherMail && tabMail?.map((ressource, idx) => {
        return (<Ressource key={idx} ressource={ressource}/>);
      })}

      <div className="rf-col-12">
        <hr className="sans-marge rf-mt-3w"/>
        <div className={cacherEchanger ? 'aggrandir rf-mt-2w rf-mb-2w' : 'reduire rf-mt-2w rf-mb-2w'} onClick={() => setCacherEchanger(!cacherEchanger)}></div>
      </div>
      <h2 className="rf-col-12 titre-thematique rf-mb-9w" id="echange">
        <img className="image-thematique" src="/logos/cra/logo-echanger-proches.svg" alt="&Eacute;changer avec ses proches" />
        &Eacute;changer avec ses proches
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
        <img className="image-thematique" src="/logos/cra/logo-demarche-en-ligne.svg" alt="D&eacute;marches en ligne" />
        D&eacute;marches en ligne
      </h2>
      {!cacherDemarches && tabDemarches?.map((ressource, idx) => {
        return (<Ressource key={idx} ressource={ressource}/>);
      })}

      <div className="rf-col-12">
        <hr className="sans-marge rf-mt-3w"/>
        <div className={cacherTraitement ? 'aggrandir rf-mt-2w rf-mb-2w' : 'reduire rf-mt-2w rf-mb-2w'}
          onClick={() => setCacherTraitement(!cacherTraitement)}></div>
      </div>
      <h2 className="rf-col-12 titre-thematique rf-mb-9w" id="traitement">
        <img className="image-thematique" src="/logos/cra/logo-traitement-texte.svg" alt="Apprendre les bases du traitement de texte" />
        Traitement de texte
      </h2>
      {!cacherTraitement && tabTraitement?.map((ressource, idx) => {
        return (<Ressource key={idx} ressource={ressource}/>);
      })}

      <div className="rf-col-12">
        <hr className="sans-marge rf-mt-3w"/>
        <div className={cacherSmartphone ? 'aggrandir rf-mt-2w rf-mb-2w' : 'reduire rf-mt-2w rf-mb-2w'}
          onClick={() => setCacherSmartphone(!cacherSmartphone)}></div>
      </div>
      <h2 className="rf-col-12 titre-thematique rf-mb-9w" id="smartphone">
        <img className="image-thematique" src="/logos/cra/logo-telephone-portable.svg" alt="Installer et utiliser des applications sur son smartphone" />
        Smartphone, applications mobile
      </h2>
      {!cacherSmartphone && tabSmartphone?.map((ressource, idx) => {
        return (<Ressource key={idx} ressource={ressource}/>);
      })}

      <div className="rf-col-12">
        <hr className="sans-marge rf-mt-3w"/>
        <div className={cacherContenus ? 'aggrandir rf-mt-2w rf-mb-2w' : 'reduire rf-mt-2w rf-mb-2w'} onClick={() => setCacherContenus(!cacherContenus)}></div>
      </div>
      <h2 className="rf-col-12 titre-thematique rf-mb-9w" id="contenus">
        <img className="image-thematique" src="/logos/cra/logo-contenus-numeriques.svg" alt="Cr&eacute;er et g&eacute;rer ses contenus num&eacute;riques" />
        Cr&eacute;er et g&eacute;rer ses contenus num&eacute;riques</h2>
      {!cacherContenus && tabContenus?.map((ressource, idx) => {
        return (<Ressource key={idx} ressource={ressource}/>);
      })}

      <div className="rf-col-12">
        <hr className="sans-marge rf-mt-3w"/>
        <div className={cacherAccompagner ? 'aggrandir rf-mt-2w rf-mb-2w' : 'reduire rf-mt-2w rf-mb-2w'}
          onClick={() => setCacherAccompagner(!cacherAccompagner)}></div>
      </div>
      <h2 className="rf-col-12 titre-thematique rf-mb-9w" id="accompagnement">
        <img className="image-thematique" src="/logos/cra/logo-accompagner-enfant.svg" alt="Accompagner son enfant"/>
        Accompagner son enfant
      </h2>
      {!cacherAccompagner && tabAccompagner?.map((ressource, idx) => {
        return (<Ressource key={idx} ressource={ressource}/>);
      })}

      <div className="rf-col-12">
        <hr className="sans-marge rf-mt-3w"/>
        <div className={cacherEquipement ? 'aggrandir rf-mt-2w rf-mb-2w' : 'reduire rf-mt-2w rf-mb-2w'}
          onClick={() => setCacherEquipement(!cacherEquipement)}></div>
      </div>
      <h2 className="rf-col-12 titre-thematique rf-mb-9w" id="equipement">
        <img className="image-thematique" src="/logos/cra/logo-equip-info.svg" alt="Prendre en main un &eacute;quipement informatique"/>
        Prendre en main un &eacute;quipement informatique
      </h2>
      {!cacherEquipement && tabEquipement?.map((ressource, idx) => {
        return (<Ressource key={idx} ressource={ressource}/>);
      })}

      <div className="rf-col-12">
        <hr className="sans-marge rf-mt-3w"/>
        <div className={cacherCNIL ? 'aggrandir rf-mt-2w rf-mb-2w' : 'reduire rf-mt-2w rf-mb-2w'}
          onClick={() => setCacherCNIL(!cacherCNIL)}></div>
      </div>
      <h2 className="rf-col-12 titre-thematique rf-mb-9w" id="cnil">
        <img className="image-thematique" src="/logos/logo-cnil.svg" alt="CNIL" style={{ height: '14px', marginBottom: '0px' }}/>
        Fiches CNIL
      </h2>
      {!cacherCNIL && tabCNIL?.map((ressource, idx) => {
        return (<Ressource key={idx} ressource={ressource}/>);
      })}
    </>
  );
}

Ressources.propTypes = {
  ressources: PropTypes.array,
};

export default Ressources;
