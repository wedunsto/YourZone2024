// Controller containing functions to create, read, update, and delete users
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create a new user with the Submitted role
const createUser = async (req, res) => {
    const { username, password } = req.body;

    if(!username || !password) {
        return res.status(400).json({ 
            'message': 'Username and password are required.' 
        });
    }

    // Check for duplicate usernames in the database
    const duplicate = await User.findOne({ username: username }).exec();
    
    if (duplicate) {
        return res.sendStatus(409);
    }

    /*
        Encrypt the password and store the new user in the database
        Users are given the Submitted role when a role is not specified
    */ 
   
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await User.create({ 
            "username": username,
            "password": hashedPassword,
            "roles": {
                "Submitted":2001
            }
        });
        res.status(201).json({ 
            'success': `New user ${username} created!` 
        });
    } catch(err) {
        res.status(500).json({ 
            'message': err.message 
        });
    }
}

// Log user into the web application
const logUserIn = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ 
            'message': 'Username and password are required.' 
        });
    }

    // Find the user in the database. If its not found, send 404 unauthorized error
    const foundUser = await User.findOne({username: username }).exec();

    if(!foundUser) {
        return res.sendStatus(404);
    }

    // Evaluate password using bcrypt
    const match = await bcrypt.compare(password, foundUser.password);

    // Create a JWT to use with other routes we want protected in our API
    if(match) {
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
            { expiresIn: '1hr' }
        );

        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        // Save refresh token in database. Invalidate refresh token when a user logs out
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();

        /*
            Store access token as a cookie at HTTP only to avoid JavaScript access
            sameSite: None for Chrome cookie settings
            secure true: works in the dev sever and needed for Chrome 
        */
        res.cookie('jwt', refreshToken, {
            httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000
        });
        
        // Sent as JSON so the front end can grab this
        res.json({id, roles, accessToken});
    } else {
        res.sendStatus(401);
    }
}

/*
    Update a user's roles
    Set ALL the roles at once
*/
const updateUserRoles = async (req, res) => {
    const { id, roles } = req.body;

    try {
        // Find user by username and update the role property
        const updatedUserRole = await User.findOneAndUpdate(
            { _id: id },
            { $set: { roles: roles } },
            { new: true } // Return the new updated document
        );

        if(!updatedUserRole) {
            return res.status(404).json({ 
                message: 'User not found' 
            });
        }

        // Send the updated document in the response
        res.json(updatedUserRole);
    } catch(err) {
        res.status(500).json({ 'message': err.message });
    }
}

// Log user out of the web application
const logUserOut = async (req, res) => {
    const { id } = req.body;

    // Clear out the value of the refresh token
    try {
        const loggedOutUser = await User.findOneAndUpdate(
            { _id: id },
            { $set: { refreshToken: '' } }
        );

        if(!loggedOutUser) {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch(err) {
        res.status(500).json({ 'message': err.message });
    }

    // Delete the cookie
    // secure: only serves on https; if you dont have https dont use this, apparently it works in dev?
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    
    return res.status(200).json({ 
        message: "Successfully logged out." 
    });
}

// Delete a user from the backend database
const deleteUser = async (req, res) => {
    const { id } = req.body;

    try {
        const deletedUser = await User.findOneAndDelete(
            { _id: id }
        );

        if(!deletedUser) {
            return res.sendStatus(404);
        }

        // Send the deleted document in the response
        res.json(deletedUser);
    } catch(err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = {
    createUser,
    logUserIn,
    updateUserRoles,
    logUserOut,
    deleteUser
}