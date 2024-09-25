// CRUD routes for YourBible notes
const express = require('express');
const { createBibleStudyNotes, getAllBibleStudyNotes,
    getAllBibleLessonNotes, updateBibleStudyNote,
    updateBibleLessonNotes, updateBibleLessonNote,
    deleteBibleStudyLesson, deleteBibleStudyNote } = require("../../controllers/api/bibleStudyController");
const router = express.Router();

router.post('/createBibleStudy', createBibleStudyNotes);
router.get('/getBibleStudies', getAllBibleStudyNotes);
router.put('/createBibleLesson', updateBibleLessonNotes);
router.get('/getBibleLessons', getAllBibleLessonNotes);
router.put('/updateBibleStudy', updateBibleStudyNote);
router.put('/updateBibleLesson', updateBibleLessonNote);
router.delete('/deleteBibleStudy', deleteBibleStudyNote);
router.put('/deleteBibleLesson', deleteBibleStudyLesson)

module.exports = router;