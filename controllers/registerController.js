const User = require('../models/Users');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    const { user, password } = req.body;
    if (!user || !password) return res.status(400).json({ 'message': 'Username and password are required.' });
    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 
    
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);
        //store the new user
        // Add role of user when the user registers
        // Create an store new user
        const result = await User.create({ 
            "username": user,
            "password": hashedPwd 
        });

        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { createUser };