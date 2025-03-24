const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createFavicon() {
  try {
    // Create the favicon.ico file with multiple sizes
    await sharp(path.join(__dirname, '../public/images/dtlogo.png'))
      .resize(16, 16)
      .toBuffer()
      .then(async (data16) => {
        await sharp(path.join(__dirname, '../public/images/dtlogo.png'))
          .resize(32, 32)
          .toBuffer()
          .then(async (data32) => {
            await sharp(path.join(__dirname, '../public/images/dtlogo.png'))
              .resize(48, 48)
              .toBuffer()
              .then(async (data48) => {
                fs.writeFileSync(
                  path.join(__dirname, '../public/favicon.ico'),
                  Buffer.concat([data16, data32, data48])
                );
                console.log('favicon.ico created successfully!');
              });
          });
      });
  } catch (error) {
    console.error('Error creating favicon:', error);
  }
}

createFavicon();
