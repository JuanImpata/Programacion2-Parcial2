const db = require('../config/db');

const Hotel = {
  findAll: () => db.query(`
    SELECT h.*, c.descripcion AS categoria_nombre
    FROM hotel h
    JOIN categoria c ON h.cod_categoria = c.cod_categoria
  `),

  findById: (id) => db.query(
    'SELECT * FROM hotel WHERE cod_hotel = ?', [id]
  ),

  create: (nombre, direccion, telefono, anio_construccion, cod_categoria) => db.query(
    'INSERT INTO hotel (nombre, direccion, telefono, anio_construccion, cod_categoria) VALUES (?,?,?,?,?)',
    [nombre, direccion, telefono, anio_construccion, cod_categoria]
  ),

  update: (nombre, direccion, telefono, anio_construccion, cod_categoria, id) => db.query(
    'UPDATE hotel SET nombre=?, direccion=?, telefono=?, anio_construccion=?, cod_categoria=? WHERE cod_hotel=?',
    [nombre, direccion, telefono, anio_construccion, cod_categoria, id]
  ),

  delete: (id) => db.query(
    'DELETE FROM hotel WHERE cod_hotel = ?', [id]
  )
};

module.exports = Hotel;