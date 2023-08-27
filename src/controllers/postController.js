const { postService } = require('../services');

const createPost = async (req, res) => {
    try {
        const { title, content, categoryIds } = req.body;
        const { id: userId } = req.user;

        const newPost = await postService.createPost({ title, content, categoryIds, userId });

        return res.status(201).json(newPost);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createPost,
    getAllPosts,
};
