// Controller containing functions to get Bible study documents
const BibleStudy = require('../../models/BibleVerses');

const getBibleVerses = async (req, res) => {
    const bibleVerses = await BibleStudy.find();
    if (!bibleVerses) return res.status(204).json({ 'message': 'No employees found.' });
    res.json(bibleVerses);
}

module.exports = getBibleVerses;
