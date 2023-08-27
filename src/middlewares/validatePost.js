const { Category } = require('../models');

const areFieldsMissing = ({ title, content, categoryIds }) =>
    !title || !content || !categoryIds || categoryIds.length === 0;

const areAllCategoriesPresent = async (categoryIds) => {
    const existingCategories = await Category.findAll({
        where: {
            id: categoryIds,
        },
    });
    return existingCategories.length === categoryIds.length;
};

const validatePost = async (req, res, next) => {
    const { title, content, categoryIds } = req.body;

    if (areFieldsMissing({ title, content, categoryIds })) {
        return res.status(400).json({ message: 'Some required fields are missing' });
    }

    if (!(await areAllCategoriesPresent(categoryIds))) {
        return res.status(400).json({ message: 'one or more "categoryIds" not found' });
    }

    next();
};

module.exports = validatePost;
