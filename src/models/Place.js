// models/Place.js

const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Number, required: true },
  location: { type: String, required: true }  // Add location field
});

module.exports = mongoose.model('Place', placeSchema);
