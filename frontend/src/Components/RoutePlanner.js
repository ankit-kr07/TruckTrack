import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 40.7128,
  lng: -74.0060 // Default center (NYC)
};

function RoutePlanner() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [directions, setDirections] = useState(null);

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        setDirections(response);
      } else {
        alert('Directions request failed due to ' + response.status);
      }
    }
  };

  return (
    <div>
      <h3>Route Planner</h3>
      <input
        type="text"
        placeholder="Enter start location"
        value={origin}
        onChange={e => setOrigin(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <input
        type="text"
        placeholder="Enter destination"
        value={destination}
        onChange={e => setDestination(e.target.value)}
      />
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          {origin && destination && (
            <DirectionsService
              options={{ origin, destination, travelMode: 'DRIVING' }}
              callback={directionsCallback}
            />
          )}

          {directions && (
            <DirectionsRenderer options={{ directions }} />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default RoutePlanner;
