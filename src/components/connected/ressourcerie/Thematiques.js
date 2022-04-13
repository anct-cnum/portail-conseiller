import React from 'react';

function Thematiques() {

  return (
    <div className="thematiques">
      <h2 className="rf-mb-3w sous-titre">Th&eacute;matiques</h2>
      <div className="rf-container">
        <div className="rf-grid-row">
          <div className="rf-col-12 rf-col-sm-6">
            <ul className="liste-thematiques">
              <li className="rf-mb-5v">
                <a href="#mail" className="lien-thematique">
                  <img className="image-thematique" src="/logos/cra/logo-courriel.svg" alt="Mail" />
                  Courriel
                </a>
              </li>
              <li className="rf-mb-5v">
                <a href="#echange" className="lien-thematique">
                  <img className="image-thematique" src="/logos/cra/logo-echanger-proches.svg" alt="&Eacute;changer avec ses proches" />
                  &Eacute;changer avec ses proches
                </a>
              </li>
              <li className="rf-mb-5v">
                <a href="#emploi" className="lien-thematique">
                  <img className="image-thematique" src="/logos/cra/logo-trouver-emploi.svg" alt="Emploi" />
                  Emploi
                </a>
              </li>
              <li className="rf-mb-5v">
                <a href="#demarches" className="lien-thematique">
                  <img className="image-thematique" src="/logos/cra/logo-demarche-en-ligne.svg" alt="D&eacute;marches en ligne" />
                  D&eacute;marches en ligne
                </a>
              </li>
              <li className="rf-mb-5v">
                <a href="#traitement" className="lien-thematique">
                  <img className="image-thematique" src="/logos/cra/logo-traitement-texte.svg" alt="Apprendre les bases de la bureautique" />
                  Bureautique
                </a>
              </li>
              <li className="rf-mb-5v">
                <a href="#smartphone" className="lien-thematique">
                  <img className="image-thematique" src="/logos/cra/logo-telephone-portable.svg" alt="Utiliser des applications utiles sur son smartphone"
                    style={{ height: '23px', marginRight: '8px' }}/>
                  Mobile
                </a>
              </li>
              <li className="rf-mb-5v">
                <a href="#productionCnFs" className="lien-thematique">
                  <img className="image-thematique" src="/logos/picto-espace-conseiller.svg" alt="Production"
                    style={{ marginBottom: '0px', marginRight: '20px' }}/>
                    Production des CnFS
                </a>
              </li>
            </ul>
          </div>
          <div className="rf-col-12 rf-col-sm-6 rf-mb-5v">
            <ul className="liste-thematiques">
              <li className="rf-mb-5v">
                <a href="#contenus" className="lien-thematique">
                  <div className="image-lien">
                    <img className="image-thematique" src="/logos/cra/logo-contenus-numeriques.svg"
                      alt="Cr&eacute;er et g&eacute;rer ses contenus num&eacute;riques" style={{ height: '23px', marginBottom: '0px' }}/>
                  </div>
                  <div className="texte-lien">Cr&eacute;er et g&eacute;rer ses contenus num&eacute;riques</div>
                </a>
              </li>
              <li className="rf-mb-5v">
                <a href="#accompagnement" className="lien-thematique">
                  <img className="image-thematique" src="/logos/cra/logo-accompagner-enfant.svg" alt="Accompagner son enfant"
                    style={{ height: '24px' }}/>
                  Accompagner son enfant
                </a>
              </li>
              <li className="rf-mb-5v">
                <a href="#equipement" className="lien-thematique">
                  <div className="image-lien">
                    <img className="image-thematique" src="/logos/cra/logo-equip-info.svg" alt="Prendre en main un &eacute;quipement informatique"
                      style={{ height: '25px' }}/>
                  </div>
                  <div className="texte-lien">Prendre en main un &eacute;quipement informatique</div>
                </a>
              </li>
              <li className="rf-mb-5v">
                <a href="#cnil" className="lien-thematique">
                  <img className="image-thematique" src="/logos/logo-cnil.svg" alt="CNIL" style={{ height: '8px', marginBottom: '0px' }}/>
                  Fiches CNIL
                </a>
              </li>
              <li className="rf-mb-5v">
                <a href="#espaceConseiller" className="lien-thematique">
                  <img className="image-thematique" src="/logos/picto-espace-conseiller.svg" alt="Conseiller"
                    style={{ marginBottom: '0px', marginRight: '24px' }}/>
                  Espace Conseiller
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="rf-mt-5v rf-mb-4w" />
    </div>
  );
}

export default Thematiques;
