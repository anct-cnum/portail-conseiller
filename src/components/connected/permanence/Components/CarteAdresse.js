import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import { Icon } from 'leaflet';
import { permanenceActions } from '../../../../actions';
import 'leaflet/dist/leaflet.css';

function CarteAdresse({ prefixId }) {

  const dispatch = useDispatch();

  const geocodeAdresse = useSelector(state => state.permanence?.geocodeAdresse);
  const fields = useSelector(state => state.permanence?.fields);
  const rue = fields?.filter(field => field.name === prefixId + 'rueVoie')[0]?.value;
  const ville = fields?.filter(field => field.name === prefixId + 'ville')[0]?.value;

  const [position, setPosition] = useState([1.849121, 46.624100]);
  const [zoom, setZoom] = useState(5);
  const [positionInitial, setPositionInitial] = useState(true);
  const marker = new Icon({ iconUrl: '/logos/permanences/pin.svg', iconSize: [25, 41] });

  useEffect(() => {
    if (geocodeAdresse && rue && ville) {
      geocodeAdresse?.forEach(adresse => {
        if (adresse?.properties?.street?.toLowerCase().indexOf(rue?.toLowerCase()) !== -1 &&
            adresse?.properties?.city?.toLowerCase().indexOf(ville?.toLowerCase()) !== -1) {
          dispatch(permanenceActions.updateField(prefixId + 'location', adresse?.geometry));
          setPosition(adresse?.geometry?.coordinates);
          setZoom(15);
          setPositionInitial(false);
        }
      });
    }
  }, [geocodeAdresse]);

  return (
    <>
      <MapContainer className="map" zoomControl={false}
        key={JSON.stringify({ lat: position[1], lng: position[0] })}
        center={{ lat: position[1], lng: position[0] }} zoom={zoom}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ZoomControl position="bottomright" />
        {!positionInitial &&
          <Marker position={{ lat: position[1], lng: position[0] }} icon={marker}>
            <Popup>
              L&rsquo;adresse de votre lieu d&rsquo;activit&eacute;
            </Popup>
          </Marker>
        }
      </MapContainer>
    </>
  );
}

CarteAdresse.propTypes = {
  prefixId: PropTypes.string,
};

export default CarteAdresse;
