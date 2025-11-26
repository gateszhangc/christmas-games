const { chromium } = require('playwright');

(async () => {
  console.log('启动浏览器测试...\n');
  
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  
  const page = await context.newPage();
  
  // 测试本地复刻页面
  console.log('📍 导航到本地页面: http://localhost:3000');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  // 获取页面标题
  const title = await page.title();
  console.log(`✓ 页面标题: ${title}`);
  
  // 检查控制台错误
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  
  // 检查网络请求
  const requests = [];
  page.on('request', request => {
    requests.push({
      url: request.url(),
      method: request.method(),
      resourceType: request.resourceType()
    });
  });
  
  await page.waitForTimeout(3000);
  
  // 获取页面元素统计
  const stats = await page.evaluate(() => {
    return {
      images: document.querySelectorAll('img').length,
      links: document.querySelectorAll('a').length,
      scripts: document.querySelectorAll('script').length,
      styles: document.querySelectorAll('link[rel="stylesheet"]').length,
      divs: document.querySelectorAll('div').length
    };
  });
  
  console.log('\n📊 页面元素统计:');
  console.log(`  - 图片: ${stats.images}`);
  console.log(`  - 链接: ${stats.links}`);
  console.log(`  - 脚本: ${stats.scripts}`);
  console.log(`  - 样式表: ${stats.styles}`);
  console.log(`  - DIV 元素: ${stats.divs}`);
  
  console.log(`\n🌐 网络请求: ${requests.length} 个`);
  
  if (errors.length > 0) {
    console.log(`\n⚠️  控制台错误: ${errors.length} 个`);
    errors.slice(0, 5).forEach(err => console.log(`  - ${err}`));
  } else {
    console.log('\n✅ 无控制台错误');
  }
  
  // 截图
  await page.screenshot({ 
    path: 'screenshots/test-winter-clash.png',
    fullPage: true 
  });
  console.log('\n📸 已保存测试截图: screenshots/test-winter-clash.png');
  
  console.log('\n✅ 测试完成！浏览器将保持打开状态供手动检查...');
  console.log('按 Ctrl+C 关闭浏览器');
  
  // 保持浏览器打开
  await new Promise(() => {});
})();
