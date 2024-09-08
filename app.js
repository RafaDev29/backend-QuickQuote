const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./src/modules/auth/auth.routes');
const vendedorRoutes = require('./src/modules/vendedor/vendedor.routes'); // Importamos las rutas de vendedor

dotenv.config(); // Cargamos las variables de entorno

const app = express();

app.use(cors());
app.use(express.json());

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Rutas de vendedor
app.use('/api/vendedor', vendedorRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
