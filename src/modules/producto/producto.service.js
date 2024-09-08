const pool = require('../../config/db'); // Conexión a la base de datos

// Función para crear un nuevo producto
const createProducto = async (productoData, adminId) => {
  try {
    const { nombre, descripcion, precio } = productoData;

    // Verificar si el usuario es administrador
    const [adminRows] = await pool.query('SELECT * FROM tb_usuario WHERE ID_Usuario = ? AND Rol = ?', [adminId, 'administrador']);
    
    if (adminRows.length === 0) {
      return {
        status: false,
        message: 'Acceso denegado: Solo los administradores pueden crear productos',
        data: null
      };
    }

    // Insertar en tb_producto
    await pool.query('INSERT INTO tb_producto (Nombre, Descripcion, Precio_Unitario) VALUES (?, ?, ?)', [nombre, descripcion, precio]);

    return {
      status: true,
      message: 'Producto creado exitosamente',
      data: {
        nombre,
        descripcion,
        precio
      }
    };
  } catch (error) {
    return {
      status: false,
      message: 'Error en el servidor',
      data: null
    };
  }
};


const getAllProductos = async () => {
    try {
      const [productos] = await pool.query('SELECT * FROM tb_producto');
      
      return {
        status: true,
        message: 'Lista de productos obtenida correctamente',
        data: productos
      };
    } catch (error) {
      return {
        status: false,
        message: 'Error al obtener la lista de productos',
        data: null
      };
    }
  };

  const getProductoById = async (idProducto) => {
    try {
      const [producto] = await pool.query('SELECT * FROM tb_producto WHERE ID_Producto = ?', [idProducto]);
  
      if (producto.length === 0) {
        return {
          status: false,
          message: 'Producto no encontrado',
          data: null
        };
      }
  
      return {
        status: true,
        message: 'Producto obtenido correctamente',
        data: producto[0] // Devolvemos el primer resultado ya que se busca por ID
      };
    } catch (error) {
      return {
        status: false,
        message: 'Error al obtener el producto',
        data: null
      };
    }
  };
  
module.exports = { createProducto, getAllProductos, getProductoById };
