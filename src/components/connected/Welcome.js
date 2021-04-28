import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../Footer';
import { conseillerActions, structureActions } from '../../actions';
import { userEntityId } from '../../helpers';
import FlashMessage from 'react-flash-message';

function Welcome() {
  const dispatch = useDispatch();
  const location = useLocation();
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const structure = useSelector(state => state.structure?.structure);

  useEffect(() => {
    dispatch(conseillerActions.get(userEntityId()));
  }, []);

  useEffect(() => {
    if (conseiller !== undefined) {
      dispatch(structureActions.get(conseiller?.idStructure));
    }
  }, [conseiller]);

  //Forcer affichage en haut de la page pour voir le flashbag
  if (location?.printFlashbag === true) {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  }

  return (
    <>
      <div className="welcome">
        {/* TODO MOVE flash message in statistics page when it will be OK */}
        { location?.printFlashbag === true &&
        <FlashMessage duration={5000}>
          <p className="rf-label flashBag">
            Votre suivi d&rsquo;activité a bien été enregistré&nbsp;<i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
          </p>
        </FlashMessage>
        }
        <div className="rf-container">
          <div className="rf-grid-row rf-grid-row--center">

            <div className="rf-col-12 rf-col-md-10">
              <h1 className="titre rf-mt-2w rf-mb-1w rf-my-md-5w">Espace Coop <br className="br-sm"/>– version Beta</h1>
              <h2 className="sous-titre rf-mb-6w rf-mb-md-8w">
                Bienvenue sur la version temporaire de la Coop <span className="smiley-logo"></span>
              </h2>
            </div>

            <div className="rf-col-12 rf-col-md-12">
              <div className="centre">
                <Link className="cra-btn rf-mb-3w" to="/compte-rendu-activite" title="Accéder à mon outil de suivi d&#39;activité">
                  <span className="cra-logo-btn"></span>
                  <span className="cra-texte-btn">Accéder à mon outil <br/> de suivi d&#39;activité</span>
                </Link>
              </div>
              <p className="cra-details rf-mb-8w rf-mb-md-12w">
                Renseignez ici votre activité pour chaque accompagnement<br className="br-hidden"/>
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
              <div className="rf-container-fluid">
                <div className="rf-grid-row rf-grid-row--center">

                  <div className="rf-col-12 rf-col-md-10 rf-mt-3w rf-mt-md-6w rf-mb-5w rf-mb-md-8w">
                    <h2 className="sous-titre">
                      Téléchargez le kit « Bien démarrer ma mission » pour en apprendre davantage sur le Suivi <br className="br-hidden"/>
                      d’activité et l’usage des données, sur l’outil Pix , et bien d’autres sujets.
                    </h2>
                  </div>

                  <div className="rf-col-12 rf-col-md-5 rf-mb-md-6w center-md">
                    <p className="rf-ml-md-1w align-left-sm">Ce document PDF contient tout ce qu’il faut savoir <br className="br-hidden"/>
                      pour bien commencer votre activité de Conseiller <br className="br-hidden"/>
                      numérique France Services depuis votre inscription <br className="br-hidden"/>
                      jusqu’à votre entrée en poste : les bons réflexes à avoir, <br className="br-hidden"/>
                      les outils d’inclusion numérique à connaître, <br className="br-hidden"/>
                      l’organisation des structures de médiation numérique <br className="br-hidden"/>
                      sur les territoires ainsi que leurs contacts.
                    </p>

                    <a href="https://cdn.conseiller-numerique.gouv.fr/les-conseils-pour-bien-demarrer.pdf" className="document-btn rf-ml-md-1w rf-mb-5w">
                      Téléchargez le document
                    </a>
                  </div>
                  <div className="rf-col-12 rf-col-md-5 center-md">
                    <img className="document-img rf-mb-6w rf-mb-md-9w rf-ml-md-5w" src="/logos/home-connected/bien-démarrer-ma-mission.png"/>
                  </div>
                </div>
              </div>
            </div>

            <div className="rf-col-12 rf-col-md-10 rf-mb-5w rf-mb-md-6w rf-mt-8w rf-mt-md-9w">
              <h2 className="sous-titre">Prochainement en ligne votre espace Coop : la visualisation interactive des conseillers<br/>
              numériques France Services sur les territoires</h2>
            </div>

            <div className="rf-col-12 rf-col-md-5 center-md">
              <img className="futur-img" src="/logos/home-connected/preview-carte.png"/>
              <p className="legende-img rf-mb-3w align-left-xs">Prototype - premier trimestre 2021</p>
            </div>

            <div className="rf-col-12 rf-col-md-5 rf-mb-7w rf-mb-md-9w align-left-sm center-md">
              <p className="rf-mb-5w  rf-mb-md-6w rf-ml-md-5w">
                D’ici quelques semaines, il sera possible de visualiser les Conseillers numériques France Services en poste sur les territoires.
              </p>
              <h2 className="sous-titre-futur rf-mb-3w rf-mb-md-6w rf-ml-md-5w center-md">Les autres fonctionnalités à venir</h2>
              <p className="rf-ml-md-5w">– Les actualités régulières de la communauté Conseiller numérique France Services<br/>
                 – Des temps de rencontres dédiés<br/>
                 – La bibliothèque d’outils d’inclusion numérique.<br/>
                 – Une messagerie pour échanger avec les autres <br/>Conseillers, et permettant consulter vos e-mails<br/> directement sur l’espace Coop.<br/>
                 – Forum et ressourcerie participatifs<br/>
              </p>
              <p className="rf-ml-md-5w">Consultez régulièrement votre e-mail pour être tenu au <br/>courant des activités et des mises à jour. </p>
            </div>

            <div className="rf-col-12 rf-col-md-10 rf-mb-4w rf-mb-md-8w"><hr/></div>

            <div className="rf-col-12 rf-col-md-10">
              <h2 className="sous-titre rf-mb-5w rf-mb-md-6w">Mes coordonnées professionnelles</h2>
            </div>

            <div className="rf-col-12 rf-col-md-5">
              <p className="coordonnees-details rf-mr-md-5w rf-mb-3w rf-mb-md-6w align-left-sm center-md">
                Au cas où une erreur se serait glissée dans vos <br className="br-hidden"/>
                coordonnées, ou si celles-ci ont changé, nous vous <br className="br-hidden"/>
                donnerons la possibilité de les modifier ultérieurement.
                {/*en cliquant sur le <br className="br-hidden"/>
                lien ci-dessous.*/}
              </p>
            </div>

            <div className="rf-col-12 rf-col-md-5 rf-mb-md-7w center-md">
              <p className="coordonnees rf-ml-md-5w rf-mb-8w">
                {conseiller?.nom} {conseiller?.prenom}<br/>
                {structure?.insee?.etablissement?.adresse?.l5 &&
                  <span>{ structure?.insee?.etablissement?.adresse?.l5 }<br/></span>
                }
                { structure?.insee?.etablissement?.adresse?.l4 &&
                  <span>{ structure?.insee?.etablissement?.adresse?.l4 }<br/></span>
                }
                { structure?.insee?.etablissement?.adresse?.code_postal &&
                  <span>{ structure?.insee?.etablissement?.adresse?.code_postal }</span>
                }
                { structure?.insee?.etablissement?.adresse?.localite &&
                  <span>&nbsp;{ structure?.insee?.etablissement?.adresse?.localite }</span>
                }
              </p>
            </div>
            { /*
            <div className="rf-col-12 rf-col-md-10 rf-mb-8w rf-mb-md-15w">
              <div className="centre">
                <Link className="coordonnees-btn" to="/mon-compte" title="Modifier mes coordonnées professionnelles">
                  Modifier mes coordonnées professionnelles
                </Link>
              </div>
            </div>
            */}
          </div>
        </div>
      </div>
      <Footer type="support"/>
    </>
  );
}

export default Welcome;
