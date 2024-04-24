// Schema for Mongoose used to create BibleVerses Documents
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bibleverseSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    bibleVerseNotes: {
        type: Array
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('BibleStudy', bibleverseSchema);