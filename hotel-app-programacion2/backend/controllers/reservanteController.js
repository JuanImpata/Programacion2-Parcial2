const Reservante = require('../models/Reservante');

const getAll = async (req, res) => {
  try {
    const [rows] = await Reservante.findAll();
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener reservantes' });
  }
};

const getOne = async (req, res) => {
  try {
    const [rows] = await Reservante.findById(req.params.id);
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Reservante no encontrado' });
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener reservante' });
  }
};

const create = async (req, res) => {
  try {
    const { nombre, direccion, telefono, tipo, nombre_beneficiario } = req.body;
    const [result] = await Reservante.create(nombre, direccion, telefono, tipo, nombre_beneficiario);
    res.status(201).json({ success: true, message: 'Reservante creado correctamente', id: result.insertId });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al crear reservante' });
  }
};

const update = async (req, res) => {
  try {
    const { nombre, direccion, telefono, tipo, nombre_beneficiario } = req.body;
    await Reservante.update(nombre, direccion, telefono, tipo, nombre_beneficiario, req.params.id);
    res.json({ success: true, message: 'Reservante actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al actualizar reservante' });
  }
};

const remove = async (req, res) => {
  try {
    await Reservante.delete(req.params.id);
    res.json({ success: true, message: 'Reservante eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al eliminar reservante' });
  }
};

module.exports = { getAll, getOne, create, update, remove };
