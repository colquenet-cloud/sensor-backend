const express = require("express");
const Pump = require("../models/pump.models");

const router = express.Router();

// ACTUALIZAR ESTADO BOMBA
router.post("/pump", async (req, res) => {
  const { state } = req.body;

  const pump = await Pump.findOneAndUpdate(
    {},
    { state, updatedAt: new Date() },
    { upsert: true, new: true }
  );

  res.json(pump);
});

// LEER ESTADO BOMBA
router.get("/pump", async (req, res) => {
  const pump = await Pump.findOne();
  res.json(pump || { state: false });
});

module.exports = router;
