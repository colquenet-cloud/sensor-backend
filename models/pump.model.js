import mongoose from "mongoose";

const pumpSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "main",
    unique: true
  },
  state: {
    type: Boolean,
    default: false
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Pump", pumpSchema);
