const User = require('../models/Users');

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken
    const cookies = req.cookies;
    // If there are no cookies, or there is no jwt property
    if (!cookies?.jwt) return res.sendStatus(204); //No content to send back
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        // look for jwt property and the same options of when the cookie was set
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // At this point we found the refresh token in the database
    // Delete refreshToken in db
    foundUser.refreshToken = '';
    // Saves changes to MongoDB
    const result = await foundUser.save();
    
    // Delete the cookie
    // secure: only serves on https; if you dont have https dont use this, apparently it works in dev?
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204); // All is well but we have no content to send back
}

module.exports = { handleLogout }