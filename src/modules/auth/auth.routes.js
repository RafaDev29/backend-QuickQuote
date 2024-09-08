const express = require('express');
const { login } = require('./auth.controller');
const router = express.Router();

// Ruta para iniciar sesión
router.post('/login', login);

module.exports = router;
