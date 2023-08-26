const { userService } = require('../services');

const createUser = async (req, res) => {
    try {
        const { displayName, email, password, image } = req.body;
        const { token } = await userService.createUser({ displayName, email, password, image });
        return res.status(201).json({ token });
    } catch (error) {
        const status = error.message === 'User already registered' ? 409 : 400;
        return res.status(status).json({ message: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;

    const user = await userService.getUserById(id);

    if (user) {
        return res.status(200).json(user);
    }

    return res.status(404).json({ message: 'User does not exist' });
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
};
