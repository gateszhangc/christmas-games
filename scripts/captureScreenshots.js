const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const SCREENSHOTS_DIR = path.join(__dirname, '../screenshots');

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    javaScriptEnabled: false
  });
  
  console.log('Capturing original site...');
  const page1 = await context.newPage();
  await page1.goto('https://poki.com/en/christmas', { waitUntil: 'networkidle' });
  await page1.screenshot({
    path: path.join(SCREENSHOTS_DIR, 'original.png'),
    fullPage: true
  });
  console.log('✓ Saved original.png');
  
  console.log('Capturing clone...');
  const page2 = await context.newPage();
  await page2.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page2.screenshot({
    path: path.join(SCREENSHOTS_DIR, 'clone.png'),
    fullPage: true
  });
  console.log('✓ Saved clone.png');
  
  await browser.close();
  console.log('✓ Screenshots captured!');
})();
