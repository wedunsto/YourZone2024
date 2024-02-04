const User = require('../models/Users');

const deleteUser = async (req, res) => {
    const { username } = req.body;
    try {
        // Find user by username and delete it
        const deletedUser = await User.findOneAndDelete(
            { username: username }
        );

        if(!deletedUser) {
            return res.sendStatus(404);
        }

        // Send the deleted document in the response
        res.json(deletedUser);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { deleteUser };