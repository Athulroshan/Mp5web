import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const PHOTO_FOLDER = path.join(__dirname, 'photo');
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
 * Generate URL for an image file (original)
 */
function generateImageUrl(filename) {
  return `${BASE_URL}/${encodeURIComponent(filename)}`;
}

/**
 * Generate URL for an image file with query parameters (like Unsplash)
 */
function generateImageUrlWithParams(filename, width = null, height = null, fit = 'cover', quality = 80) {
  const params = new URLSearchParams();
  if (width) params.append('w', width);
  if (height) params.append('h', height);
  params.append('fit', fit);
  params.append('quality', quality);
  
  return `${BASE_URL}/${encodeURIComponent(filename)}?${params.toString()}`;
}

/**
 * Get all image URLs
 */
function getAllImageUrls() {
  const imageFiles = getImageFiles();
  return imageFiles.map(filename => ({
    filename,
    url: generateImageUrl(filename),
    url_300x400: generateImageUrlWithParams(filename, 300, 400, 'cover'),
    url_600x800: generateImageUrlWithParams(filename, 600, 800, 'cover'),
    url_1200x1600: generateImageUrlWithParams(filename, 1200, 1600, 'cover'),
    url_square: generateImageUrlWithParams(filename, 400, 400, 'cover'),
    url_thumbnail: generateImageUrlWithParams(filename, 150, 150, 'cover'),
    name: path.parse(filename).name
  }));
}

/**
 * Generate a JSON file with all image URLs
 */
function generateImageUrlsFile() {
  const imageUrls = getAllImageUrls();
  const outputPath = path.join(__dirname, 'imageUrls.json');
  
  const data = {
    generatedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    totalImages: imageUrls.length,
    examples: {
      original: `${BASE_URL}/IMG-20250728-WA0060.jpg`,
      resized_300x400: `${BASE_URL}/IMG-20250728-WA0060.jpg?w=300&h=400&fit=cover&quality=80`,
      resized_600x800: `${BASE_URL}/IMG-20250728-WA0060.jpg?w=600&h=800&fit=cover&quality=80`,
      square: `${BASE_URL}/IMG-20250728-WA0060.jpg?w=400&h=400&fit=cover&quality=80`,
      thumbnail: `${BASE_URL}/IMG-20250728-WA0060.jpg?w=150&h=150&fit=cover&quality=80`
    },
    parameters: {
      w: "Width in pixels",
      h: "Height in pixels", 
      fit: "Resize fit mode (cover, contain, fill, inside, outside)",
      quality: "JPEG quality (1-100)"
    },
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
  const outputPath = path.join(__dirname, 'imagePreview.html');
  
  let html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image URLs Preview - Unsplash Style</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1400px; margin: 0 auto; }
        .header { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .image-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 20px; }
        .image-item { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .image-preview { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 15px; }
        .preview-item { text-align: center; }
        .preview-item img { width: 100%; height: 120px; object-fit: cover; border-radius: 4px; border: 1px solid #ddd; }
        .preview-label { font-size: 12px; color: #666; margin-top: 5px; }
        .image-info { padding: 15px; border-top: 1px solid #eee; }
        .image-name { font-weight: bold; margin-bottom: 8px; color: #333; }
        .url-section { margin: 10px 0; }
        .url-label { font-size: 12px; color: #666; margin-bottom: 5px; }
        .image-url { word-break: break-all; font-size: 11px; color: #666; background: #f8f9fa; padding: 6px; border-radius: 4px; margin: 3px 0; }
        .copy-btn { background: #007bff; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; margin: 2px; }
        .copy-btn:hover { background: #0056b3; }
        .stats { display: flex; gap: 20px; margin-bottom: 20px; flex-wrap: wrap; }
        .stat { background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .stat-number { font-size: 24px; font-weight: bold; color: #007bff; }
        .stat-label { color: #666; font-size: 14px; }
        .examples { background: white; padding: 15px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .example-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 15px; }
        .example-item { text-align: center; }
        .example-item img { width: 100%; height: 150px; object-fit: cover; border-radius: 4px; }
        .example-url { font-size: 11px; color: #666; margin-top: 5px; word-break: break-all; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🖼️ Image URLs Preview - Unsplash Style</h1>
            <div class="stats">
                <div class="stat">
                    <div class="stat-number">${imageUrls.length}</div>
                    <div class="stat-label">Total Images</div>
                </div>
                <div class="stat">
                    <div class="stat-number">${BASE_URL}</div>
                    <div class="stat-label">Base URL</div>
                </div>
                <div class="stat">
                    <div class="stat-number">5</div>
                    <div class="stat-label">URL Variants</div>
                </div>
            </div>
        </div>

        <div class="examples">
            <h3>📋 URL Examples (like Unsplash)</h3>
            <div class="example-grid">
                <div class="example-item">
                    <img src="${BASE_URL}/IMG-20250728-WA0060.jpg?w=300&h=400&fit=cover&quality=80" alt="300x400">
                    <div class="example-url">300×400 (cover)</div>
                </div>
                <div class="example-item">
                    <img src="${BASE_URL}/IMG-20250728-WA0060.jpg?w=400&h=400&fit=cover&quality=80" alt="400x400">
                    <div class="example-url">400×400 (square)</div>
                </div>
                <div class="example-item">
                    <img src="${BASE_URL}/IMG-20250728-WA0060.jpg?w=150&h=150&fit=cover&quality=80" alt="150x150">
                    <div class="example-url">150×150 (thumbnail)</div>
                </div>
                <div class="example-item">
                    <img src="${BASE_URL}/IMG-20250728-WA0060.jpg?w=600&h=800&fit=cover&quality=80" alt="600x800">
                    <div class="example-url">600×800 (large)</div>
                </div>
            </div>
        </div>

        <div class="image-grid">
`;

  imageUrls.forEach(image => {
    html += `
        <div class="image-item">
            <div class="image-preview">
                <div class="preview-item">
                    <img src="${image.url_300x400}" alt="${image.name}" onerror="this.style.display='none'">
                    <div class="preview-label">300×400</div>
                </div>
                <div class="preview-item">
                    <img src="${image.url_square}" alt="${image.name}" onerror="this.style.display='none'">
                    <div class="preview-label">400×400</div>
                </div>
            </div>
            <div class="image-info">
                <div class="image-name">${image.name}</div>
                
                <div class="url-section">
                    <div class="url-label">Original:</div>
                    <div class="image-url">${image.url}</div>
                    <button class="copy-btn" onclick="copyToClipboard('${image.url}')">Copy</button>
                </div>
                
                <div class="url-section">
                    <div class="url-label">300×400:</div>
                    <div class="image-url">${image.url_300x400}</div>
                    <button class="copy-btn" onclick="copyToClipboard('${image.url_300x400}')">Copy</button>
                </div>
                
                <div class="url-section">
                    <div class="url-label">Square:</div>
                    <div class="image-url">${image.url_square}</div>
                    <button class="copy-btn" onclick="copyToClipboard('${image.url_square}')">Copy</button>
                </div>
                
                <div class="url-section">
                    <div class="url-label">Thumbnail:</div>
                    <div class="image-url">${image.url_thumbnail}</div>
                    <button class="copy-btn" onclick="copyToClipboard('${image.url_thumbnail}')">Copy</button>
                </div>
            </div>
        </div>
    `;
  });

  html += `
        </div>
    </div>
    <script>
        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                // Show a temporary success message
                const btn = event.target;
                const originalText = btn.textContent;
                btn.textContent = '✅ Copied!';
                btn.style.background = '#28a745';
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '#007bff';
                }, 2000);
            }).catch(() => {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                alert('URL copied to clipboard!');
            });
        }
    </script>
</body>
</html>`;

  fs.writeFileSync(outputPath, html);
  console.log(`✅ Generated HTML preview: ${outputPath}`);
}

// Run the script
console.log('🖼️  Generating Unsplash-style image URLs...\n');

const imageUrls = getAllImageUrls();
console.log('📋 Image URLs (Unsplash style):');
imageUrls.forEach(image => {
  console.log(`${image.name}:`);
  console.log(`  Original: ${image.url}`);
  console.log(`  300×400:  ${image.url_300x400}`);
  console.log(`  Square:   ${image.url_square}`);
  console.log(`  Thumbnail: ${image.url_thumbnail}`);
  console.log('');
});

console.log('\n📁 Generating files...');
generateImageUrlsFile();
generateImagePreviewHTML();

console.log('\n✅ Done! Your images now support Unsplash-style URLs:');
console.log(`   - JSON file: imageUrls.json`);
console.log(`   - HTML preview: imagePreview.html`);
console.log(`   - Direct URLs: ${BASE_URL}/filename.jpg?w=300&h=400&fit=cover`);

console.log('\n🚀 URL Parameters (like Unsplash):');
console.log('   - w=300 (width in pixels)');
console.log('   - h=400 (height in pixels)');
console.log('   - fit=cover (cover, contain, fill, inside, outside)');
console.log('   - quality=80 (JPEG quality 1-100)');

console.log('\n📝 Example URLs:');
console.log(`   ${BASE_URL}/IMG-20250728-WA0060.jpg?w=300&h=400&fit=cover&quality=80`);
console.log(`   ${BASE_URL}/IMG-20250728-WA0060.jpg?w=400&h=400&fit=cover&quality=80`);
console.log(`   ${BASE_URL}/IMG-20250728-WA0060.jpg?w=150&h=150&fit=cover&quality=80`);

console.log('\n🚀 To use these URLs:');
console.log('   1. Start your backend server: cd backend && npm run dev');
console.log('   2. Open imagePreview.html in your browser');
console.log('   3. Or use the API: GET http://localhost:5000/api/photos'); 