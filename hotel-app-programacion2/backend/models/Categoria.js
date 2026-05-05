const db = require('../config/db');

const Categoria = {
  findAll: () => db.query('SELECT * FROM categoria'),

  findById: (id) => db.query(
    'SELECT * FROM categoria WHERE cod_categoria = ?', [id]
  ),

  create: (tipo_IVA, descripcion) => db.query(
    'INSERT INTO categoria (tipo_IVA, descripcion) VALUES (?,?)',
    [tipo_IVA, descripcion]
  ),

  update: (tipo_IVA, descripcion, id) => db.query(
    'UPDATE categoria SET tipo_IVA=?, descripcion=? WHERE cod_categoria=?',
    [tipo_IVA, descripcion, id]
  ),

  delete: (id) => db.query(
    'DELETE FROM categoria WHERE cod_categoria = ?', [id]
  )
};

module.exports = Categoria;