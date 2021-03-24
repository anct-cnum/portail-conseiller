import React from 'react';
import PropTypes from 'prop-types';

function ElementText(props) {

  return (
    <div>{props.texte}</div>
  );
}

ElementText.propTypes = {
  texte: PropTypes.string
};


export default ElementText;
