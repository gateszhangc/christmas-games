const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:3002/winter-clash-3d';

(async () => {
  console.log('启动浏览器测试 Winter Clash 3D 页面...');
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log(`导航到 ${TARGET_URL}...`);
  await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
  
  // 等待页面加载
  await page.waitForTimeout(2000);
  
  console.log('检查页面标题...');
  const title = await page.title();
  console.log(`✓ 页面标题: ${title}`);
  
  console.log('检查页面内容...');
  const bodyText = await page.textContent('body');
  if (bodyText.includes('Winter Clash 3D') || bodyText.includes('winter-clash')) {
    console.log('✓ 页面包含 Winter Clash 相关内容');
  } else {
    console.log('⚠ 未找到 Winter Clash 相关内容');
  }
  
  console.log('截取页面截图...');
  await page.screenshot({ 
    path: 'screenshots/winter-clash-3d-test.png',
    fullPage: true 
  });
  console.log('✓ 截图已保存到 screenshots/winter-clash-3d-test.png');
  
  console.log('\n测试完成！浏览器将保持打开状态以便查看...');
  console.log('按 Ctrl+C 关闭浏览器');
  
  // 保持浏览器打开
  await page.waitForTimeout(60000);
  
  await browser.close();
})();
Winter Clash 3D 页面...');
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // 测试本地页面
  console.log('访问本地页面: http://localhost:3002/winter-clash-3d');
  await page.goto('http://localhost:3002/winter-clash-3d', { waitUntil: 'networkidle' });
  
  await page.waitForTimeout(3000);
  
  // 获取页面标题
  const title = await page.title();
  console.log('页面标题:', title);
  
  // 检查游戏容器是否存在
  const gameContainer = await page.$('#game');
  console.log('游戏容器存在:', !!gameContainer);
  
  // 截图
  await page.screenshot({ path: 'screenshots/winter-clash-3d-test.png', fullPage: true });
  console.log('✓ 截图已保存到 screenshots/winter-clash-3d-test.png');
  
  // 获取控制台日志
  page.on('console', msg => console.log('浏览器控制台:', msg.text()));
  
  console.log('\n测试完成！浏览器将保持打开状态供您检查...');
  console.log('按 Ctrl+C 关闭浏览器');
  
  // 保持浏览器打开
  await page.waitForTimeout(60000);
  
  await browser.close();
})();
