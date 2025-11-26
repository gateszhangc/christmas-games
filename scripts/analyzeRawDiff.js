const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const SCREENSHOTS_DIR = path.join(__dirname, '../screenshots');

const diff = PNG.sync.read(fs.readFileSync(path.join(SCREENSHOTS_DIR, 'diff.png')));

let minX = diff.width, minY = diff.height;
let maxX = 0, maxY = 0;

for (let y = 0; y < diff.height; y++) {
  for (let x = 0; x < diff.width; x++) {
    const idx = (diff.width * y + x) << 2;
    const r = diff.data[idx];
    const g = diff.data[idx + 1];
    const b = diff.data[idx + 2];
    
    if (r > 0 || g > 0 || b > 0) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

if (maxX > 0 && maxY > 0) {
  console.log(`Bounding box of differences:`);
  console.log(`  Top-left: (${minX}, ${minY})`);
  console.log(`  Bottom-right: (${maxX}, ${maxY})`);
  console.log(`  Size: ${maxX - minX}x${maxY - minY}`);
} else {
  console.log('No differences found!');
}
