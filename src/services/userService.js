const { User } = require('../models');
const { generateToken } = require('../auth/authfunctions');

const login = async (email, password) => {
    const user = await User.findOne({ where: { email } });

    if (!user || password !== user.password) {
        throw new Error('Invalid fields');
    }

    const { password: _password, ...userWithoutPassword } = user.dataValues;

    const payload = { data: userWithoutPassword };
    const token = generateToken(payload);

    return { token };
};

module.exports = {
    login,
};
