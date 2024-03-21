import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tooltip';
import labelsCorrespondance from '../../../data/labelsCorrespondance.json';

function Thematique({ texte }) {

  const image = labelsCorrespondance.find(label => label.nom === texte)?.image;
  const alt = labelsCorrespondance.find(label => label.nom === texte)?.correspondance;

  return (
    <>
      <img src={image} alt={alt} data-tooltip-id={`infobulle-menu-${alt}`} data-tooltip-html={alt} className="logo"/>
      <Tooltip className="infobulle" id={`infobulle-menu-${alt}`} arrowColor="white"/>
    </>
  );
}

Thematique.propTypes = {
  texte: PropTypes.string,
};

export default Thematique;
