const jwt = require('jsonwebtoken');

// Función para generar un token JWT
const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user.ID_Usuario,
      role: user.Rol,
      username: user.User
    },
    process.env.JWT_SECRET, // Asegúrate de tener esta variable en tu archivo .env
    { expiresIn: '24h' } // Duración del token
  );

  return token;
};

module.exports = { generateToken };
