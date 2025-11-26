const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');
const PUBLIC_DIR = path.join(__dirname, '../public');

if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

try {
  const headContent = fs.readFileSync(path.join(DATA_DIR, 'home-head.html'), 'utf-8');
  const bodyContent = fs.readFileSync(path.join(DATA_DIR, 'home-body.html'), 'utf-8');
  
  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
${headContent}
</head>
<body>
${bodyContent}
</body>
</html>`;
  
  fs.writeFileSync(path.join(PUBLIC_DIR, 'original.html'), fullHtml, 'utf-8');
  console.log('✓ Generated public/original.html');
} catch (err) {
  console.error('Error:', err.message);
  console.log('Please run: npm run fetch first');
}
