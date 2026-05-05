const Reserva = require('../models/Reserva');

const getAll = async (req, res) => {
  try {
    const [rows] = await Reserva.findAll();
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener reservas' });
  }
};

const getOne = async (req, res) => {
  try {
    const [rows] = await Reserva.findById(req.params.id);
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Reserva no encontrada' });
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener reserva' });
  }
};

const create = async (req, res) => {
  try {
    const { precio, fecha_inicio, fecha_fin, cod_reservante, cod_habitacion } = req.body;
    const [result] = await Reserva.create(precio, fecha_inicio, fecha_fin, cod_reservante, cod_habitacion);
    res.status(201).json({ success: true, message: 'Reserva creada correctamente', id: result.insertId });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al crear reserva' });
  }
};

const update = async (req, res) => {
  try {
    const { precio, fecha_inicio, fecha_fin, cod_reservante, cod_habitacion } = req.body;
    await Reserva.update(precio, fecha_inicio, fecha_fin, cod_reservante, cod_habitacion, req.params.id);
    res.json({ success: true, message: 'Reserva actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al actualizar reserva' });
  }
};

const remove = async (req, res) => {
  try {
    await Reserva.delete(req.params.id);
    res.json({ success: true, message: 'Reserva eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al eliminar reserva' });
  }
};

module.exports = { getAll, getOne, create, update, remove };
