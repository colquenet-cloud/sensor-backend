const express = require('express');
const router = express.Router();
const Sensor = require('../models/Sensor');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const data = await Sensor.find().sort({ timestamp: -1 }).limit(1);
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener datos del sensor' });
  }
});

module.exports = router;