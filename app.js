const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./src/modules/auth/auth.routes');
const vendedorRoutes = require('./src/modules/vendedor/vendedor.routes'); 
const productoRoutes = require('./src/modules/producto/producto.routes');
const clienteRoutes = require('./src/modules/cliente/cliente.routes');
const cotizacionRoutes = require('./src/modules/cotizacion/cotizacion.routes'); 
dotenv.config(); // Cargamos las variables de entorno

const app = express();

app.use(cors());
app.use(express.json());

// Rutas de autenticación
app.use('/api/auth', authRoutes);

app.use('/api/producto', productoRoutes);
app.use('/api/vendedor', vendedorRoutes);
app.use('/api/cliente', clienteRoutes);
app.use('/api/cotizacion', cotizacionRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
