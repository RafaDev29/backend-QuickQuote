const express = require('express');
const { createClienteController, getAllClientesController, getClienteByIdController } = require('./cliente.controller');
const { verifyToken } = require('../auth/jwt/jwtVerify'); // Middleware para verificar el token

const router = express.Router();

router.post('/crear', verifyToken, createClienteController);

router.get('/listar', verifyToken, getAllClientesController);

router.get('/listar/:id', verifyToken, getClienteByIdController);

module.exports = router;
