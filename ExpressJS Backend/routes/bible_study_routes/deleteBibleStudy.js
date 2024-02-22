// Route used to delete a bible study by id
const express = require('express');
const router = express.Router();
const deleteBibleStudy = require('../../controllers/bible_study_controllers/deleteBibleStudy');

router.route('/').delete(deleteBibleStudy.deleteBibleStudy);

module.exports = router 