const express = require('express');
const loginController = require('../controllers/loginController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/login', loginController.login);
router.post('/user', userController.createUser);

module.exports = router;
