// Controller used to delete existing Bible Study documents

const BibleStudy = require('../../models/BibleVerses');

const deleteBibleStudy = async (req, res) => {
    const { id } = req.body;

    try {
        // Find BibleStudy and delete it
        const deletedStudy = await BibleStudy.findOneAndDelete(
            {_id: id}
        );

        if(!deletedStudy) {
            return res.sendStatus(404);
        }

        // Send the deleted document in response
        res.json(deletedStudy);
    } catch( err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { deleteBibleStudy }