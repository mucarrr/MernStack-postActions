const jwt = require('jsonwebtoken');
const AuthSchema = require('../models/AuthModel');

const authMiddleware = async (req, res, next) => {
    try {
        // Authorization header'dan token'ı al
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        // Bearer token'ı çıkar
        const token = authHeader.substring(7);

        // Token'ı doğrula
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Kullanıcıyı bul
        const user = await AuthSchema.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid token. User not found.' });
        }

        // Request'e user bilgisini ekle
        req.user = user;
        next();
        
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired.' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token.' });
        }
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = authMiddleware; 