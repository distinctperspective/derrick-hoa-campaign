const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [16, 32, 48, 64, 128, 192, 256, 512];
const sourceImage = path.join(__dirname, '../public/images/dtlogo.png');

async function createFaviconsWithPadding() {
  try {
    // Get the metadata of the source image
    const metadata = await sharp(sourceImage).metadata();
    
    // Create a new image with padding
    const paddedImage = await sharp(sourceImage)
      .extend({
        top: Math.floor(metadata.height * 0.1),
        bottom: Math.floor(metadata.height * 0.1),
        left: Math.floor(metadata.width * 0.1),
        right: Math.floor(metadata.width * 0.2), // Extra padding on the right side
        background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent background
      })
      .toBuffer();

    // Create favicon.ico (multi-size ICO file)
    const buffers = await Promise.all([
      sharp(paddedImage).resize(16, 16).toBuffer(),
      sharp(paddedImage).resize(32, 32).toBuffer(),
      sharp(paddedImage).resize(48, 48).toBuffer()
    ]);
    
    fs.writeFileSync(
      path.join(__dirname, '../public/favicon.ico'),
      Buffer.concat(buffers)
    );
    console.log('favicon.ico created successfully!');

    // Create individual PNG favicons for different sizes
    for (const size of sizes) {
      await sharp(paddedImage)
        .resize(size, size)
        .toFile(path.join(__dirname, `../public/favicon-${size}x${size}.png`));
      console.log(`favicon-${size}x${size}.png created successfully!`);
    }

    // Create Apple touch icons
    await sharp(paddedImage)
      .resize(180, 180)
      .toFile(path.join(__dirname, '../public/apple-touch-icon.png'));
    console.log('apple-touch-icon.png created successfully!');

    // Create Android/Chrome icons
    await sharp(paddedImage)
      .resize(192, 192)
      .toFile(path.join(__dirname, '../public/android-chrome-192x192.png'));
    await sharp(paddedImage)
      .resize(512, 512)
      .toFile(path.join(__dirname, '../public/android-chrome-512x512.png'));
    console.log('Android/Chrome icons created successfully!');

  } catch (error) {
    console.error('Error creating favicons:', error);
  }
}

createFaviconsWithPadding();
