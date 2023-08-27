const express = require('express');
const postController = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');
const validationMiddleware = require('../middlewares/validatePost');

const router = express.Router();

router.post('/', authMiddleware, validationMiddleware, postController.createPost);
router.get('/', authMiddleware, postController.getAllPosts);
router.get('/:id', authMiddleware, postController.getPostById);

module.exports = router;
