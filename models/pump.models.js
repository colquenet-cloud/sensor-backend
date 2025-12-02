const mongoose = require("mongoose");

const pumpSchema = new mongoose.Schema({
  name: { type: String, default: "main" },
  state: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Pump", pumpSchema);
