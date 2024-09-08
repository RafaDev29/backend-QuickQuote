const pool = require('../../config/db'); // Conexión a la base de datos
const createCotizacion = async (cotizacionData, vendedorId) => {
    try {
      const { idCliente, direccion, moneda, condicionPago, fechaEmision, fechaVencimiento, productos } = cotizacionData;
  
      // Insertar en la tabla tb_cotizacion
      const [cotizacionResult] = await pool.query(
        'INSERT INTO tb_cotizacion (ID_Cliente, Direccion, Moneda, Condicion_Pago, Fecha_Emision, Fecha_Vencimiento, ID_Vendedor, Estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [idCliente, direccion, moneda, condicionPago, fechaEmision, fechaVencimiento, vendedorId, 'creada']
      );
  
      const cotizacionId = cotizacionResult.insertId;
    
  
      // Insertar productos en la tabla tb_detalle_cotizacion
      for (const producto of productos) {
        const { idProducto, cantidad } = producto;
  
        // Obtener el precio unitario del producto desde la base de datos
        const [productoData] = await pool.query('SELECT Precio_Unitario FROM tb_producto WHERE ID_Producto = ?', [idProducto]);
  
        if (productoData.length === 0) {
          return {
            status: false,
            message: `Producto con ID ${idProducto} no encontrado`,
            data: null
          };
        }
  
        const precioUnitario = productoData[0].Precio_Unitario;
  
        // Calcular el subtotal (precio unitario * cantidad)
        const subtotal = precioUnitario * cantidad;
  
        await pool.query(
          'INSERT INTO tb_detalle_cotizacion (ID_Cotizacion, ID_Producto, Cantidad, Subtotal) VALUES (?, ?, ?, ?)',
          [cotizacionId, idProducto, cantidad, subtotal]
        );
      }
  
      return {
        status: true,
        message: 'Cotización creada exitosamente',
        data: {
          idCotizacion: cotizacionId
        }
      };
    } catch (error) {
      console.error('Error en el servidor:', error.message);
      return {
        status: false,
        message: 'Error en el servidor al crear la cotización',
        data: error.message
      };
    }
  };
  
  

// Función para eliminar una cotización por ID
const deleteCotizacion = async (idCotizacion) => {
    try {

  
      const [detalleResult] = await pool.query('DELETE FROM tb_detalle_cotizacion WHERE ID_Cotizacion = ?', [idCotizacion]);
      

  
      const [cotizacionResult] = await pool.query('DELETE FROM tb_cotizacion WHERE ID_Cotizacion = ?', [idCotizacion]);
      

      if (cotizacionResult.affectedRows === 0) {
        return {
          status: false,
          message: 'Cotización no encontrada',
          data: null
        };
      }
  
      return {
        status: true,
        message: 'Cotización y detalles eliminados correctamente',
        data: null
      };
    } catch (error) {
      // Log del error para capturar el mensaje
      console.error('Error al eliminar la cotización:', error.message);
  
      return {
        status: false,
        message: 'Error en el servidor al eliminar la cotización',
        data: error.message // Añadimos el mensaje del error para mayor detalle
      };
    }
  };
  

// Función para listar todas las cotizaciones junto con los datos del cliente
const getAllCotizaciones = async () => {
  try {
    // Consulta SQL que combina tb_cotizacion y tb_cliente usando JOIN
    const [cotizaciones] = await pool.query(`
      SELECT 
        c.ID_Cotizacion,
        c.ID_Cliente,
        cl.Nombre AS Cliente_Nombre,
        cl.Correo_Electronico AS Cliente_Correo,
        cl.Telefono AS Cliente_Telefono,
        c.Direccion,
        c.Moneda,
        c.Condicion_Pago,
        c.Fecha_Emision,
        c.Fecha_Vencimiento,
        c.ID_Vendedor,
        c.ID_Administrador,
        c.Estado,
        c.Total
      FROM tb_cotizacion c
      JOIN tb_cliente cl ON c.ID_Cliente = cl.ID_Cliente
    `);

    return {
      status: true,
      message: 'Lista de cotizaciones obtenida correctamente',
      data: cotizaciones
    };
  } catch (error) {
    console.error('Error al obtener las cotizaciones:', error.message);
    return {
      status: false,
      message: 'Error al obtener las cotizaciones',
      data: error.message
    };
  }
};


    // cotizacion.service.js
const getCotizacionById = async (idCotizacion) => {
    try {
      const [cotizacion] = await pool.query('SELECT * FROM tb_cotizacion WHERE ID_Cotizacion = ?', [idCotizacion]);
  
      if (cotizacion.length === 0) {
        return {
          status: false,
          message: 'Cotización no encontrada',
          data: null
        };
      }
  
      const [productos] = await pool.query('SELECT * FROM tb_detalle_cotizacion WHERE ID_Cotizacion = ?', [idCotizacion]);
  
      return {
        status: true,
        message: 'Cotización obtenida correctamente',
        data: {
          cotizacion: cotizacion[0],
          productos
        }
      };
    } catch (error) {
      return {
        status: false,
        message: 'Error al obtener la cotización',
        data: null
      };
    }
  };

  // Función para aprobar una cotización
const aprobarCotizacion = async (idCotizacion) => {
    try {
      // Actualizamos el estado de la cotización a 'aprobada'
      const [result] = await pool.query('UPDATE tb_cotizacion SET Estado = ? WHERE ID_Cotizacion = ?', ['aprobada', idCotizacion]);
  
      // Si no se afectaron filas, significa que no se encontró la cotización
      if (result.affectedRows === 0) {
        return {
          status: false,
          message: 'Cotización no encontrada',
          data: null
        };
      }
  
      return {
        status: true,
        message: 'Cotización aprobada correctamente',
        data: null
      };
    } catch (error) {
      console.error('Error al aprobar la cotización:', error.message);
      return {
        status: false,
        message: 'Error en el servidor al aprobar la cotización',
        data: error.message
      };
    }
  };
  
  // Asegúrate de exportar la función
  module.exports = { getCotizacionById, createCotizacion, deleteCotizacion, getAllCotizaciones, aprobarCotizacion };
  
