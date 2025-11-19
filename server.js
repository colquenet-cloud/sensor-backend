require('dotenv').config(); // 1. Cargar variables de entorno

const express = require('express');    // 2. Importar librerías
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();                 // 3. Configurar Express
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)  // 4. Conectar a MongoDB
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error(err));

app.use('/api/sensors', require('./routes/sensors')); // 5. Rutas

const PORT = process.env.PORT || 5000; // 6. Iniciar servidor
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));