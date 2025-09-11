const fs = require('fs');
const path = require('path');

// Configuration
const PHOTO_FOLDER = path.join(__dirname, '../../photo');
const BASE_URL = 'http://localhost:5000/photos'; // Change this to your server URL

// Supported image extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

/**
 * Get all image files from the photo folder
 */
function getImageFiles() {
  try {
    const files = fs.readdirSync(PHOTO_FOLDER);
    return files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return IMAGE_EXTENSIONS.includes(ext);
    });
  } catch (error) {
    console.error('Error reading photo folder:', error);
    return [];
  }
}

/**
 * Generate URL for an image file
 */
function generateImageUrl(filename) {
  return `${BASE_URL}/${encodeURIComponent(filename)}`;
}

/**
 * Get all image URLs
 */
function getAllImageUrls() {
  const imageFiles = getImageFiles();
  return imageFiles.map(filename => ({
    filename,
    url: generateImageUrl(filename),
    name: path.parse(filename).name
  }));
}

/**
 * Generate a JSON file with all image URLs
 */
function generateImageUrlsFile() {
  const imageUrls = getAllImageUrls();
  const outputPath = path.join(__dirname, '../imageUrls.json');
  
  const data = {
    generatedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    totalImages: imageUrls.length,
    images: imageUrls
  };

  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  console.log(`✅ Generated image URLs file: ${outputPath}`);
  console.log(`📊 Total images: ${imageUrls.length}`);
  
  return data;
}

/**
 * Generate HTML with image previews
 */
function generateImagePreviewHTML() {
  const imageUrls = getAllImageUrls();
  const outputPath = path.join(__dirname, '../imagePreview.html');
  
  let html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image URLs Preview</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .image-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
        .image-item { border: 1px solid #ddd; padding: 10px; border-radius: 8px; }
        .image-item img { width: 100%; height: 200px; object-fit: cover; border-radius: 4px; }
        .image-info { margin-top: 10px; }
        .image-url { word-break: break-all; font-size: 12px; color: #666; }
        .copy-btn { background: #007bff; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; margin-top: 5px; }
        .copy-btn:hover { background: #0056b3; }
    </style>
</head>
<body>
    <h1>Image URLs Preview</h1>
    <p>Total images: ${imageUrls.length}</p>
    <div class="image-grid">
`;

  imageUrls.forEach(image => {
    html += `
        <div class="image-item">
            <img src="${image.url}" alt="${image.name}" onerror="this.style.display='none'">
            <div class="image-info">
                <strong>${image.name}</strong><br>
                <span class="image-url">${image.url}</span><br>
                <button class="copy-btn" onclick="copyToClipboard('${image.url}')">Copy URL</button>
            </div>
        </div>
    `;
  });

  html += `
    </div>
    <script>
        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                alert('URL copied to clipboard!');
            });
        }
    </script>
</body>
</html>`;

  fs.writeFileSync(outputPath, html);
  console.log(`✅ Generated HTML preview: ${outputPath}`);
}

// Export functions
module.exports = {
  getImageFiles,
  generateImageUrl,
  getAllImageUrls,
  generateImageUrlsFile,
  generateImagePreviewHTML
};

// Run if called directly
if (require.main === module) {
  console.log('🖼️  Generating image URLs...\n');
  
  const imageUrls = getAllImageUrls();
  console.log('📋 Image URLs:');
  imageUrls.forEach(image => {
    console.log(`${image.name}: ${image.url}`);
  });
  
  console.log('\n📁 Generating files...');
  generateImageUrlsFile();
  generateImagePreviewHTML();
  
  console.log('\n✅ Done! You can now access your images via:');
  console.log(`   - JSON file: backend/imageUrls.json`);
  console.log(`   - HTML preview: backend/imagePreview.html`);
  console.log(`   - Direct URLs: ${BASE_URL}/filename.jpg`);
} 