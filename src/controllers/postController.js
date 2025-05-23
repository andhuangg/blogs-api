const { postService } = require('../services');

const INTERNAL_SV_ERROR = { message: 'Internal server error' };

const createPost = async (req, res) => {
    try {
        const { title, content, categoryIds } = req.body;
        const { id: userId } = req.user;

        const newPost = await postService.createPost({ title, content, categoryIds, userId });

        return res.status(201).json(newPost);
    } catch (error) {
        return res.status(500).json({ message: INTERNAL_SV_ERROR });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({ message: INTERNAL_SV_ERROR });
    }
};

const getPostById = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await postService.getPostById(id);

        if (!post) {
            return res.status(404).json({ message: 'Post does not exist' });
        }

        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ message: INTERNAL_SV_ERROR });
    }
};

const updatePostById = async (req, res) => {
    try {
        const { id } = req.params;
        const { id: userId } = req.user;
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: 'Some required fields are missing' });
        }

        const updatedPost = await postService.updatePostById(id, userId, { title, content });

        return res.status(200).json(updatedPost);
    } catch (error) {
        if (error.message === 'Unauthorized') {
            return res.status(401).json({ message: 'Unauthorized user' });
        }
        return res.status(500).json({ message: INTERNAL_SV_ERROR });
    }
};

const deletePostById = async (req, res) => {
    try {
        const { id } = req.params;
        const { id: userId } = req.user;

        await postService.deletePostById(id, userId);

        return res.status(204).send();
    } catch (error) {
        if (error.message === 'Unauthorized') {
            return res.status(401).json({ message: 'Unauthorized user' });
        } if (error.message === 'PostNotFound') {
            return res.status(404).json({ message: 'Post does not exist' });
        }
        return res.status(500).json({ message: INTERNAL_SV_ERROR });
    }
};

const searchPosts = async (req, res) => {
    try {
        const { q } = req.query;

        const posts = await postService.searchPosts(q || '');

        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({ message: INTERNAL_SV_ERROR });
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePostById,
    deletePostById,
    searchPosts,
};
