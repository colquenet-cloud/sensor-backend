const express = require('express');
const router = express.Router();
const Sensor = require('../models/Sensor');
const auth = require('../middleware/auth');

// -------------------------------------------
// GET: obtener el último registro del sensor
// (protegido con autenticación JWT)
// -------------------------------------------
router.get('/', auth, async (req, res) => {
  try {
    const data = await Sensor.find().sort({ timestamp: -1 }).limit(1);
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener datos del sensor' });
  }
});

// -------------------------------------------
// POST: ESP32 envía datos al backend
// (SIN autenticación)
// -------------------------------------------
router.post('/', async (req, res) => {
  try {
    const { temperature, humidity, estado, timestamp } = req.body;

    if (
      temperature === undefined ||
      humidity === undefined ||
      estado === undefined ||
      !timestamp
    ) {
      return res.status(400).json({ error: "Faltan campos en el JSON recibido" });
    }

    const newData = new Sensor({
      temperature,
      humidity,
      estado,
      timestamp
    });

    await newData.save();

    res.json({ message: "Datos guardados correctamente", data: newData });

  } catch (err) {
    console.error("Error al guardar datos:", err);
    res.status(500).json({ error: "Error al guardar datos del sensor" });
  }
});

module.exports = router;
