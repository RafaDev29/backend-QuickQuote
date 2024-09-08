const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token requerido' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET); // Verificamos el token
    req.user = decoded; // Almacena los datos del token en req.user
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = { verifyToken };
