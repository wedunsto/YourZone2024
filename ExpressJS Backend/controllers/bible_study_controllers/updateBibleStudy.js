// Controller used to update existing Bible Study documents

const BibleStudy = require('../../models/BibleVerses');

const updateBibleStudy = async (req, res) => {
    const { id, type, title, bibleverses, notes } = req.body;
    
    try {
        // Find Bible and update properties
        const updateBible = await BibleStudy.findOneAndUpdate(
            { _id: id },
            {$set: { type: type, title: title, bibleverses: bibleverses, notes: notes } },
            { new: true }
        );

        if(!updateBible) {
            return res.status(404).json({ message: 'Bible study not found' });
        }

        // Send the updated document in the response
        res.json(updateBible)

    } catch(err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { updateBibleStudy }