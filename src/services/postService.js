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

const updatePostById = async (id, userId, { title, content }) => {
    const post = await BlogPost.findByPk(id);

    if (post.userId !== userId) {
        throw new Error('Unauthorized');
    }

    await BlogPost.update(
        {
            title,
            content,
            updated: new Date(),
        },
        { where: { id } },
    );

    return getPostById(id);
};

const deletePostById = async (id, userId) => {
    const post = await BlogPost.findByPk(id);

    if (!post) {
        throw new Error('PostNotFound');
    }

    if (post.userId !== userId) {
        throw new Error('Unauthorized');
    }

    await PostCategory.destroy({ where: { postId: id } });
    await BlogPost.destroy({ where: { id } });
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePostById,
    deletePostById,
};
