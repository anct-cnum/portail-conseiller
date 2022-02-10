import React from 'react';
import { useSelector } from 'react-redux';
import BigCheckboxButton from './Components/BigCheckboxButton';

function Themes() {

  let cra = useSelector(state => state.cra);

  return (
    <>
      <div className="rf-grid-row rf-grid-row--gutters rf-grid-row--middle rf-mb-7w">
        <div className="rf-col-xs-11 rf-col-sm-11 rf-col-md-2 questionCheckboxResponsive">
          <span className={`question ${cra?.printError && cra?.errorsRequired?.themes ? 'questionRequired' : ''}`}>
            Quelle a / ont &eacute;t&eacute; la / les th&eacute;matique(s) de l&rsquo;accompagnement&nbsp;? (choix multiple)
          </span>
        </div>
        <div className="responsiveCheckbox1">
          <BigCheckboxButton
            type="themes"
            label="Prendre en main un &eacute;quipement"
            value="equipement informatique"
            image="/logos/cra/logo-equip-info.svg"
            imageSelected="/logos/cra/logo-equip-info-n.svg"
            heightImage="56px" />
        </div>

        <div className="responsiveCheckbox2">
          <BigCheckboxButton
            type="themes"
            label="Connaître le vocabulaire num&eacute;rique"
            value="vocabulaire"
            image="/logos/cra/logo-vocabulaire-info.svg"
            imageSelected="/logos/cra/logo-vocabulaire-info-n.svg"
            heightImage="56px" />
        </div>

        <div className="responsiveCheckboxNewRow1">
          <BigCheckboxButton
            type="themes"
            label="Naviguer sur Internet"
            value="internet"
            image="/logos/cra/logo-naviguer-internet.svg"
            imageSelected="/logos/cra/logo-naviguer-internet-n.svg"
            heightImage="56px" />
        </div>

        <div className="responsiveCheckboxNewRow2">
          <BigCheckboxButton
            type="themes"
            label="Apprendre à s&eacute;curiser un &eacute;quipement"
            value="securite"
            image="/logos/cra/logo-securite.svg"
            imageSelected="/logos/cra/logo-securite-n.svg"
            heightImage="56px" />
        </div>

        <div className="responsiveCheckboxNewRow1">
          <BigCheckboxButton
            type="themes"
            label="G&eacute;rer ses courriels"
            value="courriel"
            image="/logos/cra/logo-courriel.svg"
            imageSelected="/logos/cra/logo-courriel-n.svg"
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
            label="Apprendre les bases de la bureautique"
            value="traitement texte"
            image="/logos/cra/logo-traitement-texte.svg"
            imageSelected="/logos/cra/logo-traitement-texte-n.svg"
            heightImage="56px" />
        </div>

        <div className="responsiveCheckboxNewRow2">
          <BigCheckboxButton
            type="themes"
            label="Cr&eacute;er, g&eacute;rer ses contenus num&eacute;riques"
            value="contenus numeriques"
            image="/logos/cra/logo-contenus-numeriques.svg"
            imageSelected="/logos/cra/logo-contenus-numeriques-n.svg"
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
            label="Assister un professionnel"
            baseline="TPE, PME..."
            value="tpe/pme"
            image="/logos/cra/logo-tpe-pme.svg"
            imageSelected="/logos/cra/logo-tpe-pme-n.svg"
            heightImage="56px" />
        </div>

        <div className="responsiveCheckboxNewRow1">
          <BigCheckboxButton
            type="themes"
            label="Accompagner un aidant"
            baseline="parent, &eacute;ducateur, professeur..."
            value="accompagner enfant"
            image="/logos/cra/logo-accompagner-enfant.svg"
            imageSelected="/logos/cra/logo-accompagner-enfant-n.svg"
            heightImage="56px" />
        </div>

        <div className="responsiveCheckboxNewRow2">
          <BigCheckboxButton
            type="themes"
            label="R&eacute;aliser une d&eacute;marche en ligne"
            baseline="vers l&rsquo;autonomie"
            value="demarche en ligne"
            image="/logos/cra/logo-demarche-en-ligne.svg"
            imageSelected="/logos/cra/logo-demarche-en-ligne-n.svg"
            heightImage="56px" />
        </div>

        <div className="responsiveCheckboxNewRow1">
          <BigCheckboxButton
            type="themes"
            label="Pr&eacute;venir les fraudes et/ou le harc&egrave;lement"
            value="fraude et harcelement"
            image="/logos/cra/logo-accompagner-enfant.svg"
            imageSelected="/logos/cra/logo-accompagner-enfant-n.svg"
            heightImage="56px" />
        </div>

        <div className="responsiveCheckboxNewRow2">
          <BigCheckboxButton
            type="themes"
            label="Sant&eacute;"
            baseline="création de compte Ameli, etc."
            value="sante"
            image="/logos/cra/logo-sante.svg"
            imageSelected="/logos/cra/logo-sante-n.svg"
            heightImage="56px" />
        </div>
      </div>
    </>
  );
}

export default Themes;
