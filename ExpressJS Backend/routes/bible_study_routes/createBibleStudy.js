// Route used to create a new bible study / sermon note
const express = require('express');
const router = express.Router();
const createBibleVerse = require('../../controllers/bible_study_controllers/createBibleStudy');

router.post('/', createBibleVerse.createBibleVerse);

module.exports = router;