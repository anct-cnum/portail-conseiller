import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Footer from '../Footer';
import Header from '../Header';
import HeaderHub from '../hub/HeaderHub';

function Propos() {

  const user = useSelector(state => state.authentication?.user?.user);
  const aideCoop = process.env.REACT_APP_MATTERMOST_URL + '/cnum/channels/aide_espace_coop';
  const atelierActivite = process.env.REACT_APP_MATTERMOST_URL + '/cnum/channels/atelier-nec---suivi-dactivite';
  const atelierPartenariats = process.env.REACT_APP_MATTERMOST_URL + '/cnum/channels/atelier-nec-2022---demarches-partenariales';

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div>
      { user?.role === 'hub_coop' ? <HeaderHub linkAccount={user?.name} /> : <Header linkAccount={user?.name}/>}
      <div id="propos">
        <div className="fr-container fr-mb-15w">
          <div className="fr-grid-row">
            <div className="fr-col-2 fr-my-15w">
              <div className="sommaire">
                <div className="fr-mt-6w fr-mb-3w ">
                  Sommmaire
                </div>
                <div className="fr-mb-1w">
                  <a href="#utiliteCoop">&Agrave; quoi sert l&rsquo;espace Coop ?</a>
                </div>
                <div className="fr-mb-1w">
                  <a href="#constructionCoop">Comment l&rsquo;espace Coop est-il construit ?</a>
                  <ol>
                    <li><a href="#applicationEquipeCoop">Applications g&eacute;r&eacute;es par l&rsquo;&eacute;quipe de conception Coop</a></li>
                    <li><a href="#liensSeviceAutreEquipe">Liens vers les services d&eacute;velopp&eacute;s par d&rsquo;autres &eacute;quipes</a></li>
                  </ol>
                </div>
                <div className="fr-mb-1w">
                  <a href="#philosophieOutils">La philosophie des outils : co-construire avec vous, et en am&eacute;lioration continue</a>
                  <ol>
                    <li><a href="#contribution">Vous aussi, contribuez si vous le souhaitez</a></li>
                    <li><a href="#exempleContribution">Quelques exemples concrets de participations</a></li>
                  </ol>
                </div>
                <div className="fr-mb-1w">
                  <a href="#historiqueConception">Historique de conception des services num&eacute;riques CnFS</a>
                </div>
              </div>
            </div>
            <div className="fr-col-10 fr-mt-9w">
              <h1 className="fr-mb-3w">
                &Agrave; propos de l&rsquo;espace Coop
              </h1>
              <div className="fr-mt-9w">
                <p>
                  <span className="sous-titre">La Coop est la plateforme d&eacute;di&eacute;e aux conseillers num&eacute;riques France Services</span><br/>
                  <span className="sous-titre-2">Lanc&eacute;e au second semestre 2021, celle-ci est en am&eacute;lioration continue.</span>
                </p>
              </div>
              <div className="fr-container--fluid">
                <div className="fr-grid-row">
                  <div className="fr-col-10 fr-my-9w">
                    <h2 id="utiliteCoop" >&Agrave; quoi sert l&rsquo;espace Coop ?</h2>
                    <p>
                      <b>Renseigner son compte-rendu d&rsquo;activit&eacute;s</b> (obligatoire pour tous les CnFS) :<br/>
                      – permet de suivre son activit&eacute; de m&eacute;diation, de la valoriser aupr&egrave;s de ses r&eacute;f&eacute;rents ;<br/>
                      – permet &eacute;galement &agrave; l&rsquo;&eacute;tat d&rsquo;administrer et piloter le dispostif CnFS.<br/>
                    </p>
                    <p>
                      <b>&eacute;changer entre conseillers num&eacute;riques</b> via l&rsquo;espace de discussion pour :<br/>
                      – des &eacute;changes de pratiques, des conseils, de l&rsquo;aide dans son activit&eacute; ;<br/>
                      – faire des retours, participer &agrave; l&rsquo;am&eacute;lioration des outils CnFS.<br/>
                    </p>
                    <p>
                      <b>Trouver des supports et des outils</b> pour mener ses activit&eacute;s de m&eacute;diation :<br/>
                      – La Base, biblioth&egrave;que du num&eacute;rique d&rsquo;int&eacute;r&ecirc;t g&eacute;n&eacute;ral ;<br/>
                      – les applications pour am&eacute;liorer et structurer votre activit&eacute; : Pix, Rendez-vous Aide Num&eacute;rique ;<br/>
                      – le kit communication, pour communiquer en tant que CnFS.<br/>
                    </p>
                  </div>
                  <div className="fr-col-2 fr-my-9w">
                    <img src="/logos/communaute-cnfs.svg" className="fr-mt-13w"/>
                  </div>
                  <div className="fr-col-10">
                    <h2 id="constructionCoop">Comment l&rsquo;espace Coop est-il construit ?</h2>
                    <p className="sous-titre-2">La plateforme est principalement constitu&eacute;e de deux types de blocs : </p>
                    <h3 id="applicationEquipeCoop">
                      1. Les applications g&eacute;r&eacute;es par l&rsquo;&eacute;quipe de conception Coop
                    </h3>
                    <div className="fr-container--fluid">
                      <div className="fr-grid-row">
                        <div className="fr-col-6 sous-titre-2 fr-mb-4w">
                          D&eacute;velopp&eacute;es en interne :
                        </div>
                        <div className="fr-col-6 sous-titre-2 fr-mb-4w">
                          Install&eacute;es  et maintenues en interne :
                        </div>
                        <div className="fr-col-6 fr-mb-4w">
                          <img src="/logos/home-connected/icone-cra.svg" className="icone-cra"/>
                          <div className="text-icone">
                            <b>L&rsquo;outil de suivi d&rsquo;activit&eacute; (CRA)</b><br/>
                            <span className="sous-titre-2">Suivre son activit&eacute; de m&eacute;diation</span>
                          </div>
                        </div>
                        <div className="fr-col-6 fr-mb-4w">
                          <img src="/logos/home-connected/icone-courriel.svg" className="icone-mail"/>
                          <div className="text-icone">
                            <b>Mail Conseiller num&eacute;rique</b><br/>
                            <span className="sous-titre-2">Consultation des mails @conseiller-numerique.fr</span>
                          </div>
                        </div>
                        <div className="fr-col-6 fr-mb-4w">
                          <img src="/logos/home-connected/icone-lieux.svg" className="icone-lieux"/>
                          <div className="text-icone">
                            <b>Lieux d&rsquo;activit&eacute; CnFS</b><br/>
                            <span className="sous-titre-2">Vous rend visible sur la carte nationale<br/> carte.conseiller-numerique.gouv.fr</span>
                          </div>
                        </div>
                        <div className="fr-col-6 fr-mb-4w">
                          <img src="/logos/home-connected/icone-discussion.svg" className="icone-mattermost"/>
                          <div className="text-icone">
                            <b>L&rsquo;espace de discussion (Mattermost)</b><br/>
                            <span className="sous-titre-2">Chat communautaire d&eacute;di&eacute; aux conseillers<br/> num&eacute;riques</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 id="liensSeviceAutreEquipe">
                      2. Les liens vers les services d&eacute;velopp&eacute;s par d&rsquo;autres &eacute;quipes mandat&eacute;es par l&rsquo;&eacute;tat
                    </h3>
                    <div className="fr-container--fluid">
                      <div className="fr-grid-row">
                        <div className="fr-col-6 fr-mb-4w">
                          <img src="/logos/home-connected/icone-la-base.svg" className="icone-base"/>
                          <div className="text-icone">
                            <b>La Base</b><br/>
                            <span className="sous-titre-2">
                              La bibiloth&egrave;que des ressources des<br/>
                              professionnels du num&eacute;rique d&rsquo;int&eacute;r&ecirc;t g&eacute;n&eacute;ral.
                            </span>
                          </div>
                        </div>
                        <div className="fr-col-6 fr-mb-4w">
                          <img src="/logos/home-connected/icone-pix.svg" className="icone-pix"/>
                          <div className="text-icone">
                            <b>PIX</b><br/>
                            <span className="sous-titre-2">
                              Service public en ligne pour &eacute;valuer, d&eacute;velopper<br/>
                              et certifier les comp&eacute;tences num&eacute;riques.
                            </span>
                          </div>
                        </div>
                        <div className="fr-col-6 fr-mb-4w">
                          <img src="/logos/home-connected/logo-rdv-aide-numerique.svg" className="icone-rdv"/>
                          <div className="text-icone">
                            <b>RDV Aide Num&eacute;rique</b><br/>
                            <span className="sous-titre-2">
                              Permet aux usagers ayant pris rendez-vous pour<br/>
                              un accompagnement d&rsquo;&ecirc;tre rappel&eacute;s par SMS.
                            </span>
                          </div>
                        </div>
                        <div className="fr-col-6 fr-mb-4w">
                          <img src="/logos/home-connected/icone-cartographie-SN.svg" className="icone-carte"/>
                          <div className="text-icone">
                            <b>Cartographie Soci&eacute;t&eacute; Num&eacute;rique</b><br/>
                            <span className="sous-titre-2">
                              Carte des structures d&rsquo;inclusion num&eacute;rique<br/>
                              cartographie.societenumerique.gouv.fr
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="fr-col-2">
                    <img src="/logos/engrenages-cnfs.svg" className="" style={{ display: 'block', marginLeft: '40px', marginTop: '18rem' }}/>
                  </div>
                  <div className="fr-col-10 fr-mt-9w">
                    <h2 id="philosophieOutils">La philosophie des outils CnFS : co-construire avec vous,<br/>et en am&eacute;lioration continue</h2>
                    <p>
                      Les outils des CnFS (Coop, CRA, carte, kit de communication, etc.) sont conçus en mettant l&rsquo;humain<br/>
                      au centre : avec la participation active de conseillers num&eacute;riques, de m&eacute;diateurs exp&eacute;riment&eacute;s,
                      ainsi<br/> que d&rsquo;un panel vari&eacute; d&rsquo;acteurs de l&rsquo;&eacute;co-syst&egrave;me de la m&eacute;diation num&eacute;rique.
                    </p>
                    <p>
                      Le but final de cette d&eacute;marche est de fournir les outils qui correspondent au mieux &agrave; la r&eacute;alit&eacute;
                      de<br/> terrain des conseillers num&eacute;riques.
                    </p>
                    <p>
                      Consulter le&nbsp;
                      <a className="fr-link fr-fi-external-link-line fr-link--icon-right validation-extern-btn" href="">journal de bord</a>
                      &nbsp;de la Coop pour d&eacute;couvrir la liste des mises &agrave; jour &agrave; venir et pass&eacute;es.

                    </p>
                    <h3 id="contribution" className="fr-mt-6w">1. Vous aussi, contribuez si vous le souhaitez !</h3>
                    <p>
                      Vous souhaitez effectuer un retour, faire part d&rsquo;un besoin, d&rsquo;une id&eacute;e, signaler un bug, participer &agrave; un
                      <br/> atelier de conception, ou d&eacute;couvrir les futures am&eacute;liorations en avant-premi&egrave;re ?
                    </p>
                    <p>
                      Rejoignez les canaux d&eacute;di&eacute;s sur l&rsquo;espace de discussion (Mattermost) :
                    </p>
                    <div className="fr-container--fluid fr-my-6w">
                      <div className="fr-grid-row">
                        <a className="fr-col-3 lien-mattermost" href={aideCoop} target="blank" rel="noopener noreferrer">
                          <img src="/logos/bulle-ressourcerie.svg" className="bulle-ressourcerie" alt="liens aide vers Mattermost"/>
                          Aide - Espace Coop
                        </a>
                        <a className="fr-col-4 lien-mattermost" href={atelierActivite} target="blank" rel="noopener noreferrer">
                          <img src="/logos/bulle-ressourcerie.svg" className="bulle-ressourcerie" alt="liens aide vers Mattermost"/>
                          Atelier - Outil de suivi d&rsquo;activit&eacute;
                        </a>
                        <a className="fr-col-3 lien-mattermost" href={atelierPartenariats} target="blank" rel="noopener noreferrer">
                          <img src="/logos/bulle-ressourcerie.svg" className="bulle-ressourcerie" alt="liens aide vers Mattermost"/>
                          Atelier - Partenariats
                        </a>
                      </div>
                    </div>
                    <h3 id="exempleContribution">2. Quelques exemples concrets de participations : </h3>
                    <ul>
                      <li className="fr-mb-3w">
                      Une douzaine de m&eacute;diateurs num&eacute;riques et des r&eacute;f&eacute;rents territoriaux ont
                      particip&eacute; &agrave; la d&eacute;finition<br/> de l&rsquo;espace Coop en janvier 2021.
                      </li>
                      <li className="fr-mb-3w">
                        Le CRA (outil de Compte Rendu d&rsquo;Activit&eacute;) a &eacute;t&eacute; pourvu de multiples am&eacute;liorations
                        apport&eacute;es par<br/> les CnFS, leurs coordinateurs, et d&rsquo;autres m&eacute;diateurs num&eacute;riques confirm&eacute;s
                        depuis sa conception<br/> et son lancement en 2021.
                      </li>
                      <li className="fr-mb-3w">
                        L&rsquo;application Lieux d&rsquo;activit&eacute;s a subi deux it&eacute;rations de tests lors de sa conception.
                        L&rsquo;&eacute;v&egrave;nement<br/> NEC 2022, a donn&eacute; lieu &agrave; un nouvel atelier de conception, en lien
                        avec la mise en valeur de l&rsquo;offre<br/> de services des conseillers num&eacute;riques sur la carte nationale de
                        la m&eacute;diation num&eacute;rique.
                      </li>
                    </ul>
                  </div>
                  <div className="fr-col-2 fr-mt-9w">
                    <img src="/logos/participation-cnfs.svg" />
                  </div>
                  <div className="fr-col-10 fr-mt-9w">
                    <h2 id="historiqueConception">Historique de conception des services num&eacute;riques CnFS</h2>
                    <div>
                      <b>2020</b><br/>
                      <p>
                        Octobre : lancement du dispositif Conseiller num&eacute;rique France Services et de sa plateforme de <br/>recrutement en un mois
                        (&eacute;quipe de conception de 3 personnes).
                      </p>
                      <b>2021</b><br/>
                      <p>
                        semestre 1 : articulation du processus de recrutement, maintient des espaces (50 000 candidats et<br/> structures) ;
                        conception de l&rsquo;espace Coop.<br/>
                        semestre 2 : mise en ligne de la Coop ; conception de la carte nationale CnFS.
                      </p>
                      <b>2022</b><br/>
                      <p>
                        semestre 1 : mise en ligne de la carte nationale CnFS ; &eacute;volution de l&rsquo;outil de suivi d&rsquo;activit&eacute;.<br/>
                        semestre 2 : constitution d&rsquo;&eacute;quipes d&eacute;di&eacute;es : Carte, Coop, Tableau de bord structures (environ 4 &agrave;
                        5<br/> personnes par &eacute;quipe, les services sont en am&eacute;lioration continue).
                      </p>
                    </div>
                  </div>
                  <div className="fr-col-2" style={{ marginTop: '-21.55rem' }}>
                    <img src="/logos/wireframe-espace-coop.png" style={{ height: '118px' }}/>
                    <p className="fresque-text">Premier croquis de la Coop, janvier 2021.</p>
                    <img src="/logos/photo-nec.png" style={{ height: '118px' }}/>
                    <p className="fresque-text">Atelier de conception de l&rsquo;outil de suivi d&rsquo;activit&eacute;, NEC 2021.</p>
                    <img src="/logos/home-site-vitrine.png" style={{ height: '118px' }}/>
                    <p className="fresque-text">Lancement de la plateforme de recrutement, oct. 2020.</p>
                    <img src="/logos/home-carto.png" style={{ height: '118px' }}/>
                    <p className="fresque-text">Premiers desgins carte nationale CnFS, nov. 2021.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer type="support" role={user.role}/>
    </div>
  );
}

export default Propos;
