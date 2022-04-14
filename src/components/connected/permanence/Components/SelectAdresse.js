import React from 'react';
import PropTypes from 'prop-types';
import { permanenceActions } from '../../../../actions';
import { useDispatch, useSelector } from 'react-redux';

function SelectAdresse({ prefixId, estStructure, errorInput }) {
  const dispatch = useDispatch();

  const geocodeAdresses = useSelector(state => state.permanence?.geocodeAdresses);
  const geocodeAdresse = geocodeAdresses?.filter(geocode => geocode.prefixId === prefixId)[0]?.geocodeAdresse;
  const loadingGeocode = useSelector(state => state.permanence?.loadingGeocode);

  const onChange = e => {
    const id = e.target.value;
    const adresse = geocodeAdresse[id];
    dispatch(permanenceActions.updateField(prefixId + 'location', adresse?.geometry ?? { type: 'Point', coordinates: [1.849121, 46.624100] }));
  };

  return (
    <>
      <label className={errorInput ? 'rf-label rf-mb-1w invalid' : 'rf-mb-1w rf-label'}>
        S&eacute;lectionnez l&rsquo;adresse du lieu d&rsquo;activi&eacute; &agrave; pr&eacute;visualiser <span className="obligatoire">&nbsp;*</span>
        <span className="baseline">Merci de remplir les champs d&rsquo;adresse (Num&eacute;ro de rue, Rue, Code Postal, Ville</span>
      </label>
      {(loadingGeocode) &&
        <div className="loading rf-mb-6w">
          Recherche de g&eacute;olocalisation en cours ...
        </div>
      }
      {(!loadingGeocode && geocodeAdresse?.length > 0) &&
        <select id={prefixId + 'geolocalisation'} className={errorInput ? 'rf-input rf-mb-6w input-error' : 'rf-input rf-mb-6w'} onChange={e => {
          onChange(e);
        }}>
          {(prefixId !== 'principal_' || !estStructure) &&
            <option>Choisir une adresse &agrave; pr&eacute;visualiser</option>
          }
          {geocodeAdresse && geocodeAdresse?.map((adresse, idx) => {
            return (<option key={idx} value={idx} >{adresse.properties.label}</option>);
          })
          }
        </select>
      }
      { (!loadingGeocode && (geocodeAdresse === undefined || geocodeAdresse?.length === 0)) &&
          <select className={errorInput ? 'rf-input rf-mb-6w input-error' : 'rf-input rf-mb-6w'} >
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
};

export default SelectAdresse;
