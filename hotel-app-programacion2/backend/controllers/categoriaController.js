const Categoria = require('../models/Categoria');

const getAll = async (req, res) => {
  try {
    const [rows] = await Categoria.findAll();
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener categorías' });
  }
};

const getOne = async (req, res) => {
  try {
    const [rows] = await Categoria.findById(req.params.id);
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener categoría' });
  }
};

const create = async (req, res) => {
  try {
    const { tipo_IVA, descripcion } = req.body;
    const [result] = await Categoria.create(tipo_IVA, descripcion);
    res.status(201).json({ success: true, message: 'Categoría creada correctamente', id: result.insertId });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al crear categoría' });
  }
};

const update = async (req, res) => {
  try {
    const { tipo_IVA, descripcion } = req.body;
    await Categoria.update(tipo_IVA, descripcion, req.params.id);
    res.json({ success: true, message: 'Categoría actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al actualizar categoría' });
  }
};

const remove = async (req, res) => {
  try {
    await Categoria.delete(req.params.id);
    res.json({ success: true, message: 'Categoría eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al eliminar categoría' });
  }
};

module.exports = { getAll, getOne, create, update, remove };