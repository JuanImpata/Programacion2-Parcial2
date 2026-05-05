const express = require('express');
const router = express.Router();
const { getAll, getOne, create, update, remove } = require('../controllers/hotelController');
const verifyToken = require('../middleware/verifyToken');
const checkRole = require('../middleware/checkRole');

router.get('/', verifyToken, getAll);
router.get('/:id', verifyToken, getOne);
router.post('/', verifyToken, checkRole('admin'), create);
router.put('/:id', verifyToken, checkRole('admin'), update);
router.delete('/:id', verifyToken, checkRole('admin'), remove);

module.exports = router;
