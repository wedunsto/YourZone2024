// Route used to delete a bible study note by id
const express = require('express');
const router = express.Router();
const bibleStudyController = require('../../../controllers/api/bibleStudyController');

router.route('/').delete(bibleStudyController.deleteBibleStudyNote);

module.exports = router 