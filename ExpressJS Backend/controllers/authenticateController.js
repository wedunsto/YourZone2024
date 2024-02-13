const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authenticateUser = async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({ 
            'message': 'Username and password are required.' 
        });
    }
    
    // Find the user that is sent in
    const foundUser = await User.findOne({ username: username }).exec();
    if(!foundUser) {
        return res.sendStatus(404); // Unauthorized
    }

    // Evaluate password using bcrypt
    const match = await bcrypt.compare(password, foundUser.password);
    // Make sure to grab the roles we put in our user's json file
    if(match) {
        // Create a JWTs to use with other routes we want protected in our API
        // The first thing you pass into a jwt is the payload
        // Then pass in your secret
        // Then pass in an option that handles expiration
        const roles = Object.values(foundUser.roles).filter(Boolean);
        const id = Object.values(foundUser.id).join('');
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "id": id,
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1m' }
        );

        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        // Save refresh token in database. Invalidate refresh token when a user logs out
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        // Store access token as a cookie at HTTP only to avoid JavaScript access
        // Max age is 1 day
        // sameSite: None for Chrome cookie settings
        // secure true: works in the dev sever and needed for Chrome
        res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'None', secure: true,
         maxAge: 24 * 60 * 60 * 1000})

        // Sent as JSON so the front end can grab this
        res.json({id, roles, accessToken});
    } else {
        res.sendStatus(401);
    }

}

module.exports = {authenticateUser};