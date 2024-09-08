const express = require('express');
const { createCotizacionController, deleteCotizacionController, getAllCotizacionesController, getCotizacionByIdController } = require('./cotizacion.controller');
const { verifyToken } = require('../auth/jwt/jwtVerify'); // Middleware para verificar el token

const router = express.Router();

// Ruta para crear una cotización
router.post('/crear', verifyToken, createCotizacionController);

// Ruta para eliminar una cotización
router.delete('/eliminar/:id', verifyToken, deleteCotizacionController);

// Ruta para listar todas las cotizaciones
router.get('/listar', verifyToken, getAllCotizacionesController);

// Ruta para listar una cotización por ID
router.get('/listar/:id', verifyToken, getCotizacionByIdController);

module.exports = router;
