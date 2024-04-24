// Controller containing functions to create, read, update, and delete Bible study notes
const BibleStudy = require('../../models/BibleVerses');
const eventLogger = require('../../middleware/logEvents');

// Create new Bible study notes
const createBibleStudyNotes = async (req, res) => {
    const { userId, title, bibleVerseNotes } = req.body;
    
    if(!userId || !title) {
        eventLogger.logEvents('Please enter the required properties.');
        return res.status(400).json({ 
            'message': 'Please enter the required properties.' 
        });
    }

    try {
        let result;
        // Create and store a new Bible verse note
        if(bibleVerseNotes) {
            result = await BibleStudy.create({
                "userId": userId,
                "title": title,
                "bibleVerseNotes": bibleVerseNotes
            });
        }
        else {
            result = await BibleStudy.create({
                "userId": userId,
                "title": title
            });
        }

        eventLogger.logEvents('Successfully create new Bible study note');
        res.status(201).json({ 
            'success': `New bible study created!` 
        });
    } catch(err) {
        eventLogger.logEvents(`Error encountered while creating a new Bible study note: ${err.message}`);
        res.status(500).json({ 'message': err.message });
    }
}

// Read all Bible study notes for a specific user
const getAllBibleStudyNotes = async (req, res) => {
    const { userId } = req.query;

    const bibleVerseNotes = await BibleStudy.find(
        {userId: userId}
    );
    if (!bibleVerseNotes) {
        eventLogger.logEvents('No Bible notes found.');
        return res.status(204).json({ 'message': 'No Bible notes found.' });
    }
    eventLogger.logEvents('Bible studies retrieved');
    res.json(bibleVerseNotes);
}

// Update a Bible study note
const updateBibleStudyNote = async (req, res) => {
    const { id, title, bibleVerseNotes } = req.body;
    
    try {
        // Find BibleStudy and update properties
        const updateStudy = await BibleStudy.findOneAndUpdate(
            { _id: id },
            {$set: { title: title, bibleVerseNotes: bibleVerseNotes } },
            { new: true }
        );

        if(!updateStudy) {
            eventLogger.logEvents('Bible study not found for updates.');
            return res.status(404).json({ message: 'Bible study not found for updates.' });
        }

        eventLogger.logEvents('Bible study updated');
        // Send the updated document in the response
        res.json(updateStudy)

    } catch(err) {
        eventLogger.logEvents(`Error encountered while updating Bible study note: ${err.message}`);
        res.status(500).json({ 'message': err.message });
    }
}

// Delete a Bible study note
const deleteBibleStudyNote = async (req, res) => {
    const { id } = req.body;

    try {
        // Find BibleStudy and delete it
        const deletedStudy = await BibleStudy.findOneAndDelete(
            {_id: id}
        );

        if(!deletedStudy) {
            eventLogger.logEvents('Could not find Bible study note to delete');
            return res.sendStatus(404);
        }

        eventLogger.logEvents('Bible study note successfully deleted');
        // Send the deleted document in response
        res.json(deletedStudy);
    } catch( err) {
        eventLogger.logEvents(`Error encountered while deleting Bible study note: ${err.message}`);
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = {
    createBibleStudyNotes,
    getAllBibleStudyNotes,
    updateBibleStudyNote,
    deleteBibleStudyNote
}