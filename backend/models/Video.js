const mongoose = require('mongoose');

const videoSchema = mongoose.Schema(
  {
    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Module',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    contentText: {
      type: String,
    },
    duration: {
      type: Number, // in seconds
    },
    url: {
      type: String, // Cloudinary URL
      required: true,
    },
    cloudinaryId: {
      type: String,
    },
    order: {
      type: Number,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    pdfUrl: {
      type: String,
    },
    timestamps: [
      {
        time: { type: Number }, // seconds
        label: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;
