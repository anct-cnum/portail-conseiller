import React from 'react';
import PropTypes from 'prop-types';
import correspondancesSousThemes from '../../../data/sousThemes.json';

function SousTheme({ sousTheme }) {
  let annotations = [];
  const theme = Object.keys(sousTheme)[0];
  sousTheme[theme]?.forEach(element => {
    const index = correspondancesSousThemes.find(corres => corres.theme === theme)?.values?.indexOf(element);
    if (index > -1) {
      annotations.push(correspondancesSousThemes.find(corres => corres.theme === theme)?.labels[index]);
    } else {
      annotations.push(element);
    }
  });

  return (
    <span>
      {annotations.join(', ')}
    </span>
  );
}

SousTheme.propTypes = {
  sousTheme: PropTypes.object,
};

export default SousTheme;
