import React from 'react';
import PropTypes from 'prop-types';

function ElementNumber(props) {

  let chaine = (props.caracteresSpeciaux) ? props.caracteresSpeciaux : '';
  return (
    <div>{props.nombre}{chaine}</div>
  );
}

ElementNumber.propTypes = {
  nombre: PropTypes.number,
  caracteresSpeciaux: PropTypes.string
};

export default ElementNumber;
