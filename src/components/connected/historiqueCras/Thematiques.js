import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

function Thematiques({ texte }) {

  let image = '';
  let alt = '';

  switch (texte) {
    case 'equipement informatique':
      image = 'logo-equip-info.svg';
      alt = 'Prendre en main du mat&eacute;riel';
      break;
    case 'vocabulaire':
      image = 'logo-vocabulaire-info.svg';
      alt = 'Culture num&eacute;rique';
      break;
    case 'internet':
      image = 'logo-naviguer-internet.svg';
      alt = 'Naviguer sur Internet';
      break;
    case 'securite':
      image = 'logo-securite.svg';
      alt = 'Apprendre à s&eacute;curiser un &eacute;quipement';
      break;
    case 'courriel':
      image = 'logo-courriel.svg';
      alt = 'G&eacute;rer ses courriels';
      break;
    case 'echanger':
      image = 'logo-echanger-proches.svg';
      alt = '&Eacute;changer avec ses proches';
      break;
    case 'traitement texte':
      image = 'logo-traitement-texte.svg';
      alt = 'Apprendre les bases de la bureautique';
      break;
    case 'contenus numeriques':
      image = 'logo-contenus-numeriques.svg';
      alt = 'Cr&eacute;er, g&eacute;rer ses contenus num&eacute;riques';
      break;
    case 'trouver emploi':
      image = 'logo-trouver-emploi.svg';
      alt = 'Trouver un emploi ou une formation';
      break;
    case 'tpe/pme':
      image = 'logo-tpe-pme.svg';
      alt = 'Assister un professionnel';
      break;
    case 'accompagner enfant':
      image = 'logo-accompagner-enfant.svg';
      alt = 'Accompagner un aidant';
      break;
    case 'demarche en ligne':
      image = 'logo-demarche-en-ligne.svg';
      alt = 'R&eacute;aliser une d&eacute;marche en ligne';
      break;
    case 'fraude et harcelement':
      image = 'logo-fraude.svg';
      alt = 'Pr&eacute;venir les fraudes et/ou le harc&egrave;lement';
      break;
    case 'sante':
      image = 'logo-sante.svg';
      alt = 'Sant&eacute;';

      break;
    default:
      break;
  }
  return (
    <>
      <img src={`/logos/cra/${image}`} alt={alt} data-tip={alt} className="thematique"/>
      <ReactTooltip html={true} className="infobulle" arrowColor="white"/>
    </>
  );
}

Thematiques.propTypes = {
  texte: PropTypes.string,
};

export default Thematiques;
