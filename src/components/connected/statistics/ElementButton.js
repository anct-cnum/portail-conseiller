import React from 'react';
import PropTypes from 'prop-types';

function ElementButton(props) {

  return (
    <button className="rf-btn rf-btn--secondary" onClick={props.onClick}>{props.titre}</button>
  );
}

ElementButton.propTypes = {
  titre: PropTypes.string,
  onClick: PropTypes.func
};

export default ElementButton;
