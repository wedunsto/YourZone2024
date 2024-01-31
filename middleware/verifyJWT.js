// Middleware used to verify tokens. Used in employee.js route api
const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    // Auth header might come in with lower or upper case 'a'
    const authHeader = req.headers.authorization || req.headers.Authorization;
    
    if(!authHeader?.startsWith('Bearer ')) {
        return res.sendStatus(401);
    }
    
    const token = authHeader.split(' ')[1]; // Gets the token in the 1 index

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.sendStatus(403); // invalid token resuliting in forbidden error
            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    );
}

module.exports = verifyJWT;