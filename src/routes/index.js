const express = require('express');
const loginController = require('../controllers/loginController');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', loginController.login);
router.post('/user', userController.createUser);
router.get('/user', authMiddleware, userController.getAllUsers);

module.exports = router;
