import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../Footer';
import { conseillerActions } from '../../actions';
import { userEntityId } from '../../helpers';
import FlashMessage from 'react-flash-message';

function Welcome() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(conseillerActions.get(userEntityId()));
  }, []);

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
              <h1 className="titre rf-mt-2w rf-mb-1w rf-mt-md-5w rf-mb-md-8w">Bienvenue sur <br className="br-sm"/>l&rsquo;Espace Coop</h1>
            </div>

            <div className="rf-col-12 rf-col-md-12">
              <div className="centre">
                <Link className="cra-btn rf-mb-3w" to="/compte-rendu-activite" title="Accéder à mon outil de suivi d&rsquo;activité">
                  <span className="cra-logo-btn"></span>
                  <span className="cra-texte-btn">Accéder à mon outil <br/> de suivi d&rsquo;activité</span>
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
                <h2>Outil de compte-rendu d&rsquo;activité de médiation numérique</h2>
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
                      d&rsquo;activité et l&rsquo;usage des données, sur l&rsquo;outil Pix , et bien d&rsquo;autres sujets.
                    </h2>
                  </div>

                  <div className="rf-col-12 rf-col-md-5 rf-mb-md-6w center-md">
                    <p className="rf-ml-md-1w align-left-sm">Ce document PDF contient tout ce qu&rsquo;il faut savoir <br className="br-hidden"/>
                      pour bien commencer votre activité de Conseiller <br className="br-hidden"/>
                      numérique France Services depuis votre inscription <br className="br-hidden"/>
                      jusqu&rsquo;à votre entrée en poste : les bons réflexes à avoir, <br className="br-hidden"/>
                      les outils d&rsquo;inclusion numérique à connaître, <br className="br-hidden"/>
                      l&rsquo;organisation des structures de médiation numérique <br className="br-hidden"/>
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
              <h2 className="sous-titre">Prochainement en ligne sur votre espace Coop : l&rsquo;accès à Pix</h2>
            </div>

            <div className="rf-col-12 rf-col-md-5 rf-mb-6w center-md">
              <img className="futur-img" src="/logos/home-connected/preview-pix.png"/>
            </div>

            <div className="rf-col-12 rf-col-md-5 rf-mb-7w rf-mb-md-9w align-left-sm center-md">
              <p className="rf-mb-5w  rf-mb-md-6w rf-ml-md-5w">
                D&rsquo;ici quelques semaines, il vous sera possible d&rsquo;accéder à Pix, ce service public en ligne est mis à la disposition de tous
                les Conseillers numériques France Services qui en disposeront afin de leur faciliter les diagnostics et les accompagnement
                autour de la maîtrise de compétences numériques.
                <br/><br/>
                N&rsquo;hésitez pas à télécharger le kit « Bien démarrer ma mission » pour en apprendre davantage sur ce sujet.
              </p>
              <h2 className="sous-titre-futur rf-mb-3w rf-mb-md-6w rf-ml-md-5w center-md">Les autres fonctionnalités à venir</h2>
              <p className="rf-ml-md-5w">
                – Un outil de messagerie en ligne ;<br/>
                – les actualités régulières de la communauté Conseiller numérique France Services ;<br/>
                – des temps de rencontres dédiés ; <br/>
                – la bibliothèque d&rsquo;outils d&rsquo;inclusion numérique ; <br/>
                – un forum et une ressourcerie participatifs.
              </p>
              <p className="rf-ml-md-5w">Consultez régulièrement votre e-mail pour être tenu au <br/>courant des activités et des mises à jour. </p>
            </div>
          </div>
        </div>
      </div>
      <Footer type="support"/>
    </>
  );
}

export default Welcome;
