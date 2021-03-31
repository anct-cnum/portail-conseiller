import React from 'react';
import PropTypes from 'prop-types';

function ElementButton({ titre }) {

  return (
    <a className="rf-btn statistics-btn">{titre}</a>
  );
}

ElementButton.propTypes = {
  titre: PropTypes.string
};

export default ElementButton;
