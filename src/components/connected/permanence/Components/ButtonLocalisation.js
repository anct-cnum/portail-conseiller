import React from 'react';
import PropTypes from 'prop-types';
import { permanenceActions } from '../../../../actions';
import { useDispatch, useSelector } from 'react-redux';

function ButtonLocalisation({ prefixId }) {
  const dispatch = useDispatch();

  const fields = useSelector(state => state.permanence?.fields);

  const onClick = () => {
    const adresse = {
      numero: fields?.filter(field => field.name === prefixId + 'numeroVoie')[0]?.value,
      rue: fields?.filter(field => field.name === prefixId + 'rueVoie')[0]?.value,
      codePostal: fields?.filter(field => field.name === prefixId + 'codePostal')[0]?.value,
      ville: fields?.filter(field => field.name === prefixId + 'ville')[0]?.value
    };
    dispatch(permanenceActions.getGeocodeAdresse(adresse, prefixId));
  };

  return (
    <button id={'localisation_' + prefixId} className="rf-btn localisation-btn rf-mb-6w" style={{ textAlign: 'right' }} onClick={() => {
      onClick();
    }}>
      Pr&eacute;visualiser la localisation
    </button>
  );
}

ButtonLocalisation.propTypes = {
  prefixId: PropTypes.string,
};

export default ButtonLocalisation;
