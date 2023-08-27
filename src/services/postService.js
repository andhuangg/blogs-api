const { BlogPost, PostCategory } = require('../models');

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

module.exports = {
    createPost,
};
