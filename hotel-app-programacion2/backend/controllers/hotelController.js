const Hotel = require('../models/Hotel');

const getAll = async (req, res) => {
  try {
    const [rows] = await Hotel.findAll();
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener hoteles' });
  }
};

const getOne = async (req, res) => {
  try {
    const [rows] = await Hotel.findById(req.params.id);
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Hotel no encontrado' });
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener hotel' });
  }
};

const create = async (req, res) => {
  try {
    const { nombre, direccion, telefono, anio_construccion, cod_categoria } = req.body;
    const [result] = await Hotel.create(nombre, direccion, telefono, anio_construccion, cod_categoria);
    res.status(201).json({ success: true, message: 'Hotel creado correctamente', id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al crear hotel' });
  }
};

const update = async (req, res) => {
  try {
    const { nombre, direccion, telefono, anio_construccion, cod_categoria } = req.body;
    await Hotel.update(nombre, direccion, telefono, anio_construccion, cod_categoria, req.params.id);
    res.json({ success: true, message: 'Hotel actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al actualizar hotel' });
  }
};

const remove = async (req, res) => {
  try {
    await Hotel.delete(req.params.id);
    res.json({ success: true, message: 'Hotel eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al eliminar hotel' });
  }
};

module.exports = { getAll, getOne, create, update, remove };