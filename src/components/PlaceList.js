import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlacesList = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/places'); // Replace with your actual API endpoint
        setPlaces(response.data);
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <div className="p-4">
      <h2>All Places</h2>
      {places.length > 0 ? (
        <ul className="list-disc pl-5">
          {places.map((place) => (
            <li key={place.id}>
              ID: {place.id} - Name: {place.name} (Category: {place.category}) - Rating: {place.rating}
              {/* Add more place properties if available */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No places found.</p>
      )}
    </div>
  );
};

export default PlacesList;