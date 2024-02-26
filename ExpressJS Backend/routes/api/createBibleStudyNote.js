// Route used to create a new bible study / sermon note
const express = require('express');
const router = express.Router();
const bibleStudyController = require('../../controllers/api/bibleStudyController');

router.post('/', bibleStudyController.createBibleStudyNotes);

module.exports = router;