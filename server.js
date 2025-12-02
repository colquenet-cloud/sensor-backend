require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const pumpRoutes = require("./routes/pump.routes"); // ✅ MODO require

const app = express(); // ✅ PRIMERO app

app.use(cors());
app.use(express.json());

// ✅ RUTA BOMBA
app.use("/api", pumpRoutes);

// CONEXIÓN MONGODB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error(err));

// TUS RUTAS EXISTENTES
app.use('/api', require('./routes/auth'));
app.use('/api/sensors', require('./routes/sensors'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
