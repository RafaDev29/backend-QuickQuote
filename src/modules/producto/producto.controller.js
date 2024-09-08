const { createProducto , getAllProductos, getProductoById} = require('./producto.service');

const createProductoController = async (req, res) => {
  const adminId = req.user.id; // El ID del administrador viene del token JWT

  const productoData = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    precio: req.body.precio
  };

  // Llamamos al servicio para crear un producto
  const response = await createProducto(productoData, adminId);

  // Devolvemos la respuesta al cliente
  return res.json(response);
};

const getProductosController = async (req, res) => {
    const response = await getAllProductos();
    return res.json(response);
  };
  

  const getProductoByIdController = async (req, res) => {
    const idProducto = req.params.id; // Obtenemos el ID del producto desde los parámetros de la URL
    const response = await getProductoById(idProducto);
    return res.json(response);
  };
  
module.exports = { createProductoController , getProductosController, getProductoByIdController};
