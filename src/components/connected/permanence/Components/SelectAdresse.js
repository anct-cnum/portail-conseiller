import React from 'react';
import PropTypes from 'prop-types';
import { permanenceActions } from '../../../../actions';
import { useDispatch, useSelector } from 'react-redux';

function SelectAdresse({ prefixId }) {
  const dispatch = useDispatch();

  const geocodeAdresses = useSelector(state => state.permanence?.geocodeAdresses);
  const geocodeAdresse = geocodeAdresses?.filter(geocode => geocode.prefixId === prefixId)[0]?.geocodeAdresse;
  const loadingGeocode = useSelector(state => state.permanence?.loadingGeocode);

  const onChange = e => {
    const id = e.target.value;
    const adresse = geocodeAdresses[0]?.geocodeAdresse[id];
    dispatch(permanenceActions.updateField(prefixId + 'location', adresse?.geometry));
  };

  return (
    <>
      {(loadingGeocode && !geocodeAdresse) &&
        <div className="loading rf-mb-6w">
          En cours de g&eacute;olocalisation...
        </div>
      }
      {(!loadingGeocode && geocodeAdresse?.length > 0) &&
      <>
        <label className="rf-label rf-mb-1w">
          S&eacute;lectionnez la bonne adresse
        </label>
        <select id={prefixId + 'geolocalisation'} className="rf-input rf-mb-6w" onChange={e => {
          onChange(e);
        }}>
          {geocodeAdresse && geocodeAdresse?.map((adresse, idx) => {
            return (<option key={idx} value={idx} >{adresse.properties.label}</option>);
          })
          }
        </select>
      </>
      }
    </>
  );
}

SelectAdresse.propTypes = {
  prefixId: PropTypes.string,
};

export default SelectAdresse;
