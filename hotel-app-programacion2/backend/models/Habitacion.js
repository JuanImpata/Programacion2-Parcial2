const db = require('../config/db');

const Habitacion = {
  findAll: () => db.query(`
    SELECT h.*, ht.nombre AS hotel_nombre
    FROM habitacion h
    JOIN hotel ht ON h.cod_hotel = ht.cod_hotel
  `),

  findById: (id) => db.query(
    'SELECT * FROM habitacion WHERE cod_habitacion = ?', [id]
  ),

  create: (tipo, cod_hotel) => db.query(
    'INSERT INTO habitacion (tipo, cod_hotel) VALUES (?,?)',
    [tipo, cod_hotel]
  ),

  update: (tipo, cod_hotel, id) => db.query(
    'UPDATE habitacion SET tipo=?, cod_hotel=? WHERE cod_habitacion=?',
    [tipo, cod_hotel, id]
  ),

  delete: (id) => db.query(
    'DELETE FROM habitacion WHERE cod_habitacion = ?', [id]
  )
};

module.exports = Habitacion;