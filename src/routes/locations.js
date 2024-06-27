const express = require('express');
const router = express.Router();
const Place = require('../models/Place');

// GET all locations
router.get('/locations', async (req, res) => {
  try {
    // Assuming location is stored in the database and fetched distinct
    const locations = await Place.distinct('location');
    res.json(locations.map(loc => ({ id: loc.toLowerCase(), name: loc })));
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET places by location
router.get('/places', async (req, res) => {
  const { location } = req.query;
  try {
    const places = await Place.find(location ? { location } : {});
    res.json(places);
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
