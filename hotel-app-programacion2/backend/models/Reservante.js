const db = require('../config/db');

const Reservante = {
  findAll: () => db.query('SELECT * FROM reservante'),

  findById: (id) => db.query(
    'SELECT * FROM reservante WHERE cod_reservante = ?', [id]
  ),

  create: (nombre, direccion, telefono, tipo, nombre_beneficiario) => db.query(
    'INSERT INTO reservante (nombre, direccion, telefono, tipo, nombre_beneficiario) VALUES (?,?,?,?,?)',
    [nombre, direccion, telefono, tipo, nombre_beneficiario || null]
  ),

  update: (nombre, direccion, telefono, tipo, nombre_beneficiario, id) => db.query(
    'UPDATE reservante SET nombre=?, direccion=?, telefono=?, tipo=?, nombre_beneficiario=? WHERE cod_reservante=?',
    [nombre, direccion, telefono, tipo, nombre_beneficiario || null, id]
  ),

  delete: (id) => db.query(
    'DELETE FROM reservante WHERE cod_reservante = ?', [id]
  )
};

module.exports = Reservante;