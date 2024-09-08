const { createVendedor, getAllVendedores } = require('./vendedor.service');
const { verifyToken } = require('../auth/jwt/jwtVerify'); // Importamos el middleware de JWT

const createVendedorController = async (req, res) => {
  const adminId = req.user.id; // El ID del administrador viene del token JWT

  const vendedorData = {
    username: req.body.username,
    password: req.body.password,
    nombre: req.body.nombre,
    correo: req.body.correo,
    telefono: req.body.telefono
  };

  // Llamamos al servicio para crear un vendedor
  const response = await createVendedor(vendedorData, adminId);

  // Devolvemos la respuesta al cliente
  return res.json(response);
};


const getVendedoresController = async (req, res) => {
    const response = await getAllVendedores();
    return res.json(response);
  };

module.exports = { createVendedorController , getVendedoresController};
