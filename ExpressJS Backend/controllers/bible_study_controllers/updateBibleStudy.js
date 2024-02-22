// Controller used to update existing Bible Study documents

const BibleStudy = require('../../models/BibleVerses');

const updateBibleStudy = async (req, res) => {
    const { id, type, title, bibleverses, notes } = req.body;
    
    try {
        // Find BibleStudy and update properties
        const updateStudy = await BibleStudy.findOneAndUpdate(
            { _id: id },
            {$set: { type: type, title: title, bibleverses: bibleverses, notes: notes } },
            { new: true }
        );

        if(!updateStudy) {
            return res.status(404).json({ message: 'Bible study not found' });
        }

        // Send the updated document in the response
        res.json(updateStudy)

    } catch(err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { updateBibleStudy }