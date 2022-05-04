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
  const [cacherEspaceConseiller, setCacherEspaceConseiller] = useState(false);

  const ressourcesFiltredByCategory = (category => ressources?.filter(ressource => ressource.categorie === category));

  return (
    <>
      { ressourcesFiltredByCategory('Courriel')?.length > 0 &&
      <>
        <div className="rf-col-12">
          <hr className="sans-marge"/>
          <div className={cacherMail ? 'aggrandir rf-mt-2w rf-mb-2w' : 'reduire rf-mt-2w rf-mb-2w'} onClick={() => setCacherMail(!cacherMail)}></div>
        </div>
        <h2 className="rf-col-12 titre-thematique rf-mb-9w" id="mail">
          <img className="image-thematique" src="/logos/cra/logo-courriel.svg" alt="Courriel" />
          Courriel
        </h2>
        {!cacherMail && ressourcesFiltredByCategory('Courriel')?.map((ressource, idx) => {
          return (<Ressource key={idx} ressource={ressource}/>);
        })}
      </>
      }

      { ressourcesFiltredByCategory('Échanger avec ses proches')?.length > 0 &&
      <>
        <div className="rf-col-12">
          <hr className="sans-marge rf-mt-3w"/>
          <div className={cacherEchanger ? 'aggrandir rf-mt-2w rf-mb-2w' : 'reduire rf-mt-2w rf-mb-2w'}
            onClick={() => setCacherEchanger(!cacherEchanger)}></div>
        </div>
        <h2 className="rf-col-12 titre-thematique rf-mb-9w" id="echange">
          <img className="image-thematique" src="/logos/cra/logo-echanger-proches.svg" alt="&Eacute;changer avec ses proches" />
          &Eacute;changer avec ses proches
        </h2>
        {!cacherEchanger && ressourcesFiltredByCategory('Échanger avec ses proches')?.map((ressource, idx) => {
          return (<Ressource key={idx} ressource={ressource}/>);
        })}
      </>
      }

      { ressourcesFiltredByCategory('Emploi')?.length > 0 &&
      <>
        <div className="rf-col-12">
          <hr className="sans-marge rf-mt-3w"/>
          <div className={cacherEmploi ? 'aggrandir rf-mt-2w rf-mb-2w' : 'reduire rf-mt-2w rf-mb-2w'} onClick={() => setCacherEmploi(!cacherEmploi)}></div>
        </div>
        <h2 className="rf-col-12 titre-thematique rf-mb-9w" id="emploi">
          <img className="image-thematique" src="/logos/cra/logo-trouver-emploi.svg" alt="Emploi" />
          Emploi
        </h2>
        {!cacherEmploi && ressourcesFiltredByCategory('Emploi')?.map((ressource, idx) => {
          return (<Ressource key={idx} ressource={ressource}/>);
        })}
      </>
      }

      { ressourcesFiltredByCategory('Démarches en ligne')?.length > 0 &&
      <>
        <div className="rf-col-12">
          <hr className="sans-marge rf-mt-3w"/>
          <div className={cacherDemarches ? 'aggrandir rf-mt-2w rf-mb-2w' : 'reduire rf-mt-2w rf-mb-2w'}
            onClick={() => setCacherDemarches(!cacherDemarches)}></div>
        </div>
        <h2 className="rf-col-12 titre-thematique rf-mb-9w" id="demarches">
          <img className="image-thematique" src="/logos/cra/logo-demarche-en-ligne.svg" alt="D&eacute;marches en ligne" />
          D&eacute;marches en ligne
        </h2>
        {!cacherDemarches && ressourcesFiltredByCategory('Démarches en ligne')?.map((ressource, idx) => {
          return (<Ressource key={idx} ressource={ressource}/>);
        })}
      </>
      }

      { ressourcesFiltredByCategory('Bureautique')?.length > 0 &&
      <>
        <div className="rf-col-12">
          <hr className="sans-marge rf-mt-3w"/>
          <div className={cacherTraitement ? 'aggrandir rf-mt-2w rf-mb-2w' : 'reduire rf-mt-2w rf-mb-2w'}
            onClick={() => setCacherTraitement(!cacherTraitement)}></div>
        </div>
        <h2 className="rf-col-12 titre-thematique rf-mb-9w" id="traitement">
          <img className="image-thematique" src="/logos/cra/logo-traitement-texte.svg" alt="Apprendre les bases de la bureautique" />
          Bureautique
        </h2>
        {!cacherTraitement && ressourcesFiltredByCategory('Bureautique')?.map((ressource, idx) => {
          return (<Ressource key={idx} ressource={ressource}/>);
        })}
      </>
      }

      { ressourcesFiltredByCategory('Smartphone, applications mobile')?.length > 0 &&
      <>
        <div className="rf-col-12">
          <hr className="sans-marge rf-mt-3w"/>
          <div className={cacherSmartphone ? 'aggrandir rf-mt-2w rf-mb-2w' : 'reduire rf-mt-2w rf-mb-2w'}
            onClick={() => setCacherSmartphone(!cacherSmartphone)}></div>
        </div>
        <h2 className="rf-col-12 titre-thematique rf-mb-9w" id="smartphone">
          <img className="image-thematique" src="/logos/cra/logo-telephone-portable.svg" alt="Installer et utiliser des applications sur son smartphone" />
          Mobile
        </h2>
        {!cacherSmartphone && ressourcesFiltredByCategory('Smartphone, applications mobile')?.map((ressource, idx) => {
          return (<Ressource key={idx} ressource={ressource}/>);
        })}
      </>
      }

      { ressourcesFiltredByCategory('Créer et gérer ses contenus numériques')?.length > 0 &&
      <>
        <div className="rf-col-12">
          <hr className="sans-marge rf-mt-3w"/>
          <div className={cacherContenus ? 'aggrandir rf-mt-2w rf-mb-2w' : 'reduire rf-mt-2w rf-mb-2w'}
            onClick={() => setCacherContenus(!cacherContenus)}></div>
        </div>
        <h2 className="rf-col-12 titre-thematique rf-mb-9w" id="contenus">
          <img className="image-thematique" src="/logos/cra/logo-contenus-numeriques.svg" alt="Cr&eacute;er et g&eacute;rer ses contenus num&eacute;riques" />
          Cr&eacute;er et g&eacute;rer ses contenus num&eacute;riques</h2>
        {!cacherContenus && ressourcesFiltredByCategory('Créer et gérer ses contenus numériques')?.map((ressource, idx) => {
          return (<Ressource key={idx} ressource={ressource}/>);
        })}
      </>
      }

      { ressourcesFiltredByCategory('Accompagner son enfant')?.length > 0 &&
      <>
        <div className="rf-col-12">
          <hr className="sans-marge rf-mt-3w"/>
          <div className={cacherAccompagner ? 'aggrandir rf-mt-2w rf-mb-2w' : 'reduire rf-mt-2w rf-mb-2w'}
            onClick={() => setCacherAccompagner(!cacherAccompagner)}></div>
        </div>
        <h2 className="rf-col-12 titre-thematique rf-mb-9w" id="accompagnement">
          <img className="image-thematique" src="/logos/cra/logo-accompagner-enfant.svg" alt="Accompagner son enfant"/>
          Accompagner son enfant
        </h2>
        {!cacherAccompagner && ressourcesFiltredByCategory('Accompagner son enfant')?.map((ressource, idx) => {
          return (<Ressource key={idx} ressource={ressource}/>);
        })}
      </>
      }

      { ressourcesFiltredByCategory('Prendre en main un équipement informatique')?.length > 0 &&
      <>
        <div className="rf-col-12">
          <hr className="sans-marge rf-mt-3w"/>
          <div className={cacherEquipement ? 'aggrandir rf-mt-2w rf-mb-2w' : 'reduire rf-mt-2w rf-mb-2w'}
            onClick={() => setCacherEquipement(!cacherEquipement)}></div>
        </div>
        <h2 className="rf-col-12 titre-thematique rf-mb-9w" id="equipement">
          <img className="image-thematique" src="/logos/cra/logo-equip-info.svg" alt="Prendre en main du mat&eacute;riel informatique"/>
          Prendre en main du mat&eacute;riel informatique
        </h2>
        {!cacherEquipement && ressourcesFiltredByCategory('Prendre en main un équipement informatique')?.map((ressource, idx) => {
          return (<Ressource key={idx} ressource={ressource}/>);
        })}
      </>
      }

      { ressourcesFiltredByCategory('Fiches CNIL')?.length > 0 &&
      <>
        <div className="rf-col-12">
          <hr className="sans-marge rf-mt-3w"/>
          <div className={cacherCNIL ? 'aggrandir rf-mt-2w rf-mb-2w' : 'reduire rf-mt-2w rf-mb-2w'}
            onClick={() => setCacherCNIL(!cacherCNIL)}></div>
        </div>
        <h2 className="rf-col-12 titre-thematique rf-mb-9w" id="cnil">
          <img className="image-thematique" src="/logos/logo-cnil.svg" alt="CNIL" style={{ height: '14px', marginBottom: '0px' }}/>
          Fiches CNIL
        </h2>
        {!cacherCNIL && ressourcesFiltredByCategory('Fiches CNIL')?.map((ressource, idx) => {
          return (<Ressource key={idx} ressource={ressource}/>);
        })}
      </>
      }

      { ressourcesFiltredByCategory('Espace Conseiller')?.length > 0 &&
      <>
        <div className="rf-col-12">
          <hr className="sans-marge rf-mt-3w"/>
          <div className={cacherEspaceConseiller ? 'aggrandir rf-mt-2w rf-mb-2w' : 'reduire rf-mt-2w rf-mb-2w'}
            onClick={() => setCacherEspaceConseiller(!cacherEspaceConseiller)}></div>
        </div>
        <h2 className="rf-col-12 titre-thematique rf-mb-9w" id="espaceConseiller">
          <img className="image-thematique" src="/logos/picto-espace-conseiller.svg" alt="Conseiller" style={{ height: '42px', marginBottom: '0px' }}/>
          Espace Conseiller
        </h2>
        {!cacherCNIL && ressourcesFiltredByCategory('Espace Conseiller')?.map((ressource, idx) => {
          return (<Ressource key={idx} ressource={ressource}/>);
        })}
      </>
      }
    </>
  );
}

Ressources.propTypes = {
  ressources: PropTypes.array,
};

export default Ressources;
