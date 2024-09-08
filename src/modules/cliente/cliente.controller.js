const { createCliente, getAllClientes, getClienteById } = require('./cliente.service');

// Controlador para crear un cliente
const createClienteController = async (req, res) => {
  const clienteData = {
    nombre: req.body.nombre,
    correo: req.body.correo,
    telefono: req.body.telefono
  };

  const response = await createCliente(clienteData);
  return res.json(response);
};

// Controlador para listar todos los clientes
const getAllClientesController = async (req, res) => {
  const response = await getAllClientes();
  return res.json(response);
};

// Controlador para obtener un cliente por ID
const getClienteByIdController = async (req, res) => {
  const idCliente = req.params.id;
  const response = await getClienteById(idCliente);
  return res.json(response);
};

module.exports = { createClienteController, getAllClientesController, getClienteByIdController };
