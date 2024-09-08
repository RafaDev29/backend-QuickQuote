const express = require('express');
const { createCotizacionController, deleteCotizacionController, getAllCotizacionesController, getCotizacionByIdController
    ,aprobarCotizacionController
 } = require('./cotizacion.controller');
const { verifyToken } = require('../auth/jwt/jwtVerify'); // Middleware para verificar el token

const router = express.Router();

router.post('/crear', verifyToken, createCotizacionController);
router.delete('/eliminar/:id', verifyToken, deleteCotizacionController);
router.get('/listar', verifyToken, getAllCotizacionesController);
router.get('/listar/:id', verifyToken, getCotizacionByIdController);
router.put('/aprobar/:id', verifyToken, aprobarCotizacionController);

module.exports = router;
