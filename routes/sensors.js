const express = require('express');
const router = express.Router();
const Sensor = require('../models/Sensor');
const auth = require('../middleware/auth');

// GET: último registro del sensor
router.get('/', auth, async (req, res) => {
  try {
    const data = await Sensor.find().sort({ timestamp: -1 }).limit(1);
    
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'No hay datos del sensor' });
    }
    
    res.json(data[0]);
  } catch (err) {
    console.log("Error en GET /sensors:", err);
    res.status(500).json({ error: 'Error al obtener datos del sensor' });
  }
});

// GET: historial completo (sin filtro)
router.get('/history', auth, async (req, res) => {
  try {
    const data = await Sensor.find().sort({ timestamp: -1 }); 
    res.json(data || []);
  } catch (err) {
    console.log("Error al obtener historial:", err);
    res.status(500).json({ error: 'Error al obtener historial del sensor' });
  }
});

// GET: historial por sensorId (para uso futuro)
router.get('/history/:sensorId', auth, async (req, res) => {
  try {
    const data = await Sensor.find().sort({ timestamp: -1 }); 
    res.json(data || []);
  } catch (err) {
    console.log("Error al obtener historial:", err);
    res.status(500).json({ error: 'Error al obtener historial del sensor' });
  }
});

// POST: ESP32 envía datos
router.post('/', async (req, res) => {
  try {
    const { temperature, humidity, estado } = req.body;

    if (
      temperature === undefined ||
      humidity === undefined ||
      estado === undefined
    ) {
      return res.status(400).json({ error: "Faltan campos en el JSON recibido" });
    }

    const newData = new Sensor({
      temperature,
      humidity,
      estado,
      timestamp: new Date()
    });

    await newData.save();

    res.json({ message: "Datos guardados correctamente", data: newData });

  } catch (err) {
    console.log("Error al guardar datos:", err);
    res.status(500).json({ error: "Error al guardar datos del sensor" });
  }
});

module.exports = router;