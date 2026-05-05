const Habitacion = require('../models/Habitacion');

const getAll = async (req, res) => {
  try {
    const [rows] = await Habitacion.findAll();
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener habitaciones' });
  }
};

const getOne = async (req, res) => {
  try {
    const [rows] = await Habitacion.findById(req.params.id);
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Habitación no encontrada' });
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener habitación' });
  }
};

const create = async (req, res) => {
  try {
    const { tipo, cod_hotel } = req.body;
    const [result] = await Habitacion.create(tipo, cod_hotel);
    res.status(201).json({ success: true, message: 'Habitación creada correctamente', id: result.insertId });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al crear habitación' });
  }
};

const update = async (req, res) => {
  try {
    const { tipo, cod_hotel } = req.body;
    await Habitacion.update(tipo, cod_hotel, req.params.id);
    res.json({ success: true, message: 'Habitación actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al actualizar habitación' });
  }
};

const remove = async (req, res) => {
  try {
    await Habitacion.delete(req.params.id);
    res.json({ success: true, message: 'Habitación eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al eliminar habitación' });
  }
};

module.exports = { getAll, getOne, create, update, remove };