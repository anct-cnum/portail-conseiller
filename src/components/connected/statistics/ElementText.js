import React from 'react';
import PropTypes from 'prop-types';

function ElementText(props) {

  return (
    <div className={props.classe}>{props.texte}</div>
  );
}

ElementText.propTypes = {
  texte: PropTypes.string,
  classe: PropTypes.string,
};


export default ElementText;
