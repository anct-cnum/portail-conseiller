import React from 'react';
import PropTypes from 'prop-types';
import correspondencesSousThemes from '../../../data/sousThemes.json';

function SousTheme({ sousTheme }) {
  let annotations = [];
  const theme = Object.keys(sousTheme)[0];

  sousTheme[theme].forEach(element => {
    const index = correspondencesSousThemes.find(corres => corres.theme === theme)?.value.indexOf(element);
    if (index > -1) {
      annotations.push(correspondencesSousThemes.find(corres => corres.theme === theme)?.label[index]);
    } else {
      annotations.push(element);
    }
  });

  return (
    <span>
      {annotations.toString().replace(',', ', ')}
    </span>
  );
}

SousTheme.propTypes = {
  sousTheme: PropTypes.object,
};

export default SousTheme;
