const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [16, 32, 48, 64, 128, 192, 256, 512];
const sourceImage = path.join(__dirname, '../public/images/dtlogo.png');

async function createFavicons() {
  try {
    // Create favicon.ico (multi-size ICO file)
    const buffers = await Promise.all([
      sharp(sourceImage).resize(16, 16).toBuffer(),
      sharp(sourceImage).resize(32, 32).toBuffer(),
      sharp(sourceImage).resize(48, 48).toBuffer()
    ]);
    
    fs.writeFileSync(
      path.join(__dirname, '../public/favicon.ico'),
      Buffer.concat(buffers)
    );
    console.log('favicon.ico created successfully!');

    // Create individual PNG favicons for different sizes
    for (const size of sizes) {
      await sharp(sourceImage)
        .resize(size, size)
        .toFile(path.join(__dirname, `../public/favicon-${size}x${size}.png`));
      console.log(`favicon-${size}x${size}.png created successfully!`);
    }

    // Create Apple touch icons
    await sharp(sourceImage)
      .resize(180, 180)
      .toFile(path.join(__dirname, '../public/apple-touch-icon.png'));
    console.log('apple-touch-icon.png created successfully!');

    // Create Android/Chrome icons
    await sharp(sourceImage)
      .resize(192, 192)
      .toFile(path.join(__dirname, '../public/android-chrome-192x192.png'));
    await sharp(sourceImage)
      .resize(512, 512)
      .toFile(path.join(__dirname, '../public/android-chrome-512x512.png'));
    console.log('Android/Chrome icons created successfully!');

  } catch (error) {
    console.error('Error creating favicons:', error);
  }
}

createFavicons();
