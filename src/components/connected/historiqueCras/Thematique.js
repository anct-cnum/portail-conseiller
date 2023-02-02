import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import labelsCorrespondance from '../../../data/labelsCorrespondance.json';

function Thematique({ texte }) {

  const image = labelsCorrespondance.find(label => label.nom === texte)?.image;
  const alt = labelsCorrespondance.find(label => label.nom === texte)?.correspondance;

  return (
    <>
      <img src={image} alt={alt} data-tip={alt} className="logo"/>
      <ReactTooltip html={true} className="infobulle" arrowColor="white"/>
    </>
  );
}

Thematique.propTypes = {
  texte: PropTypes.string,
};

export default Thematique;
