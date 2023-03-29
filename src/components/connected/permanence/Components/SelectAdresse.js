import React from 'react';
import PropTypes from 'prop-types';
import { permanenceActions } from '../../../../actions';
import { useDispatch, useSelector } from 'react-redux';

function SelectAdresse({ prefixId, errorInput, isUpdate }) {
  const dispatch = useDispatch();

  const geocodeAdresses = useSelector(state => state.permanence?.geocodeAdresses);
  const geocodeAdresse = geocodeAdresses?.filter(geocode => geocode.prefixId === prefixId)[0]?.geocodeAdresse;
  const loadingGeocode = useSelector(state => state.permanence?.loadingGeocode);

  const onChange = e => {
    const id = e.target.value;
    const adresse = geocodeAdresse[id];
    dispatch(permanenceActions.updateField(prefixId + 'location', adresse?.geometry ??
    { type: 'Point', coordinates: process.env.REACT_APP_INIT_COORDONNEES.split(',') }));
  };

  return (
    <>
      <label className={errorInput ? 'fr-label fr-mb-1w invalid' : 'fr-mb-1w fr-label'}>
        S&eacute;lectionnez l&rsquo;adresse du lieu d&rsquo;activit&eacute; &agrave; pr&eacute;visualiser <span className="obligatoire">&nbsp;*</span>
        <span className="baseline">Merci de remplir les champs d&rsquo;adresse (Num&eacute;ro de rue, Rue, Code Postal, Ville</span>
      </label>
      {(loadingGeocode) &&
        <div className="loading fr-mb-6w">
          Recherche de g&eacute;olocalisation en cours ...
        </div>
      }
      {(!loadingGeocode && geocodeAdresse?.length > 0) &&
        <select id={prefixId + 'geolocalisation'} className={errorInput ? 'fr-input fr-mb-6w input-error' : 'fr-input fr-mb-6w'} onChange={e => {
          onChange(e);
        }}>
          {(prefixId !== 'principal_' && !isUpdate) &&
            <option>Choisir une adresse &agrave; pr&eacute;visualiser</option>
          }
          {geocodeAdresse && geocodeAdresse?.map((adresse, idx) => {
            return (<option key={idx} value={idx} >{adresse.properties.label}</option>);
          })
          }
        </select>
      }
      { (!loadingGeocode && (geocodeAdresse === undefined || geocodeAdresse?.length === 0)) &&
          <select className={errorInput ? 'fr-input fr-mb-6w input-error' : 'fr-input fr-mb-6w'} >
            <option>
              Cliquer sur le bouton V&eacute;rifier la localisation
            </option>
          </select>
      }
    </>
  );
}

SelectAdresse.propTypes = {
  prefixId: PropTypes.string,
  estStructure: PropTypes.bool,
  errorInput: PropTypes.string,
  isUpdate: PropTypes.bool,
};

export default SelectAdresse;
