const express = require('express');
const movieController = require('../controllers/movieController.js');

const router = express.Router();

router.get('/list', movieController.getMoviesList);
router.get('/list/:id',movieController.getMovieByGenre);
router.get('/search/:name', movieController.searchMovie);
router.get('/list/detail/:id', movieController.getMovie);
router.post('/', movieController.addMovie);

module.exports = router;