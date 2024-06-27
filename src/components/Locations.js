import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Locations = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [places, setPlaces] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/locations');
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  const handleLocationChange = async (event) => {
    const location = event.target.value;
    setSelectedLocation(location);
  
    if (!location) {
      setPlaces([]); // Clear places if no location selected
      return;
    }
  
    try {
      const response = await axios.get(`http://localhost:8080/api/places?location=${location}`);
      const filteredPlaces = response.data.filter((place) => place.location === location);
      setPlaces(filteredPlaces);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Select Location</h2>
      <select
        className="block w-full p-2 border border-gray-300 rounded mb-4"
        value={selectedLocation}
        onChange={handleLocationChange}
      >
        <option value="">Select a location</option>
        <option value="Hyderabad">Hyderabad</option>
        <option value="Bengaluru">Bengaluru</option>
      </select>

      <div>
        <h3 className="text-xl font-semibold mb-2">Places:</h3>
        {places.length > 0 ? (
          <ul className="list-disc pl-5">
            {places.map((place) => (
              <li key={place.id}>
                {place.name} ({place.category}) - Rating: {place.rating}
              </li>
            ))}
          </ul>
        ) : (
          <p>No places found</p>
        )}
      </div>
    </div>
  );
};

export default Locations;
