const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');

const SCREENSHOTS_DIR = path.join(__dirname, '../screenshots');

const img1 = PNG.sync.read(fs.readFileSync(path.join(SCREENSHOTS_DIR, 'original.png')));
const img2 = PNG.sync.read(fs.readFileSync(path.join(SCREENSHOTS_DIR, 'clone.png')));

const { width, height } = img1;
const diff = new PNG({ width, height });

const numDiffPixels = pixelmatch(
  img1.data,
  img2.data,
  diff.data,
  width,
  height,
  { threshold: 0.1 }
);

fs.writeFileSync(
  path.join(SCREENSHOTS_DIR, 'diff.png'),
  PNG.sync.write(diff)
);

const totalPixels = width * height;
const diffPercent = ((numDiffPixels / totalPixels) * 100).toFixed(2);

console.log(`Differing pixels: ${numDiffPixels} / ${totalPixels} (${diffPercent}%)`);
console.log('✓ Saved diff.png');
