import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';

async function generateIcons() {
  const sizes = [72, 96, 128, 192, 256, 384, 512];
  const sourceIcon = 'public/icon-512.png';

  // Check if source icon exists
  if (!existsSync(sourceIcon)) {
    console.error(`Source icon ${sourceIcon} not found!`);
    process.exit(1);
  }

  console.log('Generating icons...');

  for (const size of sizes) {
    const outputPath = `public/icon-${size}.png`;

    try {
      await sharp(sourceIcon)
        .resize(size, size, {
          fit: 'cover',
          position: 'center',
        })
        .png()
        .toFile(outputPath);

      console.log(`✓ Generated ${outputPath} (${size}x${size})`);
    } catch (error) {
      console.error(`✗ Failed to generate ${outputPath}:`, error);
    }
  }

  console.log('\nIcon generation complete!');
}

generateIcons().catch(console.error);
