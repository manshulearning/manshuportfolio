const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middlewares/authMiddleware');
const Module = require('../models/Module');

// @desc    Get modules for course
// @route   GET /api/modules/:courseId
router.get('/:courseId', async (req, res) => {
  try {
    const modules = await Module.find({ courseId: req.params.courseId }).sort({ order: 1 });
    res.json(modules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create module
// @route   POST /api/modules
router.post('/', protect, admin, async (req, res) => {
  const { courseId, title, order } = req.body;
  try {
    const moduleItem = new Module({ courseId, title, order });
    const createdModule = await moduleItem.save();
    res.status(201).json(createdModule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Delete module
// @route   DELETE /api/modules/:id
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const moduleItem = await Module.findById(req.params.id);
    if (moduleItem) {
      await moduleItem.deleteOne();
      res.json({ message: 'Module removed' });
    } else {
      res.status(404).json({ message: 'Module not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
