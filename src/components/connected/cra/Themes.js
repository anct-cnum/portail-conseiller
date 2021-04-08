import React from 'react';
import BigCheckboxButton from './Components/BigCheckboxButton';
import SmallCheckboxButton from './Components/SmallCheckboxButton';

function Themes() {

  return (
    <>
      <div className="rf-grid-row rf-grid-row--gutters rf-grid-row--middle rf-mb-7w">
        <div className="rf-col-xs-11 rf-col-sm-11 rf-col-md-2 questionCheckboxResponsive">
          <span className="question">Quelle a / ont été la / les thématique(s) de l&rsquo;accompagnement&nbsp;? (choix multiple)</span>
        </div>
        <div className="responsiveCheckbox1">
          <BigCheckboxButton
            type="themes"
            label="Prendre en main un équipement informatique (ordinateur, smartphone, tablette, etc.)"
            value="equipement informatique"
            image="/logos/cra/logo-equip-info.svg"
            imageSelected="/logos/cra/logo-equip-info-n.svg"
            heightImage="56px" />
        </div>
        <div className="responsiveCheckbox2">
          <BigCheckboxButton
            type="themes"
            label="Naviguer sur Internet"
            value="internet"
            image="/logos/cra/logo-naviguer-internet.svg"
            imageSelected="/logos/cra/logo-naviguer-internet-n.svg"
            heightImage="56px" />
        </div>
        <div className="responsiveCheckboxNewRow1">
          <BigCheckboxButton
            type="themes"
            label="Envoyer, recevoir, gérer ses courriels"
            value="courriel"
            image="/logos/cra/logo-courriel.svg"
            imageSelected="/logos/cra/logo-courriel-n.svg"
            heightImage="56px" />
        </div>
        <div className="responsiveCheckboxNewRow2">
          <BigCheckboxButton
            type="themes"
            label="Installer et utiliser des applications utiles sur son smartphone"
            value="smartphone"
            image="/logos/cra/logo-telephone-portable.svg"
            imageSelected="/logos/cra/logo-telephone-portable-n.svg"
            heightImage="56px" />
        </div>
        <div className="responsiveCheckboxNewRow1">
          <BigCheckboxButton
            type="themes"
            label="Créer et gérer (stocker, ranger, partager) ses contenus numériques"
            value="contenus numeriques"
            image="/logos/cra/logo-contenus-numeriques.svg"
            imageSelected="/logos/cra/logo-contenus-numeriques-n.svg"
            heightImage="56px" />
        </div>
        <div className="responsiveCheckboxNewRow2">
          <BigCheckboxButton
            type="themes"
            label="Connaître l&rsquo;environnement et le vocabulaire numérique"
            value="vocabulaire"
            image="/logos/cra/logo-vocabulaire-info.svg"
            imageSelected="/logos/cra/logo-vocabulaire-info-n.svg"
            heightImage="56px" />
        </div>
        <div className="responsiveCheckboxNewRow1">
          <BigCheckboxButton
            type="themes"
            label="Apprendre les bases du traitement de texte"
            value="traitement texte"
            image="/logos/cra/logo-traitement-texte.svg"
            imageSelected="/logos/cra/logo-traitement-texte-n.svg"
            heightImage="56px" />
        </div>
        <div className="responsiveCheckboxNewRow2">
          <BigCheckboxButton
            type="themes"
            label="Echanger avec ses proches"
            value="echanger"
            image="/logos/cra/logo-echanger-proches.svg"
            imageSelected="/logos/cra/logo-echanger-proches-n.svg"
            heightImage="56px" />
        </div>
        <div className="responsiveCheckboxNewRow1">
          <BigCheckboxButton
            type="themes"
            label="Trouver un emploi ou une formation"
            value="trouver emploi"
            image="/logos/cra/logo-trouver-emploi.svg"
            imageSelected="/logos/cra/logo-trouver-emploi-n.svg"
            heightImage="56px" />
        </div>
        <div className="responsiveCheckboxNewRow2">
          <BigCheckboxButton
            type="themes"
            label="Accompagner son enfant"
            value="accompagner enfant"
            image="/logos/cra/logo-accompagner-enfant.svg"
            imageSelected="/logos/cra/logo-accompagner-enfant-n.svg"
            heightImage="56px" />
        </div>
        <div className="responsiveCheckboxNewRow1">
          <BigCheckboxButton
            type="themes"
            label="Comprendre ce que le numérique peut apporter à sa TPE/PME"
            value="tpe/pme"
            image="/logos/cra/logo-tpe-pme.svg"
            imageSelected="/logos/cra/logo-tpe-pme-n.svg"
            heightImage="56px" />
        </div>
        <div className="responsiveCheckboxNewRow2">
          <BigCheckboxButton
            type="themes"
            label="Réaliser une démarche en ligne"
            value="demarche en ligne"
            image="/logos/cra/logo-demarche-en-ligne.svg"
            imageSelected="/logos/cra/logo-demarche-en-ligne-n.svg"
            heightImage="56px" />
        </div>
        <div className="responsiveSmallCheckbox">
          <SmallCheckboxButton
            type="themes"
            label="Autre..."
            value="autre" />
        </div>
      </div>
    </>
  );
}

export default Themes;
