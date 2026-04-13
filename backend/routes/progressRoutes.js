const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const { protect } = require('../middlewares/authMiddleware');

// @desc    Get user progress for a course
// @route   GET /api/progress/:courseId
// @access  Private
router.get('/:courseId', protect, async (req, res) => {
  try {
    let progress = await Progress.findOne({
      userId: req.user._id,
      courseId: req.params.courseId,
    });

    if (!progress) {
      progress = await Progress.create({
        userId: req.user._id,
        courseId: req.params.courseId,
        completedLessons: [],
      });
    }

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Toggle lesson completion
// @route   POST /api/progress/toggle
// @access  Private
router.post('/toggle', protect, async (req, res) => {
  const { courseId, lessonId } = req.body;

  try {
    let progress = await Progress.findOne({
      userId: req.user._id,
      courseId: courseId,
    });

    if (!progress) {
      progress = await Progress.create({
        userId: req.user._id,
        courseId: courseId,
        completedLessons: [lessonId],
      });
    } else {
      const index = progress.completedLessons.indexOf(lessonId);
      if (index === -1) {
        progress.completedLessons.push(lessonId);
      } else {
        progress.completedLessons.splice(index, 1);
      }
      await progress.save();
    }

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
