const express = require('express');
const userController = require('../controllers/userController.js');
const Auth = require('../utils/authMiddle.js');

const router = express.Router();

router.post('/login', userController.postLogin);
router.post('/register', userController.postRegister);
router.get('/', userController.getUsers);
router.patch('/', Auth.checkAuth, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;