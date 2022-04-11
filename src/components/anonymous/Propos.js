import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Footer from '../Footer';
import Header from '../Header';
import HeaderHub from '../hub/HeaderHub';

function Propos() {

  const user = useSelector(state => state.authentication?.user?.user);
  const aideCoop = process.env.REACT_APP_MATTERMOST_URL + '/cnum/channels/aide_espace_coop';
  const aideMetier = process.env.REACT_APP_MATTERMOST_URL + '/cnum/channels/aide-metier';

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div>
      { user?.role === 'hub_coop' ? <HeaderHub /> : <Header linkAccount={user?.name}/>}
      <div id="propos">
        <div className="rf-container">
          <div className="rf-grid-row">
            <div className="rf-col-12">
              <h1 className="rf-mt-15w rf-mb-3w titre1">
                &Agrave; propos de l&rsquo;espace Coop et du d&eacute;veloppement des outils en ligne des conseillers num&eacute;riques
              </h1>
              <p className="rf-mb-7w titre3">
                La Coop et les services mis &agrave; votre disposition sur le site sont toujours en cours d&rsquo;&eacute;laboration, pourquoi et comment ?
              </p>
            </div>
            <div className="rf-col-9">
              <h2 className="rf-mb-6w titre2">Le contexte</h2>

              <h3 className="rf-mt-3w titre3">Octobre 2020&nbsp;: le lancement du dispositif et de sa plateforme de recrutement</h3>
              <p className="rf-mb-6w">L&rsquo;&eacute;tat initie le dispositif Conseiller num&eacute;rique France Services en octobre 2020, une
                &eacute;quipe de trois personnes est alors constitu&eacute;e, son rôle est de concevoir rapidement et dans son
                int&eacute;gralit&eacute; la plateforme de recrutement en ligne www.conseiller-numerique.gouv.fr ; celle-ci comprend les espaces
                de gestion aff&eacute;rents &agrave; destination des candidats, des structures et des pr&eacute;fectures.
              </p>

              <h3 className="rf-mt-3w titre3">Premier trimestre 2021&nbsp;: les fondements de l&rsquo;espace Coop</h3>
              <p className="rf-mb-6w">L&rsquo;&eacute;quipe de conception est agrandie &agrave; 7 personnes, dont 4 d&eacute;veloppeurs qui assurent
                simultan&eacute;ment le d&eacute;veloppement, le maintien des espaces de recrutement (environ 50 000 candidats et structures),
                ainsi que la cr&eacute;ation ex nihilo de l&rsquo;espace Coop et de l&rsquo;outil de suivi d&rsquo;activit&eacute;.
              </p>

              <h3 className="rf-mt-3w titre3">Deuxi&egrave;me et troisi&egrave;me trimestres 2021&nbsp;: mises en ligne et davantage de services</h3>
              <p className="rf-mb-7w">L&rsquo;&eacute;quipe est progressivement agrandie &agrave; une dixaine de personnes, puis treize personnes en fin
                d&rsquo;ann&eacute;e. La mise en ligne de la toute premi&egrave;re version de l&rsquo;espace Coop est effectu&eacute;e au cours de
                l&rsquo;&eacute;t&eacute; 2021, en simultan&eacute; avec les premi&egrave;res prises de poste des conseillers num&eacute;riques.
              </p>

              <h2 className="rf-mt-3w titre2">La philosophie de conception des outils&nbsp;: co-construire avec vous et en am&eacute;lioration continue </h2>
              <p className="rf-mb-5w">Les outils num&eacute;riques des conseillers sont conçus en mettant l&rsquo;humain avec la participation
                active de m&eacute;diateurs num&eacute;riques exp&eacute;riment&eacute;s, ainsi qu&rsquo;avec celle des conseillers
                num&eacute;riques avec pour objet final de r&eacute;pondre au mieux &agrave; la r&eacute;alit&eacute; de terrain des conseillers
                num&eacute;riques.
              </p>

              <h3 className="rf-mt-3w titre3">Quelques exemples concrets&nbsp;:</h3>
              <p className="rf-mb-7w">– Pour d&eacute;finir de mani&egrave;re pertinente ce que devait &ecirc;tre l&rsquo;espace Coop, un recueil a
                d&rsquo;abord &eacute;t&eacute; effectu&eacute; aupr&egrave;s d&rsquo;une douzaine de m&eacute;diateurs num&eacute;riques et
                r&eacute;f&eacute;rents territoriaux au d&eacute;but de l&rsquo;ann&eacute;e 2021. Cette enqu&ecirc;te a permis de recenser les besoins
                en termes de partage, de r&eacute;seau, de synergies, et ainsi d&rsquo;&eacute;laborer des tous premiers plans du site.<br/><br/>
                – Avant sa mise en ligne, l&rsquo;outil de suivi d&rsquo;activit&eacute; a &eacute;t&eacute; test&eacute; deux fois aupr&egrave;s
                d&rsquo;une dixaine de m&eacute;diateurs et coordinateurs territoriaux qui ont tour &agrave; tour pr&eacute;conis&eacute; leurs
                modifications.<br/><br/>
                – En octobre 2021, un atelier d&rsquo;am&eacute;lioration de l&rsquo;outil suivi d&rsquo;activit&eacute; est initi&eacute;
                lors de l&rsquo;&eacute;v&egrave;nement national NEC Sud-Charente, avec la participation des conseillers num&eacute;riques. La seconde
                version de l&rsquo;outil de suivi d&rsquo;activit&eacute; prenant en compte les modifications des conseillers est actuellement
                en cours de d&eacute;veloppement.
              </p>

              <h2 className="rf-mt-6w titre2">Vous aussi, vous pouvez contribuer si vous le souhaitez</h2>
              <p className="rf-mb-3w">Pour cela, rejoignez les canaux correspondants sur votre espace de discussion&nbsp;:</p>
              <p className="rf-mb-3w">
                <a className="lien-footer" href={aideMetier} target="blank" rel="noreferrer">
                  <img src="logos/bulle-ressourcerie.svg" className="bulle-ressourcerie"/>
                  <p className="lien-a-propos" >
                    Vous souhaitez manifester votre int&eacute;r&ecirc;t pour participer &agrave; une future am&eacute;lioration d&rsquo;outil :
                    rejoignez le canal Atelier NEC.
                  </p>
                </a>
              </p>
              <p className="rf-mb-15w">
                <a className="lien-footer" href={aideCoop} target="blank" rel="noreferrer">
                  <img src="logos/bulle-ressourcerie.svg" className="bulle-ressourcerie"/>
                  <span >Vous souhaitez signaler un probl&egrave;me la Coop&nbsp;: canal Aide espace Coop</span>
                </a>
              </p>
            </div>

            <div className="rf-col-offset-1 rf-col-2 rf-mt-12w">
              <img src="logos/home-site-vitrine.png" style={{ height: '118px' }}/>
              <p className="fresque-text">Lancement de la plateforme de recrutement&nbsp;: octobre 2021.</p>
              <img src="logos/wireframe-espace-coop.png" style={{ height: '118px' }}/>
              <p className="fresque-text">Premier croquis de la Coop, janvier 2021.</p>
              <img src="logos/home-ressourcerie.png" style={{ height: '118px' }}/>
              <p className="fresque-text">Premi&egrave;re version de la ressourcerie&nbsp;: octobre 2021.</p>
              <img src="logos/photo-nec.png" style={{ height: '118px' }}/>
              <p className="fresque-text">Restitution atelier Outil de suivi d&rsquo;activit&eacute; partie 1, NEC Sud Charente (octobre 2021).</p>
              <img src="logos/home-carto.png" style={{ height: '118px' }}/>
              <p className="fresque-text">
                Exemple de de service actuellement en travaux&nbsp;: la cartographie nationale des points de m&eacute;diation num&eacute;rique
                (&Agrave; venir en 2022).
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
