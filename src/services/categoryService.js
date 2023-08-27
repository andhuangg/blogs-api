const { Category } = require('../models');

const createCategory = async (name) => {
    if (!name) {
        throw new Error('"name" is required');
    }

    const newCategory = await Category.create({ name });

    return {
        id: newCategory.id,
        name: newCategory.name,
    };
};

const getAllCategories = async () => {
    const categories = await Category.findAll({
        attributes: ['id', 'name'],
    });
    return categories;
};

module.exports = {
    createCategory,
    getAllCategories,
};
