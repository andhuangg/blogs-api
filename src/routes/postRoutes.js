const express = require('express');
const postController = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');
const validationMiddleware = require('../middlewares/validatePost');

const router = express.Router();

router.post('/', authMiddleware, validationMiddleware, postController.createPost);
router.get('/', authMiddleware, postController.getAllPosts);
router.get('/search', authMiddleware, postController.searchPosts);
router.get('/:id', authMiddleware, postController.getPostById);
router.put('/:id', authMiddleware, postController.updatePostById);
router.delete('/:id', authMiddleware, postController.deletePostById);

module.exports = router;
