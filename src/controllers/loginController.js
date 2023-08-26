const { userService } = require('../services');

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Some required fields are missing' });
    }

    try {
        const { token } = await userService.login(email, password);
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports = {
    login,
};
