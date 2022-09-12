const express = require('express');
const categoryController = require('../controllers/categoryController.js');

const router = express.Router();

router.get('/list', categoryController.getAllCategories);
router.get('/', categoryController.getCategory);
router.post('/', categoryController.addCategory);

module.exports = router;
