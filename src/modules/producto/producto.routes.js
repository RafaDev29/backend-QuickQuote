const express = require('express');
const { createProductoController, getProductosController, getProductoByIdController } = require('./producto.controller');
const { verifyToken } = require('../auth/jwt/jwtVerify'); // Middleware para verificar el token

const router = express.Router();

// Ruta para crear un producto, protegida por el middleware JWT
router.post('/crear', verifyToken, createProductoController);
router.get('/listar', verifyToken, getProductosController);
router.get('/listar/:id', verifyToken, getProductoByIdController); 

module.exports = router;
