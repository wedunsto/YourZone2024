// Controller containing functions  to create a Bible study document
const BibleStudy = require('../../models/BibleVerses');

const createBibleVerse = async (req, res) => {
    const { username, type, title, bibleverses, notes } = req.body;
    if(!username || !type || !title || !bibleverses) {
        return res.status(400).json({'message': 'Please enter the required properties.' });
    }

    try {
        // Create and store a new Bible verse / sermon note
        const result = await BibleStudy.create({
            "username": username,
            "type": type,
            "title": title,
            "bibleverses": bibleverses,
            "notes": notes
        });

        res.status(201).json({ 'success': `New bible study created!` });
    } catch(err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { createBibleVerse };