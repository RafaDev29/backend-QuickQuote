const express = require('express');
const { createVendedorController, getVendedoresController } = require('./vendedor.controller');
const { verifyToken } = require('../auth/jwt/jwtVerify'); // Middleware para verificar el token

const router = express.Router();

// Ruta para crear un vendedor, protegida por el middleware JWT
router.post('/crear', verifyToken, createVendedorController);
router.get('/listar', verifyToken, getVendedoresController);
module.exports = router;
