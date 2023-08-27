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

const createUser = async ({ displayName, email, password, image }) => {
    if (displayName.length < 8) {
        throw new Error('"displayName" length must be at least 8 characters long');
    }

    if (!/^[\w.-]+@\w+\.\w+$/.test(email)) {
        throw new Error('"email" must be a valid email');
    }

    if (password.length < 6) {
        throw new Error('"password" length must be at least 6 characters long');
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error('User already registered');
    }

    const newUser = await User.create({ displayName, email, password, image });

    const { password: _password, ...userWithoutPassword } = newUser.dataValues;

    const payload = { data: userWithoutPassword };
    const token = generateToken(payload);

    return { token };
};

const getAllUsers = async () => {
    const users = await User.findAll({
        attributes: ['id', 'displayName', 'email', 'image'],
    });
    return users;
};

const getUserById = async (id) => {
    const user = await User.findOne({
        where: { id },
        attributes: ['id', 'displayName', 'email', 'image'],
    });

    return user;
};

const deleteUserById = async (id) => {
    const user = await User.findOne({ where: { id } });

    if (!user) {
        throw new Error('User does not exist');
    }

    await User.destroy({ where: { id } });
};

module.exports = {
    login,
    createUser,
    getAllUsers,
    getUserById,
    deleteUserById,
};
