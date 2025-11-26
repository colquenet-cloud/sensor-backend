const express = require('express');
const router = express.Router();
const Sensor = require('../models/Sensor');
const auth = require('../middleware/auth');

// -------------------------------------------
// GET: obtenemos el último registro del sensor
// -------------------------------------------
router.get('/', auth, async (req, res) => {
  try {
    const data = await Sensor.find().sort({ timestamp: -1 }).limit(1);
    
    // Verificar si hay datos
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'No hay datos del sensor' });
    }
    
    res.json(data[0]);
  } catch (err) {
    console.error("Error en GET /sensors:", err);
    res.status(500).json({ error: 'Error al obtener datos del sensor' });
  }
});

// -------------------------------------------
// GET: obtenemos el historial de la colección
// 🚨 RUTA CORREGIDA: Acepta el parámetro :sensorId
// -------------------------------------------
router.get('/history/:sensorId', auth, async (req, res) => {
  try {
    // Para múltiples sensores, usaría: const sensorId = req.params.sensorId;
    // Pero como su consulta trae todo, mantenemos la consulta simple:
    const data = await Sensor.find().sort({ _id: -1 }); 
    
    // Devolver array vacío si no hay datos
    res.json(data || []);
  } catch (err) {
    console.error("Error al obtener historial:", err);
    res.status(500).json({ error: 'Error al obtener historial del sensor' });
  }
});


// POST: ESP32 envía datos al backend

router.post('/', async (req, res) => {
  try {
    const { temperature, humidity, estado } = req.body;

    // Una validación simple por si faltan campos
    if (
      temperature === undefined ||
      humidity === undefined ||
      estado === undefined
    ) {
      return res.status(400).json({ error: "Faltan campos en el JSON recibido" });
    }

    // Crear y guardar
    const newData = new Sensor({
      temperature,
      humidity,
      estado,
      timestamp: new Date() // se genera en directamente en mongodb
    });

    await newData.save();

    res.json({ message: "Datos guardados correctamente", data: newData });

  } catch (err) {
    console.error("Error al guardar datos:", err);
    res.status(500).json({ error: "Error al guardar datos del sensor" });
  }
});

module.exports = router;