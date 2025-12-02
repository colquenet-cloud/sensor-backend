import express from "express";
import Pump from "../models/pump.model.js";

const router = express.Router();

// Cambiar estado de bomba
router.post("/pump", async (req, res) => {
  const { state } = req.body;

  if (typeof state !== "boolean") {
    return res.status(400).json({ error: "Estado inválido" });
  }

  try {
    const pump = await Pump.findOneAndUpdate(
      { name: "main" },
      { state, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    res.json(pump);
  } catch (error) {
    res.status(500).json({ error: "Error guardando estado" });
  }
});

// ESP32 consulta estado
router.get("/pump", async (req, res) => {
  try {
    const pump = await Pump.findOne({ name: "main" });
    res.json(pump || { state: false });
  } catch (error) {
    res.status(500).json({ error: "Error leyendo estado" });
  }
});

export default router;
