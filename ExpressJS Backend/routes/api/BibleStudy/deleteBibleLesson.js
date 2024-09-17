// Route used to delete a bible lesson by index
const express = require('express');
const router = express.Router();
const bibleStudyController = require('../../../controllers/api/bibleStudyController');

router.route('/').delete(bibleStudyController.deleteBibleStudyLesson);

module.exports = router;