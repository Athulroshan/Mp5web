const express = require('express');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const { getImageFiles, generateImageUrl, getAllImageUrls } = require('../utils/imageUrls');

const router = express.Router();

// @route   GET /photos/:filename
// @desc    Serve photo with optional resizing (like Unsplash URLs)
// @access  Public
router.get('/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const { w, h, fit = 'cover', quality = 80 } = req.query;
    const imageFiles = getImageFiles();
    
    if (!imageFiles.includes(filename)) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    const imagePath = path.join(__dirname, '../../photo', filename);
    
    // If no resize parameters, serve the original image
    if (!w && !h) {
      return res.sendFile(imagePath);
    }

    // Process image with sharp
    let sharpInstance = sharp(imagePath);
    
    // Parse dimensions
    const width = w ? parseInt(w) : null;
    const height = h ? parseInt(h) : null;
    const qualityValue = parseInt(quality);

    // Apply resize based on fit parameter
    switch (fit) {
      case 'cover':
        sharpInstance = sharpInstance.resize(width, height, { fit: 'cover' });
        break;
      case 'contain':
        sharpInstance = sharpInstance.resize(width, height, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } });
        break;
      case 'fill':
        sharpInstance = sharpInstance.resize(width, height, { fit: 'fill' });
        break;
      case 'inside':
        sharpInstance = sharpInstance.resize(width, height, { fit: 'inside' });
        break;
      case 'outside':
        sharpInstance = sharpInstance.resize(width, height, { fit: 'outside' });
        break;
      default:
        sharpInstance = sharpInstance.resize(width, height, { fit: 'cover' });
    }

    // Set quality for JPEG
    if (path.extname(filename).toLowerCase() === '.jpg' || path.extname(filename).toLowerCase() === '.jpeg') {
      sharpInstance = sharpInstance.jpeg({ quality: qualityValue });
    }

    // Get the processed image buffer
    const processedImageBuffer = await sharpInstance.toBuffer();

    // Set appropriate headers
    res.set({
      'Content-Type': 'image/jpeg',
      'Content-Length': processedImageBuffer.length,
      'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
      'ETag': `"${filename}-${w}-${h}-${fit}-${quality}"`
    });

    res.send(processedImageBuffer);

  } catch (error) {
    console.error('Serve photo error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while processing photo'
    });
  }
});

// @route   GET /api/photos
// @desc    Get all available photos with URLs
// @access  Public
router.get('/api/photos', (req, res) => {
  try {
    const imageUrls = getAllImageUrls();
    
    res.json({
      success: true,
      data: {
        totalImages: imageUrls.length,
        baseUrl: 'http://localhost:5000/photos',
        images: imageUrls
      }
    });
  } catch (error) {
    console.error('Get photos error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching photos'
    });
  }
});

// @route   GET /api/photos/:filename
// @desc    Get specific photo URL with optional resizing
// @access  Public
router.get('/api/photos/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const { w, h, fit = 'cover', quality = 80 } = req.query;
    const imageFiles = getImageFiles();
    
    if (!imageFiles.includes(filename)) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    const imagePath = path.join(__dirname, '../../photo', filename);
    
    // If no resize parameters, return the original image
    if (!w && !h) {
      const imageUrl = generateImageUrl(filename);
      return res.json({
        success: true,
        data: {
          filename,
          url: imageUrl,
          name: filename.replace(/\.[^/.]+$/, '')
        }
      });
    }

    // Process image with sharp
    let sharpInstance = sharp(imagePath);
    
    // Parse dimensions
    const width = w ? parseInt(w) : null;
    const height = h ? parseInt(h) : null;
    const qualityValue = parseInt(quality);

    // Apply resize based on fit parameter
    switch (fit) {
      case 'cover':
        sharpInstance = sharpInstance.resize(width, height, { fit: 'cover' });
        break;
      case 'contain':
        sharpInstance = sharpInstance.resize(width, height, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } });
        break;
      case 'fill':
        sharpInstance = sharpInstance.resize(width, height, { fit: 'fill' });
        break;
      case 'inside':
        sharpInstance = sharpInstance.resize(width, height, { fit: 'inside' });
        break;
      case 'outside':
        sharpInstance = sharpInstance.resize(width, height, { fit: 'outside' });
        break;
      default:
        sharpInstance = sharpInstance.resize(width, height, { fit: 'cover' });
    }

    // Set quality for JPEG
    if (path.extname(filename).toLowerCase() === '.jpg' || path.extname(filename).toLowerCase() === '.jpeg') {
      sharpInstance = sharpInstance.jpeg({ quality: qualityValue });
    }

    // Get the processed image buffer
    const processedImageBuffer = await sharpInstance.toBuffer();

    // Set appropriate headers
    res.set({
      'Content-Type': 'image/jpeg',
      'Content-Length': processedImageBuffer.length,
      'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
      'ETag': `"${filename}-${w}-${h}-${fit}-${quality}"`
    });

    res.send(processedImageBuffer);

  } catch (error) {
    console.error('Get photo error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while processing photo'
    });
  }
});

// @route   GET /api/photos/random
// @desc    Get a random photo URL
// @access  Public
router.get('/api/photos/random', (req, res) => {
  try {
    const imageUrls = getAllImageUrls();
    
    if (imageUrls.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No images found'
      });
    }
    
    const randomImage = imageUrls[Math.floor(Math.random() * imageUrls.length)];
    
    res.json({
      success: true,
      data: {
        image: randomImage
      }
    });
  } catch (error) {
    console.error('Get random photo error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching random photo'
    });
  }
});

module.exports = router; 