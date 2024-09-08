const { createCotizacion, deleteCotizacion, getAllCotizaciones, getCotizacionById, aprobarCotizacion } = require('./cotizacion.service');

// Controlador para crear una cotización
const createCotizacionController = async (req, res) => {
  const vendedorId = req.user.id; // ID del vendedor desde el token
  const cotizacionData = {
    idCliente: req.body.idCliente,
    direccion: req.body.direccion,
    moneda: req.body.moneda,
    condicionPago: req.body.condicionPago,
    fechaEmision: req.body.fechaEmision,
    fechaVencimiento: req.body.fechaVencimiento,
    productos: req.body.productos // Array de productos
  };

  const response = await createCotizacion(cotizacionData, vendedorId);
  return res.json(response);
};

// Controlador para eliminar una cotización
const deleteCotizacionController = async (req, res) => {
  const idCotizacion = req.params.id;
  const response = await deleteCotizacion(idCotizacion);
  return res.json(response);
};

// Controlador para listar todas las cotizaciones
const getAllCotizacionesController = async (req, res) => {
  const response = await getAllCotizaciones();
  return res.json(response);
};

// Controlador para obtener una cotización por ID
const getCotizacionByIdController = async (req, res) => {
  const idCotizacion = req.params.id;
  const response = await getCotizacionById(idCotizacion);
  return res.json(response);
};

const aprobarCotizacionController = async (req, res) => {
    const idCotizacion = req.params.id; // ID de la cotización que se quiere aprobar
  
    const response = await aprobarCotizacion(idCotizacion);
    return res.json(response);
  };

module.exports = {
  createCotizacionController,
  deleteCotizacionController,
  getAllCotizacionesController,
  getCotizacionByIdController,
  aprobarCotizacionController
};
