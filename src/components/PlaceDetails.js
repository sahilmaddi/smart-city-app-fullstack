// PlaceDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PlacesList from './PlaceList';

const PlaceDetails = () => {
  const { id } = useParams();
  const [place, setPlace] = useState({});
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8080/api/places/${id}`)
      .then((response) => {
        setPlace(response.data);
      })
      .catch((error) => {
        console.error('Error fetching place:', error);
      });

    axios.get(`http://localhost:8080/api/places/${id}/reviews`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
      });
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/api/places/${id}/reviews`, { comment: review });
      setReviews([...reviews, response.data]);
      setReview('');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2">{place.name}</h2>
      <p className="text-gray-700 mb-4">{place.description}</p>
      <p className="text-gray-600 mb-2"><strong>Category:</strong> {place.category}</p>
      <p className="text-gray-600 mb-4"><strong>Rating:</strong> {place.rating}</p>

      <h3 className="text-xl font-semibold mb-2">Reviews:</h3>
      <ul className="mb-4">
        {reviews.map((review) => (
          <li key={review.id} className="border-b border-gray-200 py-2">{review.comment}</li>
        ))}
      </ul>

      <form onSubmit={handleReviewSubmit} className="space-y-4">
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write a review"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit Review</button>
      </form>
      <PlacesList/>
    </div>
  );
};

export default PlaceDetails;
