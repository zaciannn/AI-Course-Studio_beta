const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { enrollCourse, getMyCourses, hideCourse, updateChapterProgress, updateChapterContent } = require('../controllers/courseController');

router.post('/enroll', protect, enrollCourse);
router.get('/my-courses', protect, getMyCourses);
router.put('/:id/hide', protect, hideCourse);
router.put('/:id/progress/:chapterId', protect, updateChapterProgress);
router.put('/:id/chapter/:chapterId', protect, updateChapterContent);

module.exports = router;
