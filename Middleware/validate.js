const jwt = require('jsonwebtoken');
const User = require('../Models/user');

const validateToken = async (req, res, next) => {
    const allHeaders = req.headers;
    const token = allHeaders.authorization;

    if (!token) {
        return res.status(401).json({
            message: "You are not authorized to view a blog"
        })
    }

    const decodedToken = jwt.decode(token, { complete: true })
    
    if (!decodedToken) {
        return res.status(401).json({
            message: "You are not authorized to view a blog"
        })
    }

    const userEmailFromToken = decodedToken.payload.email;
    const foundUser = await User.findOne({ email: userEmailFromToken });
    
    if (!foundUser) {
        return res.status(401).json({
            message: "You are not authorized to view a blog"
        })
    }

    next();
}

module.exports = {
    validateToken
}