// Route used to update a Bible Lesson's Bible verse and note(s)
const express = require('express');
const router = express.Router();
const bibleStudyController = require('../../../controllers/api/bibleStudyController');

router.post('/', bibleStudyController.updateBibleLessonNote);

module.exports = router;