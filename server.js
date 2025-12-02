require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const pumpRoutes = require("./routes/pump.routes");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Rutas
app.use("/api", pumpRoutes);
app.use("/api", require("./routes/auth"));
app.use("/api/sensors", require("./routes/sensors"));

// ✅ MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error(err));

// ✅ Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
