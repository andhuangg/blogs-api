const { BlogPost, PostCategory, User, Category } = require('../models');

const createPost = async ({ title, content, categoryIds, userId }) => {
    const newPost = await BlogPost.create(
        { title, content, userId, published: new Date(), updated: new Date() },
    );

    await Promise.all(
        categoryIds.map(async (categoryId) => {
            await PostCategory.create({ postId: newPost.id, categoryId });
        }),
    );

    return newPost;
};

const getAllPosts = async () => {
    const posts = await BlogPost.findAll({
        include: [
            { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },

            {
                model: Category,
                as: 'categories',
                attributes: ['id', 'name'],
                through: { attributes: [] },
            },
        ],
        attributes: ['id', 'title', 'content', 'user_id', 'published', 'updated'],
    });

    return posts;
};

const getPostById = async (id) => {
    const post = await BlogPost.findByPk(id, {
        include: [
            { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
            {
                model: Category,
                as: 'categories',
                attributes: ['id', 'name'],
                through: { attributes: [] },
            },
        ],
        attributes: ['id', 'title', 'content', 'userId', 'published', 'updated'],
    });

    return post;
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
};
