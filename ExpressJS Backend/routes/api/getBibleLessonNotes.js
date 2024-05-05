// Route used to get all bible lesson notes
const express = require('express');
const router = express.Router();
const bibleStudyController = require('../../controllers/api/bibleStudyController');

router.route('/').get(bibleStudyController.getAllBibleLessonNotes);

module.exports = router;