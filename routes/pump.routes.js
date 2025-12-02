const express = require("express");
const router = express.Router();
const Pump = require("../models/pump.models");

// ✅ Obtener estado de la bomba
router.get("/pump", async (req, res) => {
  try {
    let pump = await Pump.findOne();

    // Si no existe, crear uno por defecto
    if (!pump) {
      pump = await Pump.create({
        name: "Bomba Principal",
        state: false,
        updatedAt: new Date()
      });
    }

    res.json({ state: pump.state });
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo estado" });
  }
});

// ✅ Cambiar estado manualmente
router.post("/pump", async (req, res) => {
  try {
    const { state } = req.body;

    let pump = await Pump.findOne();

    if (!pump) {
      pump = await Pump.create({
        name: "Bomba Principal",
        state: state,
        updatedAt: new Date()
      });
    } else {
      pump.state = state;
      pump.updatedAt = new Date();
      await pump.save();
    }

    res.json({ ok: true, state });
  } catch (error) {
    res.status(500).json({ error: "Error actualizando bomba" });
  }
});

module.exports = router;
