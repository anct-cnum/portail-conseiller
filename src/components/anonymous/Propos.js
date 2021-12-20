import React from 'react';
import { useSelector } from 'react-redux';
import Footer from '../Footer';
import Header from '../Header';

function Propos() {

  const user = useSelector(state => state.authentication?.user?.user);
  const aideCoop = process.env.REACT_APP_MATTERMOST_URL + '/cnum/channels/aide_espace_coop';
  const aideMetier = process.env.REACT_APP_MATTERMOST_URL + '/cnum/channels/aide-metier';

  return (
    <div>
      <Header linkAccount={user?.name}/>
      <div id="propos">
        <div className="rf-container">
          <div className="rf-grid-row">
            <div className="rf-col-12">
              <h1 className="rf-mt-15w rf-mb-3w titre1">
                À propos de l&rsquo;espace Coop et du développement des outils en ligne des conseillers numériques
              </h1>
              <p className="rf-mb-7w titre3">
                La Coop et les services mis à votre disposition sur le site sont toujours en cours d&rsquo;élaboration, pourquoi et comment ?
              </p>
            </div>
            <div className="rf-col-9">
              <h2 className="rf-mb-6w titre2">Le contexte</h2>

              <h3 className="rf-mt-3w titre3">Octobre 2020 : le lancement du dispositif et de sa plateforme de recrutement</h3>
              <p className="rf-mb-6w">L&rsquo;État initie le dispositif Conseiller numérique France Services en octobre 2020, une équipe de trois personnes est
                alors constituée, son rôle est de concevoir rapidement et dans son intégralité la plateforme de recrutement en ligne
                www.conseiller-numerique.gouv.fr ; celle-ci comprend les espaces de gestion afférents à destination des candidats,
                des structures et des préfectures.
              </p>

              <h3 className="rf-mt-3w titre3">Premier trimestre 2021 : les fondements de l&rsquo;espace Coop</h3>
              <p className="rf-mb-6w">L&rsquo;équipe de conception est agrandie à 7 personnes, dont 4 développeurs qui assurent simultanément le développement,
                le maintien des espaces de recrutement (environ 50 000 candidats et structures),  ainsi que la création ex nihilo de
                l&rsquo;espace Coop et de l&rsquo;outil de suivi d&rsquo;activité.
              </p>

              <h3 className="rf-mt-3w titre3">Deuxième et troisième trimestres 2021  : mises en ligne et davantage de services</h3>
              <p className="rf-mb-7w">L&rsquo;équipe est progressivement agrandie à une dixaine de personnes, puis treize personnes en fin
                d&rsquo;année. La mise en ligne de la toute première version de l&rsquo;espace Coop est effectuée au cours de l&rsquo;été 2021,
                en simultané avec les premières prises de poste des conseillers numériques.
              </p>

              <h2 className="rf-mt-3w titre2">La philosophie de conception des outils : co-construire avec vous et en amélioration continue </h2>
              <p className="rf-mb-5w">Les outils numériques des conseillers sont conçus en mettant l&rsquo;humain avec la participation active de médiateurs
                numériques expérimentés, ainsi qu&rsquo;avec celle des conseillers numériques avec pour objet final de répondre au mieux
                à la réalité de terrain des conseillers numériques.
              </p>

              <h3 className="rf-mt-3w titre3">Quelques exemples concrets :</h3>
              <p className="rf-mb-7w">– Pour définir de manière pertinente ce que devait être l&rsquo;espace Coop, un recueil a
                d&rsquo;abord été effectué auprès d&rsquo;une douzaine de médiateurs numériques et référents territoriaux au début de
                l&rsquo;année 2021. Cette enquête a permis recenser les besoins en termes de partage, de réseau, de synergies, et ainsi
                d&rsquo;élaborer des tous premiers plans du site.<br/><br/>
                – Avant sa mise en ligne, l&rsquo;outil de suivi d&rsquo;activité a été testé deux fois auprès d&rsquo;une dixaine de médiateurs et
                coordinateurs territoriaux qui ont tour à tour préconisé leurs modifications.<br/><br/>
                – En octobre 2021, un atelier d&rsquo;amélioration de l&rsquo;outil suivi d&rsquo;activité est initié lors de l&rsquo;évènement national NEC
                Sud-Charente, avec la participation des conseillers numériques. La seconde version de l&rsquo;outil de suivi d&rsquo;activité prenant
                en compte les modifications des conseillers est actuellement en cours de développement.
              </p>

              <h2 className="rf-mt-6w titre2">Vous aussi, vous pouvez contribuer si vous le souhaitez</h2>
              <p className="rf-mb-3w">Pour cela, rejoignez les canaux correspondants sur votre espace de discussion :</p>
              <p className="rf-mb-3w">
                <a className="lien-footer" href={aideMetier} target="blank" rel="noreferrer">
                  <img src="logos/bulle-ressourcerie.svg" className="bulle-ressourcerie"/>
                  <div className="lien-a-propos" >
                    Vous souhaitez manifester votre intérêt pour participer à une future amélioration d&rsquo;outil : rejoignez le canal
                    Atelier NEC.
                  </div>
                </a>
              </p>
              <p className="rf-mb-15w">
                <a className="lien-footer" href={aideCoop} target="blank" rel="noreferrer">
                  <img src="logos/bulle-ressourcerie.svg" className="bulle-ressourcerie"/>
                  <span >Vous souhaitez signaler un problème  la Coop : canal Aide espace Coop</span>
                </a>
              </p>
            </div>

            <div className="rf-col-offset-1 rf-col-2 rf-mt-12w">
              <img src="logos/home-site-vitrine.png" style={{ height: '118px' }}/>
              <p className="fresque-text">Lancement de la plateforme de recrutement : octobre 2021.</p>
              <img src="logos/wireframe-espace-coop.png" style={{ height: '118px' }}/>
              <p className="fresque-text">Premier croquis de la Coop, janvier 2021.</p>
              <img src="logos/home-ressourcerie.png" style={{ height: '118px' }}/>
              <p className="fresque-text">Première version de la ressourcerie : octobre 2021.</p>
              <img src="logos/photo-nec.png" style={{ height: '118px' }}/>
              <p className="fresque-text">Restitution atelier Outil de suivi d&rsquo;activité partie 1, NEC Sud Charente (octobre 2021).</p>
              <img src="logos/home-carto.png" style={{ height: '118px' }}/>
              <p className="fresque-text">
                Exemple de de service actuellement en travaux : la cartographie nationale des points de médiation numérique
                (à venir en 2022).
              </p>
            </div>

          </div>
        </div>
      </div>
      <Footer type="support" role={user.role}/>
    </div>
  );
}

export default Propos;
