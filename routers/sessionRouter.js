const express = require('express');
const sessionController = require('../controllers/sessionController.js');

const router = express.Router();

router.get('/list', sessionController.getSessionsList);
router.get('/:id', sessionController.getSession);
router.post('/', sessionController.addSession);

module.exports = router;