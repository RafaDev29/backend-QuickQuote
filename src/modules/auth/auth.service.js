const pool = require('../../config/db'); // Conexión a la base de datos
const { generateToken } = require('./jwt/jwtGenerate'); // Generador de tokens

// Función para autenticar el usuario
const authenticateUser = async (username, password) => {
  try {
    // Consulta para obtener el usuario
    const [rows] = await pool.query('SELECT * FROM tb_usuario WHERE User = ? AND Contraseña = ?', [username, password]);

    if (rows.length === 0) {
      return {
        status: false,
        message: 'Usuario o contraseña incorrecta',
        data: null
      };
    }

    const user = rows[0];

    // Generamos el token utilizando los datos del usuario
    const token = generateToken(user);

    // Información extra dependiendo del rol del usuario
    let extraData = {};
    if (user.Rol === 'vendedor') {
      const [vendedorRows] = await pool.query('SELECT * FROM tb_vendedor WHERE ID_Vendedor = ?', [user.ID_Usuario]);
      if (vendedorRows.length > 0) {
        extraData = {
          nombre: vendedorRows[0].Nombre,
          correo: vendedorRows[0].Correo_Electronico,
          telefono: vendedorRows[0].Numero_Telefono
        };
      }
    } else if (user.Rol === 'administrador') {
      const [adminRows] = await pool.query('SELECT * FROM tb_administrador WHERE ID_Administrador = ?', [user.ID_Usuario]);
      if (adminRows.length > 0) {
        extraData = {
          nombre: adminRows[0].Nombre,
          correo: adminRows[0].Correo_Electronico,
          telefono: adminRows[0].Numero_Telefono
        };
      }
    }

    // Devolvemos la estructura que el controlador necesita
    return {
      status: true,
      message: 'Inicio de sesión exitoso',
      data: {
        token,
        user: {
          id: user.ID_Usuario,
          username: user.User,
          role: user.Rol,
          ...extraData // Incluye los datos adicionales del vendedor o administrador
        }
      }
    };
  } catch (error) {
    // Si ocurre algún error en la base de datos o cualquier otra operación
    return {
      status: false,
      message: 'Error en el servidor',
      data: null
    };
  }
};

module.exports = { authenticateUser };
