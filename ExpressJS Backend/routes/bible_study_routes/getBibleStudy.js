// Route used to get all bible study notes
const express = require('express');
const router = express.Router();
const getBibleVerses = require('../../controllers/bible_study_controllers/getBibleStudy');

router.route('/').get(getBibleVerses);

module.exports = router;