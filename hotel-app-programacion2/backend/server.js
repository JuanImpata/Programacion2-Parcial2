const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/hoteles', require('./routes/hotelRoutes'));
app.use('/api/categorias', require('./routes/categoriaRoutes'));
app.use('/api/habitaciones', require('./routes/habitacionRoutes'));
app.use('/api/reservas', require('./routes/reservaRoutes'));
app.use('/api/reservantes', require('./routes/reservanteRoutes'));

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Hotel App API funcionando' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
