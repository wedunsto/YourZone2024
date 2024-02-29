// Route used to update bible study note
const express = require('express');
const router = express.Router();
const bibleStudyController = require('../../controllers/api/bibleStudyController');

router.post('/', bibleStudyController.updateBibleStudyNote);

module.exports = router;