const express = require('express');
const router = express.Router();
const Place = require('../models/Place');

// GET all places or by location
router.get('/places', async (req, res) => {
  const { location } = req.query;
  try {
    let places;
    if (location) {
      places = await Place.find({ location });
    } else {
      places = await Place.find();
    }
    res.json(places);
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;