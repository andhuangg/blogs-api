const { categoryService } = require('../services');

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        const newCategory = await categoryService.createCategory(name);

        return res.status(201).json(newCategory);
    } catch (error) {
        if (error.message === '"name" is required') {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    createCategory,
};
