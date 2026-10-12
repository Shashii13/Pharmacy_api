const express = require('express');
const { connect } = require('../db');
const { distanceKm } = require('../utils/distance');

const router = express.Router();

router.get('/nearby', async (req, res) => {
  try {
    const lat = parseFloat(req.query.lat);
    const lng = parseFloat(req.query.lng);
    const radiusKm = parseFloat(req.query.radiusKm) || 5;

    if (isNaN(lat) || isNaN(lng)) {
      return res.status(400).json({ error: 'lat and lng are required' });
    }

    const db = await connect();
    const stores = await db.collection('stores').find({
      location: {
        $geoWithin: {
          $centerSphere: [[lng,lat], radiusKm / 6378.1]
        }
      }
    }).toArray();

    const storesWithDistance = stores.map(store => {
      const storeLng = store.location.coordinates[0];
      const storeLat = store.location.coordinates[1];

      return {
        ...store,
        distanceKm: distanceKm(storeLng, storeLat, lng, lat)
      };
    });

    storesWithDistance.sort((a, b) => a.distanceKm - b.distanceKm);

    res.json(storesWithDistance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
