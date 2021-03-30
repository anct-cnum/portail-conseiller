import React from 'react';
import PropTypes from 'prop-types';

function ElementButton(props) {

  return (
    <a className="rf-btn statistics-btn">{props.titre}</a>
  );
}

ElementButton.propTypes = {
  titre: PropTypes.string
};

export default ElementButton;
