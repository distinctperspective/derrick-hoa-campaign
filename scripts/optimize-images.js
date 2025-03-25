const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');
const optimizedDir = path.join(__dirname, '../public/images/optimized');

// Create optimized directory if it doesn't exist
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

// Get all image files
const imageFiles = fs.readdirSync(imagesDir).filter(file => {
  const ext = path.extname(file).toLowerCase();
  return ['.jpg', '.jpeg', '.png'].includes(ext) && !file.includes('optimized');
});

// Process each image
async function optimizeImages() {
  console.log(`Found ${imageFiles.length} images to optimize`);
  
  for (const file of imageFiles) {
    const inputPath = path.join(imagesDir, file);
    const outputPath = path.join(optimizedDir, file);
    const ext = path.extname(file).toLowerCase();
    
    // Get image info
    const metadata = await sharp(inputPath).metadata();
    console.log(`Processing: ${file} (${metadata.width}x${metadata.height}, ${(fs.statSync(inputPath).size / 1024 / 1024).toFixed(2)}MB)`);
    
    // Determine target width (max 1920px for large images)
    const targetWidth = metadata.width > 1920 ? 1920 : metadata.width;
    
    try {
      // Process based on file type
      if (ext === '.png') {
        await sharp(inputPath)
          .resize(targetWidth)
          .png({ quality: 85, compressionLevel: 9 })
          .toFile(outputPath);
      } else {
        await sharp(inputPath)
          .resize(targetWidth)
          .jpeg({ quality: 85, mozjpeg: true })
          .toFile(outputPath);
      }
      
      // Log results
      const originalSize = fs.statSync(inputPath).size;
      const optimizedSize = fs.statSync(outputPath).size;
      const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(2);
      
      console.log(`✅ Optimized: ${file} - Saved ${savings}% (${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(optimizedSize / 1024 / 1024).toFixed(2)}MB)`);
    } catch (err) {
      console.error(`❌ Error optimizing ${file}:`, err);
    }
  }
}

optimizeImages().then(() => {
  console.log('Image optimization complete!');
});
