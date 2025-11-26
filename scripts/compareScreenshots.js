const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');

const SCREENSHOTS_DIR = path.join(__dirname, '../screenshots');

const img1 = PNG.sync.read(fs.readFileSync(path.join(SCREENSHOTS_DIR, 'original.png')));
const img2 = PNG.sync.read(fs.readFileSync(path.join(SCREENSHOTS_DIR, 'clone.png')));

console.log(`Original size: ${img1.width}x${img1.height}`);
console.log(`Clone size: ${img2.width}x${img2.height}`);

// Use the smaller dimensions for comparison
const width = Math.min(img1.width, img2.width);
const height = Math.min(img1.height, img2.height);
const diff = new PNG({ width, height });

// Crop images if needed
const img1Cropped = img1.width === width && img1.height === height ? img1.data : 
  cropImageData(img1, width, height);
const img2Cropped = img2.width === width && img2.height === height ? img2.data : 
  cropImageData(img2, width, height);

const numDiffPixels = pixelmatch(
  img1Cropped,
  img2Cropped,
  diff.data,
  width,
  height,
  { threshold: 0.1 }
);

function cropImageData(img, targetWidth, targetHeight) {
  const cropped = Buffer.alloc(targetWidth * targetHeight * 4);
  for (let y = 0; y < targetHeight; y++) {
    for (let x = 0; x < targetWidth; x++) {
      const srcIdx = (y * img.width + x) * 4;
      const dstIdx = (y * targetWidth + x) * 4;
      cropped[dstIdx] = img.data[srcIdx];
      cropped[dstIdx + 1] = img.data[srcIdx + 1];
      cropped[dstIdx + 2] = img.data[srcIdx + 2];
      cropped[dstIdx + 3] = img.data[srcIdx + 3];
    }
  }
  return cropped;
}

fs.writeFileSync(
  path.join(SCREENSHOTS_DIR, 'diff.png'),
  PNG.sync.write(diff)
);

const totalPixels = width * height;
const diffPercent = ((numDiffPixels / totalPixels) * 100).toFixed(2);

console.log(`Differing pixels: ${numDiffPixels} / ${totalPixels} (${diffPercent}%)`);
console.log('✓ Saved diff.png');
