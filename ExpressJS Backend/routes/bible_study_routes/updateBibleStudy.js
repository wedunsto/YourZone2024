const express = require('express');
const router = express.Router();
const updateBibleStudy = require('../../controllers/bible_study_controllers/updateBibleStudy');

router.post('/', updateBibleStudy.updateBibleStudy);

module.exports = router;