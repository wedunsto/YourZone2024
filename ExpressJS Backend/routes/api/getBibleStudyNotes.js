// Route used to get all bible study notes
const express = require('express');
const router = express.Router();
const bibleStudyController = require('../../controllers/api/bibleStudyController');

router.route('/').get(bibleStudyController.getAllBibleStudyNotes);

module.exports = router;