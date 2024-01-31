const User = require('../models/Users');

const updateUserPermissions = async (req, res) => {
    const { username, roles } = req.body;
    try {
        // Find user by username and update the role property
        const updatedUserRole = await User.findOneAndUpdate(
            { username: username },
            { $set: { roles: roles } },
            { new: true } // Return the new updated document
        );

        if(!updatedUserRole) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send the updated document in the response
        res.json(updatedUserRole);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { updateUserPermissions };