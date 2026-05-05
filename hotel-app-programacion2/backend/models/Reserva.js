const db = require('../config/db');

const Reserva = {
  findAll: () => db.query(`
    SELECT r.*, rs.nombre AS reservante_nombre, rs.tipo AS reservante_tipo,
           h.tipo AS habitacion_tipo, ht.nombre AS hotel_nombre
    FROM reserva r
    JOIN reservante rs ON r.cod_reservante = rs.cod_reservante
    JOIN habitacion h ON r.cod_habitacion = h.cod_habitacion
    JOIN hotel ht ON h.cod_hotel = ht.cod_hotel
  `),

  findById: (id) => db.query(
    'SELECT * FROM reserva WHERE cod_reserva = ?', [id]
  ),

  create: (precio, fecha_inicio, fecha_fin, cod_reservante, cod_habitacion) => db.query(
    'INSERT INTO reserva (precio, fecha_inicio, fecha_fin, cod_reservante, cod_habitacion) VALUES (?,?,?,?,?)',
    [precio, fecha_inicio, fecha_fin, cod_reservante, cod_habitacion]
  ),

  update: (precio, fecha_inicio, fecha_fin, cod_reservante, cod_habitacion, id) => db.query(
    'UPDATE reserva SET precio=?, fecha_inicio=?, fecha_fin=?, cod_reservante=?, cod_habitacion=? WHERE cod_reserva=?',
    [precio, fecha_inicio, fecha_fin, cod_reservante, cod_habitacion, id]
  ),

  delete: (id) => db.query(
    'DELETE FROM reserva WHERE cod_reserva = ?', [id]
  )
};

module.exports = Reserva;