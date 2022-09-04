const express = require('express');
const movieController = require('../controllers/movieController.js');

const router = express.Router();

router.get('/list', movieController.getMoviesList);
router.get('/:_id', movieController.getMovie);
router.post('/', movieController.addMovie);

module.exports = router;