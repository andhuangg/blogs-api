const express = require('express');
const loginRoutes = require('./loginRoutes');
const userRoutes = require('./userRoutes');
const categoryRoutes = require('./categoryRoutes');

const router = express.Router();

router.use('/user', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/login', loginRoutes);

module.exports = router;
