const jwt = require('jsonwebtoken');
const User = require('../models/userSchema')

const authenticate = async (req, res, next) => {
    try {
        console.log('Authentication attempt - cookies:', req.cookies);
        const token = req.cookies.jwtToken;
        
        if (!token) {
            console.log('No token found in cookies');
            return res.status(401).json({error: "No token provided"});
        }
        
        const verificationResult = await jwt.verify(token, process.env.SECRET_KEY);
        console.log('Token verified for user:', verificationResult._id);

        const rootUser = await User.findOne({_id: verificationResult._id, "tokens.token": token});

        if (!rootUser) {
            console.log('User not found in database');
            return res.status(401).json({error: "User not found"});
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        console.log('Authentication successful for user:', rootUser.userName);
        next();

    } catch (error) {
        console.log('Authentication error:', error.message);
        res.status(401).json({error: "Authentication failed"});
    }
}

module.exports = authenticate;