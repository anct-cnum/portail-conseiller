import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import { conseillerActions } from '../../actions';
import { userEntityId } from '../../helpers';

function Welcome() {
  const dispatch = useDispatch();
  const conseiller = useSelector(state => state.conseiller?.conseiller);

  useEffect(() => {
    dispatch(conseillerActions.get(userEntityId()));
  }, []);

  return (
    <>
      <div className="welcome">
        <div className="rf-container">
          <div className="rf-grid-row rf-grid-row--center">

            <div className="rf-col-12 rf-col-md-10">
              <h1 className="titre rf-my-md-5w">Espace Coop – version Beta</h1>
              <h2 className="sous-titre rf-mb-md-8w">
                Bienvenue sur la version temporaire de la Coop <span className="smiley-logo"></span>
              </h2>
            </div>

            <div className="rf-col-12 rf-col-md-12">
              <div className="centre">
                <Link className="cra-btn rf-mb-md-3w" to="/compte-rendu-activite" title="Accéder à mon outil de suivi d&#39;activité">
                  <span className="cra-logo-btn"></span>
                  <span className="cra-texte-btn">Accéder à mon outil <br/> de suivi d&#39;activité</span>
                </Link>
              </div>
              <p className="cra-details rf-mb-md-12w">
                Renseignez ici votre activité pour chaque accompagnement<br/>
                réalisé (atelier, accompagnement individuel,  etc).
              </p>
            </div>
            {
              /*
              <div className="rf-col-12 rf-col-md-5">
                <div><span>Logo</span><button className="welcome-btn">Accéder à Pix Orga</button></div>
                <h2>Outil de compte-rendu d’activité de médiation numérique</h2>
                <p>Professionally revolutionize high standards in users and global best practices. Distinctively re-engineer innovative
                  processes after market-driven content. Globally synthesize backward-compatible portals without integrated partnerships. Compellingly.
                </p>
              </div>
              */
            }

            <div className="rf-col-12 bloc-document">
              <div className="rf-container">
                <div className="rf-grid-row rf-grid-row--center">
                  <div className="rf-col-12 rf-col-md-10 rf-mt-md-6w rf-mb-md-8w">
                    <h2 className="sous-titre">Téléchargez le kit « Bien démarrer ma mission » pour en apprendre davantage sur le Suivi <br/>
                    d’activité et l’usage des données, sur l’outil Pix , et bien d’autres sujets.
                    </h2>
                  </div>

                  <div className="rf-col-12 rf-col-md-5 rf-mb-md-6w">
                    <p className="rf-ml-md-1w">Ce document PDF contient tout ce qu’il faut savoir<br/>
                      pour bien commencer votre activité de Conseiller<br/>
                      numérique France Services depuis votre inscription<br/>
                      jusqu’à votre entrée en poste : les bons réflexes à avoir,<br/>
                      les outils d’inclusion numérique à connaître,<br/>
                      l’organisation des structures de médiation numérique<br/>
                      sur les territoires ainsi que leurs contacts.
                    </p>

                    <a href="https://cdn.conseiller-numerique.gouv.fr/AMI_Conseiller-Numerique.pdf" className="document-btn rf-ml-md-1w">
                      Téléchargez le document
                    </a>
                  </div>
                  <div className="rf-col-12 rf-col-md-5">
                    <img className="document-img rf-mb-md-9w rf-ml-md-5w" src="/logos/home-connected/bien-démarrer-ma-mission.png"/>
                  </div>
                </div>
              </div>
            </div>

            <div className="rf-col-12 rf-col-md-10 rf-mb-md-6w rf-mt-md-9w">
              <h2 className="sous-titre">Prochainement en ligne votre espace Coop : la visualisation interactive des conseillers<br/>
              numériques France Services sur les territoires</h2>

            </div>
            <div className="rf-col-12 rf-col-md-5">
              <img className="futur-img rf-ml-md-4w" src="/logos/home-connected/preview-carte.png"/>
              <p className="legende-img rf-ml-md-4w">Prototype - premier trimestre 2021</p>
            </div>
            <div className="rf-col-12 rf-col-md-5 rf-mb-md-9w">
              <p className="rf-mb-md-6w rf-ml-md-5w">
                D’ici quelques semaines, il sera possible de visualiser les Conseillers numériques France Services en poste sur les territoires.
              </p>
              <h2 className="sous-titre-futur rf-mb-md-6w rf-ml-md-5w">Les autres fonctionnalités à venir</h2>
              <p className="rf-ml-md-5w">– Les actualités régulières de la communauté Conseiller numérique France Services<br/>
                 – Des temps de rencontres dédiés<br/>
                 – La bibliothèque d’outils d’inclusion numérique.<br/>
                 – Une messagerie pour échanger avec les autres <br/>Conseillers, et permettant consulter vos e-mails<br/> directement sur l’espace Coop.<br/>
                 – Forum et ressourcerie participatifs<br/>
              </p>
              <p className="rf-ml-md-5w">Consultez régulièrement votre e-mail pour être tenu au <br/>courant des activités et des mises à jour. </p>
            </div>

            <div className="rf-col-12 rf-col-md-10 rf-mb-md-8w"><hr/></div>

            <div className="rf-col-12 rf-col-md-10">
              <h2 className="sous-titre rf-mb-md-6w">Mes coordonnées professionnelles</h2>
            </div>
            <div className="rf-col-12 rf-col-md-5">
              <p className="coordonnees-details rf-mr-md-5w">
              Au cas où une erreur se serait glissée dans vos <br/>
              coordonnées, ou si celles-ci ont changé, nous vous <br/>
              donnons la possibilité de les modifier en cliquant sur le <br/>
              lien ci-dessous.
              </p>
            </div>
            <div className="rf-col-12 rf-col-md-5 rf-mb-md-6w">
              <p className="coordonnees rf-ml-md-5w">
                {conseiller?.nom} {conseiller?.prenom}<br/>
                {conseiller?.codePostal}{conseiller?.nomCommune}
              </p>
            </div>

            <div className="rf-col-12 rf-col-md-10 rf-mb-md-15w">
              <div className="centre">
                <a className="coordonnees-btn">Modifier mes coordonnées professionnelles</a>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Welcome;
