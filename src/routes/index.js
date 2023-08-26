const express = require('express');
const loginController = require('../controllers/loginController');
const userController = require('../controllers/userController');
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', loginController.login);
router.post('/user', userController.createUser);
router.post('/categories', authMiddleware, categoryController.createCategory);

router.get('/user', authMiddleware, userController.getAllUsers);
router.get('/user/:id', authMiddleware, userController.getUserById);

module.exports = router;
