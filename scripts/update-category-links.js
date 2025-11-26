// 更新首页分类按钮链接到备用页
const fs = require('fs');
const path = require('path');

const homeBodyPath = path.join(__dirname, '../data/home-body.html');
let content = fs.readFileSync(homeBodyPath, 'utf-8');

// 需要更新的分类链接
const categoriesToUpdate = [
  '/en/shooting',
  '/en/winter',
  '/en/first-person-shooter',
  '/en/action',
  '/en/boys',
  '/en/christmas',
  '/en/gun',
  '/en/mobile',
  '/en/3d',
  '/en/multiplayer'
];

// 替换所有匹配的链接为 /coming-soon
categoriesToUpdate.forEach(category => {
  // 替换 href="/en/xxx" 为 href="/coming-soon"
  const regex = new RegExp(`href="${category}"`, 'g');
  content = content.replace(regex, 'href="/coming-soon"');
  
  // 替换 href="https://poki.com/en/xxx" 为 href="/coming-soon"
  const fullUrlRegex = new RegExp(`href="https://poki\\.com${category}"`, 'g');
  content = content.replace(fullUrlRegex, 'href="/coming-soon"');
  
  // 替换 onclick 中的链接
  const onclickRegex = new RegExp(`window\\.navigateTo\\('${category}'\\)`, 'g');
  content = content.replace(onclickRegex, `window.navigateTo('/coming-soon')`);
});

fs.writeFileSync(homeBodyPath, content, 'utf-8');
console.log('✅ 首页分类按钮链接已更新为备用页');
