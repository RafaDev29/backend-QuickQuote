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
      const [result] = await pool.query('DELETE FROM tb_cotizacion WHERE ID_Cotizacion = ?', [idCotizacion]);
  
      if (result.affectedRows === 0) {
        return {
          status: false,
          message: 'Cotización no encontrada',
          data: null
        };
      }
  
      return {
        status: true,
        message: 'Cotización eliminada correctamente',
        data: null
      };
    } catch (error) {
      return {
        status: false,
        message: 'Error en el servidor al eliminar la cotización',
        data: null
      };
    }
  };

  
  // Función para listar todas las cotizaciones
const getAllCotizaciones = async () => {
    try {
      const [cotizaciones] = await pool.query('SELECT * FROM tb_cotizacion');
      return {
        status: true,
        message: 'Lista de cotizaciones obtenida correctamente',
        data: cotizaciones
      };
    } catch (error) {
      return {
        status: false,
        message: 'Error al obtener las cotizaciones',
        data: null
      };
    }
  };
  

    
module.exports = { createCotizacion, deleteCotizacion,getAllCotizaciones  };
