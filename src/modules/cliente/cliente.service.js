const pool = require('../../config/db'); // Conexión a la base de datos

// Función para crear un nuevo cliente
const createCliente = async (clienteData) => {
  try {
    const { nombre, correo, telefono } = clienteData;

    // Insertar en tb_cliente
    const [clienteResult] = await pool.query(
      'INSERT INTO tb_cliente (Nombre, Correo_Electronico, Telefono) VALUES (?, ?, ?)',
      [nombre, correo, telefono]
    );

    return {
      status: true,
      message: 'Cliente creado exitosamente',
      data: {
        id: clienteResult.insertId,
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

const getAllClientes = async () => {
    try {
      const [clientes] = await pool.query('SELECT * FROM tb_cliente');
  
      return {
        status: true,
        message: 'Lista de clientes obtenida correctamente',
        data: clientes
      };
    } catch (error) {
      return {
        status: false,
        message: 'Error al obtener la lista de clientes',
        data: null
      };
    }
  };

  
// Función para obtener un cliente por ID
const getClienteById = async (idCliente) => {
    try {
      const [cliente] = await pool.query('SELECT * FROM tb_cliente WHERE ID_Cliente = ?', [idCliente]);
  
      if (cliente.length === 0) {
        return {
          status: false,
          message: 'Cliente no encontrado',
          data: null
        };
      }
  
      return {
        status: true,
        message: 'Cliente obtenido correctamente',
        data: cliente[0] // Devolvemos el primer resultado ya que se busca por ID
      };
    } catch (error) {
      return {
        status: false,
        message: 'Error al obtener el cliente',
        data: null
      };
    }
  };
  
  module.exports = { createCliente, getAllClientes, getClienteById };
  