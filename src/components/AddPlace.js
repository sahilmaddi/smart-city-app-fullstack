import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { PlacesContext } from './PlacesContext'; // Import PlacesContext

const AddPlace = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0); // Assuming rating is a number

  const { places, setPlaces } = useContext(PlacesContext);

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
  }, []); // Empty dependency array to fetch places only on initial render

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/places', {
        name,
        location,
        category,
        rating,
      });
      console.log('Place created:', response.data);

      // Clear form fields
      setName('');
      setLocation('');
      setCategory('');
      setRating(0);

      // Optionally refetch all places after creation (consider performance)
      const updatedPlaces = await axios.get('http://localhost:8080/api/places');
      setPlaces(updatedPlaces.data);
    } catch (error) {
      console.error('Error creating place:', error);
    }
  };

  return (
    <div className="p-4">
      <h2>Add Place</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter place name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="Enter category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          min="0"
          max="5" // Assuming rating scale is 0-5
          placeholder="Enter rating (0-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Create Place
        </button>
      </form>

      <h2>All Places</h2>
      {places.length > 0 ? (
        <ul className="list-disc pl-5">
          {places.map((place) => (
            <li key={place.id}>
              ID: {place.id} - Name: {place.name} (Category: {place.category}) - Rating: {place.rating}
            </li>
          ))}
        </ul>
      ) : (
        <p>No places found.</p>
      )}
    </div>
  );
};

export default AddPlace;