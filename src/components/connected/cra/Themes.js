import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BigCheckboxButton from './Components/BigCheckboxButton';
import BigCheckboxMultipleButton from './Components/BigCheckBoxMultipleButton';

function Themes() {

  let cra = useSelector(state => state.cra);
  const [voirInformation, setVoirInformation] = useState(false);

  const handleClick = () => {
    setVoirInformation(!voirInformation);
  };
  return (
    <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--middle espacement">
      <div className="fr-col-xs-11 fr-col-offset-md-2 fr-col-md-10">
        <div className={`${voirInformation ? 'information-message-important fr-mb-2w' : 'close-information'}`}>
          <b>Important : </b>Trois exemples d&rsquo;ateliers sont donn&eacute;s pour illustrer chaque th&eacute;matique d&rsquo;accompagnement,
          ceux-ci sont non exhaustifs, chaque bouton th&eacute;matique se veut g&eacute;n&eacute;rique et peut &ecirc;tre interpr&eacute;t&eacute;,
          il est possible de cocher plusieurs th&eacute;matiques lorsque l&rsquo;on enregistre un accompagnement.
        </div>
      </div>
      <div className="fr-col-xs-11 fr-col-sm-11 fr-col-md-2 questionCheckboxResponsive">
        <span className={`question
        ${voirInformation ? 'open-information q6' : ''}
        ${cra?.printError && cra?.errorsRequired?.themes ? 'questionRequired' : ''}`}>
          Quelle(s) a / ont &eacute;t&eacute; la / les th&eacute;matique(s) de l&rsquo;accompagnement&nbsp;? (choix multiple)
          <i className="ri-information-line information" onClick={() => {
            handleClick();
          }}></i>
        </span>
      </div>
      <div className={`responsiveCheckbox1 ${voirInformation ? 'info-top-12 theme-height' : ''}`}>
        <BigCheckboxButton
          type="themes"
          label="Prendre en main du mat&eacute;riel"
          baseline="Installer des applications, etc."
          value="equipement informatique"
          image="/logos/cra/logo-equip-info.svg"
          imageSelected="/logos/cra/logo-equip-info-n.svg"
          heightImage="56px" />
        <div className={`${voirInformation ? 'information-message-theme' : 'close-information'}`}>
          <ul>
            <li>Prendre en main un ordinateur ou un smartphone.</li>
            <li>Installer des applications, g&eacute;rer les fichiers.</li>
            <li>Comment se connecter &agrave; un r&eacute;seau wifi.</li>
          </ul>
        </div>
      </div>

      <div className={`responsiveCheckbox2 ${voirInformation ? 'theme-height' : ''}`}>
        <BigCheckboxButton
          type="themes"
          label="Culture num&eacute;rique"
          baseline="Vocabulaire, r&eacute;glementations, etc. "
          value="vocabulaire"
          image="/logos/cra/logo-vocabulaire-info.svg"
          imageSelected="/logos/cra/logo-vocabulaire-info-n.svg"
          heightImage="56px" />
        <div className={`${voirInformation ? 'information-message-theme' : 'close-information'}`}>
          <ul>
            <li>Introduction &agrave; l&rsquo;informatique et aux &eacute;quipements.</li>
            <li>Pr&eacute;sentation des possibilit&eacute;s du num&eacute;rique et des logiciels.</li>
            <li>L&rsquo;&eacute;volution du num&eacute;rique dans la soci&eacute;t&eacute;, le RGPD.</li>
          </ul>
        </div>
      </div>

      <div className={`responsiveCheckboxNewRow1 ${voirInformation ? 'info-top-24 theme-height' : ''}`}>
        <BigCheckboxButton
          type="themes"
          label="Naviguer sur Internet"
          value="internet"
          image="/logos/cra/logo-naviguer-internet.svg"
          imageSelected="/logos/cra/logo-naviguer-internet-n.svg"
          heightImage="56px" />
        <div className={`${voirInformation ? 'information-message-theme' : 'close-information'}`}>
          <ul>
            <li>Pr&eacute;sentation, choix des diff&eacute;rents navigateurs et moteurs de recherche.</li>
            <li>G&eacute;rer l&rsquo;interface : favoris, historique, mots de passe, etc.</li>
            <li>Apprendre &agrave; effectuer une recherche.</li>
          </ul>
        </div>
      </div>

      <div className={`responsiveCheckbox2 ${voirInformation ? 'theme-height' : ''}`}>
        <BigCheckboxButton
          type="themes"
          label="Apprendre à s&eacute;curiser un &eacute;quipement"
          value="securite"
          image="/logos/cra/logo-securite.svg"
          imageSelected="/logos/cra/logo-securite-n.svg"
          heightImage="56px" />
        <div className={`${voirInformation ? 'information-message-theme' : 'close-information'}`}>
          <ul>
            <li>Pr&eacute;sentation des dangers du web (virus, cyber-attaques, arnaques).</li>
            <li>Utiliser un mot de passe, le contr&ocirc;le parental, un &eacute;cran de verrouillage, etc.</li>
            <li>Sauvegarder ses donn&eacute;es (disque dur, cloud, etc.), comprendre le RGPD.</li>
          </ul>
        </div>
      </div>

      <div className={`responsiveCheckboxNewRow1 ${voirInformation ? 'info-top-12 theme-height' : ''}`}>
        <BigCheckboxButton
          type="themes"
          label="G&eacute;rer ses courriels"
          value="courriel"
          image="/logos/cra/logo-courriel.svg"
          imageSelected="/logos/cra/logo-courriel-n.svg"
          heightImage="56px" />
        <div className={`${voirInformation ? 'information-message-theme' : 'close-information'}`}>
          <ul>
            <li>Choix d&rsquo;une bo&icirc;te mail, cr&eacute;ation d&rsquo;un compte.</li>
            <li>Explication et prise en main de l&rsquo;interface, bonnes pratiques.</li>
            <li>Usage de pi&egrave;ces-jointes, tri, raccourci bureau.</li>
          </ul>
        </div>
      </div>

      <div className={`responsiveCheckbox2 ${voirInformation ? 'theme-height' : ''}`}>
        <BigCheckboxButton
          type="themes"
          label="&Eacute;changer avec ses proches"
          value="echanger"
          image="/logos/cra/logo-echanger-proches.svg"
          imageSelected="/logos/cra/logo-echanger-proches-n.svg"
          heightImage="56px" />
        <div className={`${voirInformation ? 'information-message-theme' : 'close-information'}`}>
          <ul>
            <li>Comment utiliser un logiciel de messagerie instantan&eacute;e, un r&eacute;seau social. </li>
            <li>Utiliser son t&eacute;l&eacute;phone pour les diff&eacute;rents &eacute;changes : mails, sms, Whatsapp, Skype, etc.</li>
            <li>Prendre en main un logiciel de visioconf&eacute;rence.</li>
          </ul>
        </div>
      </div>

      <div className={`responsiveCheckboxNewRow1 ${voirInformation ? 'info-top-24 theme-height' : ''}`}>
        <BigCheckboxButton
          type="themes"
          label="Apprendre les bases de la bureautique"
          value="traitement texte"
          image="/logos/cra/logo-traitement-texte.svg"
          imageSelected="/logos/cra/logo-traitement-texte-n.svg"
          heightImage="56px" />
        <div className={`${voirInformation ? 'information-message-theme' : 'close-information'}`}>
          <ul>
            <li>Prendre en main OpenOffice, Word, Excel, Powerpoint.</li>
            <li>Organiser ses fichiers, ses dossiers.</li>
            <li>Apprendre &agrave; faire un partage d&rsquo;&eacute;cran.</li>
            <li>Apprendre &agrave; envoyer des dossiers importants.</li>
          </ul>
        </div>
      </div>

      <div className={`responsiveCheckbox2 ${voirInformation ? 'theme-height' : ''}`}>
        <BigCheckboxButton
          type="themes"
          label="Cr&eacute;er, g&eacute;rer ses contenus num&eacute;riques"
          value="contenus numeriques"
          image="/logos/cra/logo-contenus-numeriques.svg"
          imageSelected="/logos/cra/logo-contenus-numeriques-n.svg"
          heightImage="56px" />
        <div className={`${voirInformation ? 'information-message-theme' : 'close-information'}`}>
          <ul>
            <li>&Eacute;dition de base (ex : int&eacute;gration de photos dans des documents).</li>
            <li>Cr&eacute;ation de m&eacute;dias : retouche d&rsquo;images, vid&eacute;os, BD num&eacute;rique.</li>
            <li>Conceptions avanc&eacute;es : impression 3D / mod&eacute;lisation, code, Raspberry Pi, Makey Makey, etc.</li>
          </ul>
        </div>
      </div>

      <div className={`responsiveCheckboxNewRow1 ${voirInformation ? 'info-top-12 theme-height' : ''}`}>
        <BigCheckboxButton
          type="themes"
          label="Trouver un emploi ou une formation"
          value="trouver emploi"
          image="/logos/cra/logo-trouver-emploi.svg"
          imageSelected="/logos/cra/logo-trouver-emploi-n.svg"
          heightImage="56px" />
        <div className={`${voirInformation ? 'information-message-theme' : 'close-information'}`}>
          <ul>
            <li>S&rsquo;inscrire, prendre en main le site de P&ocirc;le emploi.</li>
            <li>Cr&eacute;er et diffuser son CV num&eacute;rique.</li>
            <li>Rechercher un emploi en ligne, utiliser un agenda num&eacute;rique. </li>
          </ul>
        </div>
      </div>

      <div className={`responsiveCheckbox2 ${voirInformation ? 'theme-height' : ''}`}>
        <BigCheckboxButton
          type="themes"
          label="Assister un professionnel"
          baseline="TPE, PME..."
          value="tpe/pme"
          image="/logos/cra/logo-tpe-pme.svg"
          imageSelected="/logos/cra/logo-tpe-pme-n.svg"
          heightImage="56px" />
        <div className={`${voirInformation ? 'information-message-theme' : 'close-information'}`}>
          <ul>
            <li>D&eacute;velopper sa communication (ex : r&eacute;seaux sociaux).</li>
            <li>Cr&eacute;er son site internet et son mail professionnels, comprendre le r&eacute;f&eacute;rencement.</li>
            <li>D&eacute;couvrir les diff&eacute;rents outils : comptabilit&eacute;, gestion, collaboration, etc.</li>
          </ul>
        </div>
      </div>

      <div className={`responsiveCheckboxNewRow1 ${voirInformation ? 'info-top-34 theme-height' : ''}`}>
        <BigCheckboxButton
          type="themes"
          label="Accompagner un aidant"
          baseline="parent, &eacute;ducateur, professeur..."
          value="accompagner enfant"
          image="/logos/cra/logo-accompagner-enfant.svg"
          imageSelected="/logos/cra/logo-accompagner-enfant-n.svg"
          heightImage="56px" />
        <div className={`${voirInformation ? 'information-message-theme' : 'close-information'}`}>
          <ul>
            <li>D&eacute;couvrir les usages num&eacute;riques des enfants.</li>
            <li>Utiliser une plateforme de suivi de scolaire.</li>
            <li>Utiliser un service communal pour l&rsquo;enfance.</li>
          </ul>
        </div>
      </div>

      <div className={`responsiveCheckbox2 ${voirInformation ? 'theme-height' : ''}`}>
        <BigCheckboxButton
          type="themes"
          label="R&eacute;aliser une d&eacute;marche en ligne"
          baseline="vers l&rsquo;autonomie"
          value="demarche en ligne"
          image="/logos/cra/logo-demarche-en-ligne.svg"
          imageSelected="/logos/cra/logo-demarche-en-ligne-n.svg"
          heightImage="56px" />
        <div className={`${voirInformation ? 'information-message-theme' : 'close-information'}`}>
          <ul>
            <li>Aider l&rsquo;usager &agrave; trouver la bonne plateforme pour sa d&eacute;marche.</li>
            <li>Apprendre &agrave; s&rsquo;inscrire et utiliser les services : CAF, Imp&ocirc;ts, France Connect, etc.</li>
            <li>Processus divers (ex : s&rsquo;inscrire aux &eacute;lections, trouver son bureau de vote).</li>
          </ul>
        </div>
      </div>

      <div className={`responsiveCheckboxNewRow1 ${voirInformation ? 'info-fraude theme-height' : ''}`}>
        <BigCheckboxButton
          type="themes"
          label="Pr&eacute;venir les fraudes et/ou le harc&egrave;lement"
          value="fraude et harcelement"
          image="/logos/cra/logo-fraude.svg"
          imageSelected="/logos/cra/logo-fraude-n.svg"
          heightImage="56px" />
        <div className={`${voirInformation ? 'information-message-theme' : 'close-information'}`}>
          <ul>
            <li>Sensibiliser aux infox, savoir v&eacute;rifier une information, avoir un usage raisonn&eacute; des r&eacute;seaux sociaux.</li>
            <li>Pr&eacute;venir le cyberharc&egrave;lement, apprendre &agrave; avoir le bon comportement sur le net.</li>
            <li>Savoir reconna&icric;tre une arnaque : mail frauduleux, une publicit&eacute; douteuse, etc. </li>
          </ul>
        </div>
      </div>

      <div className={`responsiveCheckbox2 ${voirInformation ? 'theme-height' : ''}`}>
        <BigCheckboxMultipleButton
          type="themes"
          label="Sant&eacute;"
          baseline="cr&eacute;ation de compte Ameli, etc."
          value="sante"
          image="/logos/cra/logo-sante.svg"
          imageSelected="/logos/cra/logo-sante-n.svg"
          heightImage="56px" />
        <div className={`${voirInformation ? 'information-message-theme' : 'close-information'}`}>
          <ul>
            <li>Trouver une consultation, prendre Doctolib en main.</li>
            <li>Utiliser son compte Am&eacute;li et g&eacute;rer ses documents, Mon espace sant&eacute;.</li>
            <li>Souscrire &agrave; une compl&eacute;mentaire sant&eacute;</li>
          </ul>
        </div>
      </div>

      {cra?.themes?.includes('autre') &&
        <div className="responsiveCheckboxNewRow1">
          <div className="checkboxButton">
            <button id="checkboxRattachement" className="checkboxRattachement checkboxRattachement-selected" style={{ height: '108px' }}>
              <span className="fr-label labelCheckboxCustom checkboxRattachement-selected" style={{ marginLeft: '105px' }}>Autre <br/>
                <span className="baseline">(Ancienne th&egrave;matique, non-modifiable)</span>
              </span>
            </button>
          </div>
        </div>
      }
      
    </div>
  );
}

export default Themes;
