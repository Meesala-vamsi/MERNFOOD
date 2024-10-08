const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require("multer")
const dotenv = require("dotenv")
dotenv.config({path:"./config.env"})

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

console.log(process.env.CLOUDINARY_CLOUD_NAME)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'foods',
    format: async (req, file) => 'png',
    public_id: (req, file) => `${Date.now()}_${file.originalname.split('.')[0]}`,
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
