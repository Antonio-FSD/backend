const express = require('express');
const genreController = require('../controllers/genreController');

const router = express.Router();

router.get('/list', genreController.getAllGenres);
router.get('/', genreController.getGenre);
router.post('/', genreController.addGenre);

module.exports = router;
