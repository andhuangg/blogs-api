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

module.exports = {
    createUser,
};
