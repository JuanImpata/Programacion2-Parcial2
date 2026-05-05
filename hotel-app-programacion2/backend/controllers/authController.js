const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const register = async (req, res) => {
  try {
    const { usuario, password, rol } = req.body;
    const hash = await bcrypt.hash(password, 10);
    await db.query(
      'INSERT INTO usuarios (usuario, password, rol) VALUES (?,?,?)',
      [usuario, hash, rol || 'usuario']
    );
    res.status(201).json({ success: true, message: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al registrar usuario' });
  }
};

const login = async (req, res) => {
  try {
    const { usuario, password } = req.body;
    const [rows] = await db.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Usuario no encontrado' });
    }
    const esValido = await bcrypt.compare(password, rows[0].password);
    if (!esValido) {
      return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
    }
    const token = jwt.sign(
      { id: rows[0].id, rol: rows[0].rol, usuario: rows[0].usuario },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    res.json({
      success: true,
      token,
      usuario: rows[0].usuario,
      rol: rows[0].rol,
      imagen: rows[0].imagen
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
};

module.exports = { register, login };
