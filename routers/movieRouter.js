const express = require('express');
const movieController = require('../controllers/movieController.js');

const router = express.Router();

router.get('/list', movieController.getMoviesList);
router.get('/:id', movieController.getMovie);
router.post('/', movieController.addMovie);

module.exports = router;