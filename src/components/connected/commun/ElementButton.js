import React from 'react';
import PropTypes from 'prop-types';

function ElementButton({ titre, onClick, classButton, pathname }) {

  return (
    <button
      className={`${classButton} ${location.pathname === pathname ? 'menu-btn-active' : ''}`}
      onClick={onClick}>
      {titre}
    </button>
  );
}

ElementButton.propTypes = {
  titre: PropTypes.string,
  onClick: PropTypes.func,
  classButton: PropTypes.string,
  pathname: PropTypes.string
};

export default ElementButton;
