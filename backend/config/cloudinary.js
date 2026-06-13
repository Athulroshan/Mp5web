const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// Configure multer storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'mpss-products',
    format: async (req, file) => {
      const ext = file.mimetype.split('/')[1]
      return ext === 'svg+xml' ? 'png' : ext
    },
    public_id: (req, file) => {
      return `${Date.now()}-${file.originalname.split('.')[0]}`
    },
    quality: 'auto:good',
    responsive: true,
    gravity: 'auto',
    crop: 'fill'
  }
})

// Configure multer for file upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed'), false)
    }
  }
})

// Utility function to delete image from Cloudinary
const deleteCloudinaryImage = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error)
  }
}

// Utility function to upload image
const uploadImage = async (filePath, folderName = 'mpss-products') => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folderName,
      resource_type: 'auto'
    })
    return {
      url: result.secure_url,
      publicId: result.public_id
    }
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error)
    throw error
  }
}

module.exports = {
  cloudinary,
  storage,
  upload,
  deleteCloudinaryImage,
  uploadImage
}
