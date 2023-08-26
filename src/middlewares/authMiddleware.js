const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

function extractToken(bearerToken) {
    return bearerToken.split(' ')[1];
}

const authMiddleware = (req, res, next) => {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
        return res.status(401).json({ message: 'Token not found' });
    }

    const token = extractToken(bearerToken);

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded.data;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Expired or invalid token' });
    }
};

module.exports = authMiddleware;
