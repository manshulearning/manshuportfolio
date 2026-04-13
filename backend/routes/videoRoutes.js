const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middlewares/authMiddleware');
const { upload } = require('../config/cloudinary');
const Video = require('../models/Video');

// @desc    Get videos for module
// @route   GET /api/videos/:moduleId
router.get('/:moduleId', async (req, res) => {
  try {
    const videos = await Video.find({ moduleId: req.params.moduleId }).sort({ order: 1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Upload new video with multiple files
// @route   POST /api/videos
router.post('/', protect, admin, upload.fields([
  { name: 'videoFile', maxCount: 1 },
  { name: 'thumbnailFile', maxCount: 1 },
  { name: 'pdfFile', maxCount: 1 }
]), async (req, res) => {
  const { moduleId, title, description, contentText, order, timestamps } = req.body;
  
  const videoFile = req.files['videoFile'] ? req.files['videoFile'][0] : null;
  const thumbnailFile = req.files['thumbnailFile'] ? req.files['thumbnailFile'][0] : null;
  const pdfFile = req.files['pdfFile'] ? req.files['pdfFile'][0] : null;

  if (!videoFile) {
     return res.status(400).json({ message: 'No video file provided' });
  }

  try {
    const newVideo = new Video({
      moduleId,
      title,
      description,
      contentText,
      order,
      url: videoFile.path,
      cloudinaryId: videoFile.filename,
      thumbnail: thumbnailFile ? thumbnailFile.path : undefined,
      pdfUrl: pdfFile ? pdfFile.path : undefined,
      timestamps: timestamps ? JSON.parse(timestamps) : [],
    });
    
    const createdVideo = await newVideo.save();
    res.status(201).json(createdVideo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Delete video
// @route   DELETE /api/videos/:id
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (video) {
        // Here we could also delete from cloudinary if needed
        // await cloudinary.uploader.destroy(video.cloudinaryId, { resource_type: 'video' });
        await video.deleteOne();
        res.json({ message: 'Video removed' });
    } else {
        res.status(404).json({ message: 'Video not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
