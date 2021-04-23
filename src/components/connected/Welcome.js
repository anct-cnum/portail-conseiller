import React from 'react';
import Footer from '../Footer';

function Welcome() {

  return (
    <>
      <div className="welcome">
        <div className="rf-container">
          <div className="rf-grid-row rf-grid-row--center">

            <div className="rf-col-12 rf-col-md-10">
              <h1 className="titre rf-my-2w rf-mb-md-5w ">Espace Coop – version Beta</h1>
              <p className="sous-titre rf-mb-2w rf-mb-md-4w">
                Bienvenue sur la version temporaire de la Coop, accédez à vos outils de compte-rendu d’activité, test Pix, Document Bien<br/>
                démarrer ma mission pour vous accompagner et découvrez les prochaines fonctionnalités à venir.
              </p>
            </div>

            <div className="rf-col-12 rf-col-md-5">
              <div><span>Logo</span><button className="welcome-btn">Accéder à mon outil de CRA</button></div>
              <h2>Outil de compte-rendu d’activité de médiation numérique</h2>
              <p>Professionally revolutionize high standards in users and global best practices. Distinctively re-engineer innovative
                processes after market-driven content. Globally synthesize backward-compatible portals without integrated partnerships. Compellingly.
              </p>
            </div>

            <div className="rf-col-12 rf-col-md-5">
              <div><span>Logo</span><button className="welcome-btn">Accéder à Pix Orga</button></div>
              <h2>Outil de compte-rendu d’activité de médiation numérique</h2>
              <p>Professionally revolutionize high standards in users and global best practices. Distinctively re-engineer innovative
                processes after market-driven content. Globally synthesize backward-compatible portals without integrated partnerships. Compellingly.
              </p>
            </div>

            <div className="rf-col-12 rf-col-md-10"><hr/></div>

            <div className="rf-col-12 rf-col-md-5">
              <h2>Téléchargez le kit de début d’activité des conseillers numériques France services au format PDF.</h2>
              <p>Compellingly deliver cross functional intellectual capital after one-to-one testing procedures. Intrinsicly morph
                competitive networks whereas quality solutions. Competently enhance enterprise meta-services without
                next-generation ideas. Rapidiously embrace economically sound systems after technically sound models.
              </p>
              <button className="welcome-btn">Téléchargez le document</button>
            </div>

            <div className="rf-col-12 rf-col-md-5">
              IMG Bien démarrer
            </div>

            <div className="rf-col-12 rf-col-md-10"><hr/></div>

            <div className="rf-col-12 rf-col-md-5">
              IMG Carte
            </div>

            <div className="rf-col-12 rf-col-md-5">
              <h2>Prochainement en ligne : la visualisation interactive des conseillers numériques France Services sur les territoires</h2>
              <p>Appropriately formulate backend customer service through ubiquitous core competencies. Distinctively fashion stand-
                alone schemas with clicks-and-mortar supply chains. Conveniently develop out-of-the-box materials vis-a-vis
                one-to-one niches. Interactively.
              </p>

              <h2>Les autres fonctionnalités à venir</h2>
              <p>Appropriately formulate backend customer service through ubiquitous core competencies. Distinctively fashion stand-
                alone schemas with clicks-and-mortar supply chains. Conveniently develop out-of-the-box materials vis-a-vis
                one-to-one niches. Interactively.
              </p>
            </div>

            {/*Futur Version*/}
            <div className="rf-col-12 rf-col-md-10"><hr/></div>

            <div className="rf-col-12 rf-col-md-5">
              <h2>Mes coordonnées professionnelles</h2>
              <p>Appropriately formulate backend customer service through ubiquitous core competencies. Distinctively fashion stand-
                alone schemas with clicks-and-mortar supply chains. Conveniently develop out-of-the-box materials vis-a-vis
                one-to-one niches. Interactively.
              </p>
            </div>

            <div className="rf-col-12 rf-col-md-5">
              <button className="welcome-btn">Modifier mes coordonnées professionnelles</button>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Welcome;
