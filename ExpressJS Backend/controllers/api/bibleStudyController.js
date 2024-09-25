// Controller containing functions to create, read, update, and delete Bible study notes
const BibleStudy = require('../../models/BibleVerses');
const eventLogger = require('../../middleware/logEvents');

// Create new Bible study notes
const createBibleStudyNotes = async (req, res) => {
    const { userId } = req.query;
    const { title } = req.body;
    
    if(!userId || !title) {
        eventLogger.logEvents('Please enter the required properties.');
        return res.status(400).json({ 
            'message': 'Please enter the required properties.' 
        });
    }

    try {
        let result;
        result = await BibleStudy.create({
            "userId": userId,
            "title": title,
            "bibleVerseNotes": []
        });

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

// Read all Bible verses and notes for a specific Bible study note
const getAllBibleLessonNotes = async (req, res) => {
    const { bibleStudyId } = req.query;

    const bibleStudy = await BibleStudy.findOne(
        {_id: bibleStudyId }
    );

    if (!bibleStudy) {
        eventLogger.logEvents('No Bible notes found.');
        return res.status(204).json({ 'message': 'No Bible notes found.' });
    }

    eventLogger.logEvents('Bible lessons retrieved');
    res.json(bibleStudy.bibleVerseNotes);
};

// Update a Bible study note
const updateBibleStudyNote = async (req, res) => {
    const { bibleStudyId } = req.query;
    const { title } = req.body;
    
    try {
        // Find BibleStudy and update properties
        const updateStudy = await BibleStudy.findOneAndUpdate(
            { _id: bibleStudyId },
            {$set: { title: title } },
            { new: true }
        );

        if(!updateStudy) {
            eventLogger.logEvents('Bible study not found for updates.');
            return res.status(404).json({ message: 'Bible study not found for updates.' });
        }

        eventLogger.logEvents('Bible study updated');
        res.status(201).json({ 'success': `Bible notes updated` });

    } catch(err) {
        eventLogger.logEvents(`Error encountered while updating Bible study note: ${err.message}`);
        res.status(500).json({ 'message': err.message });
    }
}

// Update the Bible verse and or note(s) for a specific Bible lesson note
const updateBibleLessonNote = async (req, res) => {
    const { bibleStudyId } = req.query;
    const { index, bibleVerse, bibleVerseNote } = req.body;
    // Find BibleStudy and update the lesson
    try {
        const updateLesson = await BibleStudy.findOneAndUpdate(
            { _id: bibleStudyId },
            { $set: {
                [`bibleVerseNotes.${index}`]: {bibleVerse: bibleVerse, bibleVerseNote: bibleVerseNote} 
                }
            },
            { new: true }
        );

        if(!updateLesson) {
            eventLogger.logEvents('Bible lesson not found for updates.');
            return res.status(404).json({ message: 'Bible lesson not found for updates.' });
        }

        eventLogger.logEvents('Bible lesson updated');
        res.status(201).json({ 
            'success': `Bible lesson updated!` 
        });
    } catch(err) {
        eventLogger.logEvents(`Error encountered while updating Bible lesson note: ${err.message}`);
        res.status(500).json({ 'message': err.message });
    }
}

// Update Bible study lesson: Contains Bible verse and note(s)
const updateBibleLessonNotes = async (req, res) => {
    const { bibleStudyId } = req.query;
    const { bibleVerse, bibleVerseNote } = req.body;

    const newBibleLesson = {bibleVerse: bibleVerse, bibleVerseNote: bibleVerseNote}

    // Find BibleStudy and update the lesson
    try {
        const updateLesson = await BibleStudy.findOneAndUpdate(
            {_id: bibleStudyId},
            {$push: {bibleVerseNotes: newBibleLesson} }
        )

        if(!updateLesson) {
            eventLogger.logEvents('Bible lesson not found for updates.');
            return res.status(404).json({ message: 'Bible lesson not found for updates.' });
        }

        eventLogger.logEvents('Bible lesson notes updated');
        res.status(201).json({ 
            'success': `Bible lesson notes updated!` 
        });

    } catch(e) {
        eventLogger.logEvents(`Error encountered while updating Bible lesson note: ${err.message}`);
        res.status(500).json({ 'message': err.message });
    }
}

// Delete Bible study lesson
const deleteBibleStudyLesson = async (req, res) => {
    const { bibleStudyId } = req.query;
    const { index } = req.body;
    // Loop through all lessons until the lesson with the specified index is found
    try {
        const bibleStudy = await BibleStudy.findOne(
            {_id: bibleStudyId}
        );

        if(!bibleStudy) {
            eventLogger.logEvents('Bible study not found for deletion.');
            return res.status(404).json({ message: 'Bible study not found for deletion.' });
        }

        // Remove the lesson with the specified index
        bibleStudy.bibleVerseNotes.splice(index, 1);
        await bibleStudy.save();

        eventLogger.logEvents('Bible lesson deleted');
        res.status(201).json({ 
            'success': `Bible lesson deleted!` 
        });
    } catch(err) {
        eventLogger.logEvents(`Error encountered while deleting Bible lesson note: ${err.message}`);
        res.status(500).json({ 'message': err.message });
    }
}

// Delete a Bible study note
const deleteBibleStudyNote = async (req, res) => {
    const { bibleStudyId } = req.query;

    try {
        // Find BibleStudy and delete it
        const deletedStudy = await BibleStudy.findOneAndDelete(
            {_id: bibleStudyId}
        );

        if(!deletedStudy) {
            eventLogger.logEvents('Could not find Bible study note to delete');
            return res.sendStatus(404);
        }

        eventLogger.logEvents('Bible study note successfully deleted');
        res.status(201).json({ 
            'success': `Bible study deleted!` 
        });
    } catch( err) {
        eventLogger.logEvents(`Error encountered while deleting Bible study note: ${err.message}`);
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = {
    createBibleStudyNotes,
    getAllBibleStudyNotes,
    getAllBibleLessonNotes,
    updateBibleStudyNote,
    updateBibleLessonNotes,
    updateBibleLessonNote,
    deleteBibleStudyLesson,
    deleteBibleStudyNote
}