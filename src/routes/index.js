const express = require('express');
const loginRoutes = require('./loginRoutes');
const userRoutes = require('./userRoutes');
const categoryRoutes = require('./categoryRoutes');
const postRoutes = require('./postRoutes');

const router = express.Router();

router.use('/user', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/login', loginRoutes);
router.use('/post', postRoutes);

module.exports = router;
