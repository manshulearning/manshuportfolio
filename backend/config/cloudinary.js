const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const dotenv = require('dotenv');
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    try {
      // Determine resource_type based on mimetype
      let resource_type = 'raw'; // Default for documents (PDF, ZIP, etc.)
      if (file.mimetype.startsWith('video/')) {
        resource_type = 'video';
      } else if (file.mimetype.startsWith('image/')) {
        resource_type = 'image';
      }

      return {
        folder: 'manshu_uploads',
        resource_type: resource_type, 
        public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
      };
    } catch (err) {
      console.error('Cloudinary Storage Error:', err);
      throw err;
    }
  },
});

const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };
