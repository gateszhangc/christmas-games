const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const TARGET_URL = 'https://poki.com/en/christmas';
const DATA_DIR = path.join(__dirname, '../data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log(`Navigating to ${TARGET_URL}...`);
  await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
  
  // Wait for content to load
  await page.waitForTimeout(3000);
  
  console.log('Extracting rendered HTML...');
  const html = await page.content();
  
  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  
  if (headMatch) {
    fs.writeFileSync(
      path.join(DATA_DIR, 'home-head.html'),
      headMatch[1],
      'utf-8'
    );
    console.log('✓ Saved home-head.html');
  }
  
  if (bodyMatch) {
    fs.writeFileSync(
      path.join(DATA_DIR, 'home-body.html'),
      bodyMatch[1],
      'utf-8'
    );
    console.log('✓ Saved home-body.html');
  }
  
  fs.writeFileSync(
    path.join(DATA_DIR, 'full.html'),
    html,
    'utf-8'
  );
  console.log('✓ Saved full.html');
  
  await browser.close();
  console.log('✓ Fetch complete! Christmas page content saved.');
})();
