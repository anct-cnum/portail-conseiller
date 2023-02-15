import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BigButtonSuggestion from './Components/BigButtonSuggestion';
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
      <div className="fr-col-xs-11 fr-col-sm-11 fr-col-md-2 questionCheckboxResponsive">
        <span className={`question
        ${voirInformation ? 'open-information q6' : ''}
        ${cra?.printError && cra?.errorsRequired?.themes ? 'questionRequired' : ''}`}>
          Th&eacute;matique(s) d&rsquo;accompagnement&nbsp;
          <i className="ri-information-line information" onClick={() => {
            handleClick();
          }}></i>
        </span>
      </div>
      <div className="fr-col-xs-11 fr-col-md-10 fr-mt-n2w">
        <div className={`${voirInformation ? 'information-message-important fr-mb-2w' : 'close-information'}`}>
          <b>Important : </b>Trois exemples d&rsquo;ateliers sont donn&eacute;s pour illustrer chaque th&eacute;matique d&rsquo;accompagnement,
          ceux-ci sont non exhaustifs, chaque bouton th&eacute;matique se veut g&eacute;n&eacute;rique et peut &ecirc;tre interpr&eacute;t&eacute;,
          il est possible de cocher plusieurs th&eacute;matiques lorsque l&rsquo;on enregistre un accompagnement.
        </div>
      </div>
      <div className={`responsiveCheckbox1 ${voirInformation ? 'info-diagnostic theme-height' : ''}`}>
        <BigCheckboxButton
          type="themes"
          label="Diagnostic num&eacute;rique"
          baseline="&Eacute;valuation du niveau des usagers."
          value="diagnostic"
          image="diagnostic"
          imageSelected="diagnosticSelected"/>
        <div className={`${voirInformation ? 'information-message-theme' : 'close-information'}`}>
          <ul>
            <li>&Eacute;valuer les connaissances num&eacute;riques, et le mat&eacute;riel des usagers.</li>
            <li>Conduire un questionnaire d&rsquo;&eacute;valuation (ex : Pix).</li>
          </ul>
        </div>
      </div>

      <div className={`responsiveCheckbox2 ${voirInformation ? 'info-top-24 theme-height' : ''}`}>
        <BigCheckboxMultipleButton
          type="themes"
          label="Prendre en main du mat&eacute;riel"
          baseline="Installer des applications, etc."
          value="equipement informatique"
          image="equipement"
          imageSelected="equipementSelected"/>
        <div className={`${voirInformation ? 'information-message-theme' : 'close-information'}`}>
          <ul>
            <li>Prendre en main un ordinateur ou un smartphone.</li>
            <li>Installer des applications, g&eacute;rer les fichiers.</li>
            <li>Comment se connecter &agrave; un r&eacute;seau wifi.</li>
          </ul>
        </div>
      </div>

      <div className={`responsiveCheckbox3_1 ${voirInformation ? 'info-budget theme-height' : ''}`}>
        <BigCheckboxButton
          type="themes"
          label="Budget"
          baseline="Inclusion bancaire, achats en ligne,etc."
          value="budget"
          image="budget"
          imageSelected="budgetSelected"
        />
        <div className={`${voirInformation ? 'information-message-theme' : 'close-information'}`}>
          <ul>
            <li>Effectuer un achat en ligne.</li>
            <li>Installer une application bancaire et mettre en place une double authentification.</li>
            <li>D&eacute;couvrir les outils pour g&eacute; pour son budget (tableurs, etc.).</li>
          </ul>
        </div>
      </div>

      <div className={`responsiveCheckbox1_2 ${voirInformation ? 'theme-height' : ''}`}>
        <BigCheckboxButton
          type="themes"
          label="Culture num&eacute;rique"
          baseline="Vocabulaire, r&eacute;glementations, etc. "
          value="vocabulaire"
          image="cultureNumerique"
          imageSelected="cultureNumeriqueSelected"
        />
        <div className={`${voirInformation ? 'information-message-theme' : 'close-information'}`}>
          <ul>
            <li>Introduction &agrave; l&rsquo;informatique et aux &eacute;quipements.</li>
            <li>Pr&eacute;sentation des possibilit&eacute;s du num&eacute;rique et des logiciels.</li>
            <li>L&rsquo;&eacute;volution du num&eacute;rique dans la soci&eacute;t&eacute;, le RGPD.</li>
          </ul>
        </div>
      </div>

      <div className={`responsiveCheckbox2_1 ${voirInformation ? 'theme-height info-naviguer' : ''}`}>
        <BigCheckboxButton
          type="themes"
          label="Comment naviguer sur Internet"
          value="internet"
          image="navigateur"
          imageSelected="navigateurSelected"
        />
        <div className={`${voirInformation ? 'information-message-theme' : 'close-information'}`}>
          <ul>
            <li>Pr&eacute;sentation, choix des diff&eacute;rents navigateurs et moteurs de recherche.</li>
            <li>G&eacute;rer l&rsquo;interface : favoris, historique, mots de passe, etc.</li>
            <li>Apprendre &agrave; effectuer une recherche.</li>
          </ul>
        </div>
      </div>

      <div className={`responsiveCheckbox3 ${voirInformation ? 'theme-height' : ''}`}>
        <BigCheckboxButton
          type="themes"
          label="Emploi, formation"
          value="trouver emploi"
          image="emploi"
          imageSelected="emploiSelected"
        />
        <div className={`${voirInformation ? 'information-message-theme' : 'close-information'}`}>
          <ul>
            <li>S&rsquo;inscrire, prendre en main le site de P&ocirc;le emploi.</li>
            <li>Cr&eacute;er et diffuser son CV num&eacute;rique.</li>
            <li>Rechercher un emploi en ligne, utiliser un agenda num&eacute;rique. </li>
          </ul>
        </div>
      </div>

      <div className={`responsiveCheckbox1 ${voirInformation ? 'info-top-12 theme-height' : ''}`}>
        <BigCheckboxButton
          type="themes"
          label="G&eacute;rer ses courriels"
          value="courriel"
          image="courriel"
          imageSelected="courrielSelected"
        />
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
          image="echanger"
          imageSelected="echangerSelected"
        />
        <div className={`${voirInformation ? 'information-message-theme' : 'close-information'}`}>
          <ul>
            <li>Comment utiliser un logiciel de messagerie instantan&eacute;e, un r&eacute;seau social. </li>
            <li>Utiliser son t&eacute;l&eacute;phone pour les diff&eacute;rents &eacute;changes : mails, sms, Whatsapp, Skype, etc.</li>
            <li>Prendre en main un logiciel de visioconf&eacute;rence.</li>
          </ul>
        </div>
      </div>

      <div className={`responsiveCheckbox3_1 ${voirInformation ? 'info-pro theme-height ' : ''}`}>
        <BigCheckboxButton
          type="themes"
          label="Assister un professionnel"
          baseline="TPE, PME, structure associative..."
          value="tpe/pme"
          image="tpePme"
          imageSelected="tpePmeSelected"
        />
        <div className={`${voirInformation ? 'information-message-theme' : 'close-information'}`}>
          <ul>
            <li>D&eacute;velopper sa communication (ex : r&eacute;seaux sociaux).</li>
            <li>Cr&eacute;er son site internet et son mail professionnels, comprendre le r&eacute;f&eacute;rencement.</li>
            <li>D&eacute;couvrir les diff&eacute;rents outils : comptabilit&eacute;, gestion, collaboration, etc.</li>
          </ul>
        </div>
      </div>

      <div className={`responsiveCheckbox1_2 ${voirInformation ? 'theme-height' : ''}`}>
        <BigCheckboxButton
          type="themes"
          label="S&eacute;curiser un &eacute;quipement"
          baseline="Antivirus, protection des donn&eacute;es"
          value="securite"
          image="securite"
          imageSelected="securiteSelected"
        />
        <div className={`${voirInformation ? 'information-message-theme' : 'close-information'}`}>
          <ul>
            <li>Pr&eacute;sentation des dangers du web (virus, cyber-attaques, arnaques).</li>
            <li>Utiliser un mot de passe, le contr&ocirc;le parental, un &eacute;cran de verrouillage, etc.</li>
            <li>Sauvegarder ses donn&eacute;es (disque dur, cloud, etc.), comprendre le RGPD.</li>
          </ul>
        </div>
      </div>

      <div className={`responsiveCheckbox2_1 ${voirInformation ? 'theme-height' : ''}`}>
        <BigCheckboxButton
          type="themes"
          label="Contenus num&eacute;riques"
          baseline="Photos, vid&eacute;os, impression 3D, code..."
          value="contenus numeriques"
          image="contenus"
          imageSelected="contenusSelected"
        />
        <div className={`${voirInformation ? 'information-message-theme' : 'close-information'}`}>
          <ul>
            <li>&Eacute;dition de base (ex : int&eacute;gration de photos dans des documents).</li>
            <li>Cr&eacute;ation de m&eacute;dias : retouche d&rsquo;images, vid&eacute;os, BD num&eacute;rique.</li>
            <li>Conceptions avanc&eacute;es : impression 3D / mod&eacute;lisation, code, Raspberry Pi, Makey Makey, etc.</li>
          </ul>
        </div>
      </div>

      <div className={`responsiveCheckbox3 ${voirInformation ? 'info-aidant theme-height' : ''}`}>
        <BigCheckboxMultipleButton
          type="themes"
          label="Accompagner un aidant"
          value="accompagner enfant"
          image="accompagner"
          imageSelected="accompagnerSelected"
        />
        <div className={`${voirInformation ? 'information-message-theme' : 'close-information'}`}>
          <ul>
            <li>D&eacute;couvrir les usages num&eacute;riques des enfants.</li>
            <li>Utiliser une plateforme de suivi de scolaire.</li>
            <li>Utiliser un service communal pour l&rsquo;enfance.</li>
          </ul>
        </div>
      </div>

      <div className={`responsiveCheckbox1 ${voirInformation ? 'info-fraude theme-height' : ''}`}>
        <BigCheckboxButton
          type="themes"
          label="Pr&eacute;venir les fraudes, le harc&egrave;lement"
          value="fraude et harcelement"
          image="fraude"
          imageSelected="fraudeSelected"
        />
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
          label="Bureautique"
          value="traitement texte"
          image="bureautique"
          imageSelected="bureautique"
        />
        <div className={`${voirInformation ? 'information-message-theme' : 'close-information'}`}>
          <ul>
            <li>Prendre en main OpenOffice, Word, Excel, Powerpoint.</li>
            <li>Organiser ses fichiers, ses dossiers.</li>
            <li>Apprendre &agrave; faire un partage d&rsquo;&eacute;cran.</li>
            <li>Apprendre &agrave; envoyer des dossiers importants.</li>
          </ul>
        </div>
      </div>

      <div className={`responsiveCheckbox3_1 ${voirInformation ? 'theme-height info-scolaire' : ''}`}>
        <BigCheckboxButton
          type="themes"
          label="Scolaire"
          value="scolaire"
          image="scolaire"
          imageSelected="scolaireSelected"
        />
        <div className={`${voirInformation ? 'information-message-theme' : 'close-information'}`}>
          <ul>
            <li>Accompagner un groupe scolaire et/ou un enfant sur un outil num&eacute;rique.</li>
            <li>&Eacute;valuer le niveau des jeunes avec un logiciel (maths, français, etc).</li>
          </ul>
        </div>
      </div>

      <div className={`responsiveCheckbox1_2 ${voirInformation ? 'theme-height' : ''}`}>
        <BigCheckboxMultipleButton
          type="themes"
          label="Sant&eacute;"
          baseline="cr&eacute;ation de compte Ameli, etc."
          value="sante"
          image="sante"
          imageSelected="santeSelected"
        />
        <div className={`${voirInformation ? 'information-message-theme' : 'close-information'}`}>
          <ul>
            <li>Trouver une consultation, prendre Doctolib en main.</li>
            <li>Utiliser son compte Am&eacute;li et g&eacute;rer ses documents, Mon espace sant&eacute;.</li>
            <li>Souscrire &agrave; une compl&eacute;mentaire sant&eacute;</li>
          </ul>
        </div>
      </div>

      <div className={`responsiveCheckbox2_1 ${voirInformation ? 'info-demarche theme-height' : ''}`}>
        <BigCheckboxButton
          type="themes"
          label="D&eacute;marches administratives"
          value="demarche en ligne"
          image="demarche"
          imageSelected="demarcheSelected"
        />
        <div className={`${voirInformation ? 'information-message-theme' : 'close-information'}`}>
          <ul>
            <li>Aider l&rsquo;usager &agrave; trouver la bonne plateforme pour sa d&eacute;marche.</li>
            <li>Apprendre &agrave; s&rsquo;inscrire et utiliser les services : CAF, Imp&ocirc;ts, France Connect, etc.</li>
            <li>Processus divers (ex : s&rsquo;inscrire aux &eacute;lections, trouver son bureau de vote).</li>
          </ul>
        </div>
      </div>

      <div className={`responsiveCheckbox3 ${voirInformation ? 'info-suggestion theme-height' : ''}`}>
        <BigButtonSuggestion />
        <div className={`${voirInformation ? 'information-message-theme' : 'close-information'}`}>
          <ul>
            <li>Permet de pr&eacute;ciser la, ou les th&eacute;matiques coch&eacute;es. </li>
            <li>Les annotations sont visibles dans votre historique de CRA.</li>
            <li>Mutualise &eacute;galement l&rsquo;annotation dans la base de donn&eacute;es CnFS pour les &eacute;volutions futures pour l&rsquo;outil.</li>
          </ul>
        </div>
      </div>

      {cra?.themes?.includes('autre') &&
        <div className="responsiveCheckbox1">
          <div className="checkboxButton">
            <div className="gradient-box">
              <button className="checkboxRattachement2 checkboxRattachement2-selected" style={{ height: '104px' }}>
                <div style={{ display: 'flex' }}>
                  <span className="imageTheme autreSelected"></span>
                  <span
                    className="fr-label labelCheckboxCustom checkboxRattachement-selected">
                    Autre
                    <br/>
                    <span className="baseline">(Ancienne th&egrave;matique, non-modifiable)</span>
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      }

    </div>
  );
}

export default Themes;
