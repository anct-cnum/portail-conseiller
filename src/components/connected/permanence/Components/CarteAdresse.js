import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import { Icon } from 'leaflet';

function CarteAdresse({ prefixId }) {

  const fields = useSelector(state => state.permanence?.fields);
  const location = fields?.filter(field => field.name === prefixId + 'location')[0]?.value;

  const [position, setPosition] = useState([1.849121, 46.624100]);
  const [zoom, setZoom] = useState(5);
  const [positionInitial, setPositionInitial] = useState(true);

  const marker = new Icon({ iconUrl: '/logos/permanences/pin.svg', iconSize: [25, 41] });

  useEffect(() => {
    if (location?.coordinates) {
      setPosition(location?.coordinates);
      setZoom(15);
      setPositionInitial(false);
    }
  }, [location]);

  return (
    <div className="map-container">
      <MapContainer id={prefixId} className="map" zoomControl={false} tap={false}
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
    </div>
  );
}

CarteAdresse.propTypes = {
  prefixId: PropTypes.string,
};

export default CarteAdresse;
