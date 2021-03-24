import React from 'react';
import PropTypes from 'prop-types';

function ElementButton(props) {

  return (
    <button className="rf-btn rf-btn--secondary">{props.titre}</button>
  );
}

ElementButton.propTypes = {
  titre: PropTypes.string
};

export default ElementButton;
