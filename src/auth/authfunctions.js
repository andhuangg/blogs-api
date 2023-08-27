const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'secretJWT';

const jwtConfig = { algorithm: 'HS256', expiresIn: '1d' };

const generateToken = (payload) => jwt.sign(payload, secret, jwtConfig);

const verifyPayload = (token) => jwt.verify(token, secret);

module.exports = { generateToken, verifyPayload };