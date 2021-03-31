import React from 'react';
import PropTypes from 'prop-types';

function ElementButton({ titre, onClick, classButton }) {

  return (
    <button className={classButton} onClick={onClick}>{titre}</button>
  );
}

ElementButton.propTypes = {
  titre: PropTypes.string,
  onClick: PropTypes.func,
  classButton: PropTypes.string
};

export default ElementButton;
