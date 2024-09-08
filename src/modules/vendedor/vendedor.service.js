const pool = require('../../config/db'); // Conexión a la base de datos

// Función para crear un nuevo vendedor
const createVendedor = async (vendedorData, adminId) => {
  try {
    const { username, password, nombre, correo, telefono } = vendedorData;

    // Verificar si el usuario es administrador
    const [adminRows] = await pool.query('SELECT * FROM tb_usuario WHERE ID_Usuario = ? AND Rol = ?', [adminId, 'administrador']);
    
    if (adminRows.length === 0) {
      return {
        status: false,
        message: 'Acceso denegado: Solo los administradores pueden crear vendedores',
        data: null
      };
    }

    // Verificar si el usuario ya existe en la tabla tb_usuario
    const [existingUser] = await pool.query('SELECT * FROM tb_usuario WHERE User = ?', [username]);
    if (existingUser.length > 0) {
      return {
        status: false,
        message: 'El usuario ya existe',
        data: null
      };
    }

    // Insertar en tb_usuario
    const [userResult] = await pool.query('INSERT INTO tb_usuario (User, Contraseña, Rol) VALUES (?, ?, ?)', [username, password, 'vendedor']);

    // Insertar en tb_vendedor usando el ID del nuevo usuario
    const userId = userResult.insertId;
    await pool.query('INSERT INTO tb_vendedor (ID_Vendedor, Nombre, Correo_Electronico, Numero_Telefono) VALUES (?, ?, ?, ?)', [userId, nombre, correo, telefono]);

    return {
      status: true,
      message: 'Vendedor creado exitosamente',
      data: {
        id: userId,
        username,
        nombre,
        correo,
        telefono
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


const getAllVendedores = async () => {
  try {
    const [vendedores] = await pool.query('SELECT * FROM tb_vendedor');
    
    return {
      status: true,
      message: 'Lista de vendedores obtenida correctamente',
      data: vendedores
    };
  } catch (error) {
    return {
      status: false,
      message: 'Error al obtener la lista de vendedores',
      data: null
    };
  }
};

module.exports = { createVendedor , getAllVendedores};
