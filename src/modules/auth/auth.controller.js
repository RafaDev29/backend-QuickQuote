const { authenticateUser } = require('./auth.service');

const login = async (req, res) => {
  const { username, password } = req.body;

  // Llamamos al servicio para autenticar al usuario
  const response = await authenticateUser(username, password);

  // Devolvemos la respuesta que nos ha proporcionado el servicio
  return res.json(response);
};

module.exports = { login };
