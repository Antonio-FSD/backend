const express = require('express');
const userController = require('../controllers/userController.js');
const Auth = require('../utils/authmiddle.js');

const router = express.Router();

router.post('/login', userController.postLogin);
router.post('/register', userController.postRegister);
router.get('/', Auth.checkAuth, userController.getUsers);
router.patch('/', Auth.checkAuth , userController.updateUsers);

module.exports = router;