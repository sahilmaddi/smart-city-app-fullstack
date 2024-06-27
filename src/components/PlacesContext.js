import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const PlacesContext = createContext({
  places: [],
  setPlaces: () => {},
  selectedPlace: null,
  setSelectedPlace: () => {},
});

const PlacesProvider = ({ children }) => {
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

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
    <PlacesContext.Provider
      value={{ places, setPlaces, selectedPlace, setSelectedPlace }}
    >
      {children}
    </PlacesContext.Provider>
  );
};

export { PlacesContext, PlacesProvider };