#!/usr/bin/env node

/**
 * Image Compression Script
 * Converts images to optimized WebP format while maintaining quality
 * 
 * Usage: node scripts/compress-images.js <input-folder> <output-folder>
 * Example: node scripts/compress-images.js public/new-examples public/video-screenshots/new-examples
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Check if sharp is available, if not, use cwebp (requires ImageMagick/WebP tools)
let useSharp = false;
try {
  require('sharp');
  useSharp = true;
} catch (e) {
  console.log('sharp not found, will use cwebp command-line tool');
}

function checkCwebp() {
  try {
    execSync('which cwebp', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

async function compressImageSharp(inputPath, outputPath) {
  const sharp = require('sharp');
  
  await sharp(inputPath)
    .webp({ 
      quality: 85,
      effort: 6, // Balance between compression speed and file size (0-6)
      nearLossless: false
    })
    .toFile(outputPath);
  
  const stats = fs.statSync(outputPath);
  return stats.size;
}

function compressImageCwebp(inputPath, outputPath) {
  try {
    execSync(`cwebp -q 85 -m 6 "${inputPath}" -o "${outputPath}"`, { stdio: 'inherit' });
    const stats = fs.statSync(outputPath);
    return stats.size;
  } catch (error) {
    console.error(`Error compressing ${inputPath}:`, error.message);
    return null;
  }
}

async function compressImages(inputFolder, outputFolder) {
  if (!fs.existsSync(inputFolder)) {
    console.error(`Input folder does not exist: ${inputFolder}`);
    process.exit(1);
  }

  // Create output folder if it doesn't exist
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
    console.log(`Created output folder: ${outputFolder}`);
  }

  const files = fs.readdirSync(inputFolder);
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.PNG', '.JPG', '.JPEG'];
  
  const imageFiles = files.filter(file => 
    imageExtensions.some(ext => file.endsWith(ext))
  );

  if (imageFiles.length === 0) {
    console.log('No image files found in input folder');
    return;
  }

  console.log(`Found ${imageFiles.length} image(s) to compress\n`);

  let totalOriginalSize = 0;
  let totalCompressedSize = 0;

  for (const file of imageFiles) {
    const inputPath = path.join(inputFolder, file);
    const baseName = path.parse(file).name;
    const outputFileName = `${baseName}.webp`;
    const outputPath = path.join(outputFolder, outputFileName);

    const originalStats = fs.statSync(inputPath);
    totalOriginalSize += originalStats.size;

    console.log(`Compressing: ${file} (${(originalStats.size / 1024).toFixed(2)} KB)`);

    let compressedSize;
    if (useSharp) {
      compressedSize = await compressImageSharp(inputPath, outputPath);
    } else {
      if (!checkCwebp()) {
        console.error('Error: cwebp not found. Please install WebP tools:');
        console.error('  macOS: brew install webp');
        console.error('  Linux: sudo apt-get install webp');
        console.error('  Or install sharp: npm install sharp');
        process.exit(1);
      }
      compressedSize = compressImageCwebp(inputPath, outputPath);
    }

    if (compressedSize) {
      totalCompressedSize += compressedSize;
      const savings = ((1 - compressedSize / originalStats.size) * 100).toFixed(1);
      console.log(`  ✓ Saved as ${outputFileName} (${(compressedSize / 1024).toFixed(2)} KB, ${savings}% smaller)\n`);
    }
  }

  console.log('\n=== Compression Summary ===');
  console.log(`Original size: ${(totalOriginalSize / 1024).toFixed(2)} KB`);
  console.log(`Compressed size: ${(totalCompressedSize / 1024).toFixed(2)} KB`);
  console.log(`Total savings: ${((1 - totalCompressedSize / totalOriginalSize) * 100).toFixed(1)}%`);
  console.log(`\nCompressed images saved to: ${outputFolder}`);
}

// Get command line arguments
const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node scripts/compress-images.js <input-folder> <output-folder>');
  console.error('Example: node scripts/compress-images.js public/new-examples public/video-screenshots/new-examples');
  process.exit(1);
}

const inputFolder = args[0];
const outputFolder = args[1];

compressImages(inputFolder, outputFolder).catch(error => {
  console.error('Error:', error);
  process.exit(1);
});

