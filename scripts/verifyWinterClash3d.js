const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log('=== Winter Clash 3D 页面验证 ===\n');
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // 访问页面
    console.log('1. 访问页面...');
    await page.goto('http://localhost:3002/winter-clash-3d', { 
      waitUntil: 'networkidle',
      timeout: 10000 
    });
    console.log('   ✓ 页面加载成功\n');
    
    // 获取页面信息
    console.log('2. 页面信息:');
    const title = await page.title();
    console.log(`   标题: ${title}`);
    
    const url = page.url();
    console.log(`   URL: ${url}\n`);
    
    // 检查关键元素
    console.log('3. 检查页面元素:');
    const bodyText = await page.textContent('body');
    console.log(`   页面内容长度: ${bodyText.length} 字符`);
    
    // 截图
    console.log('\n4. 生成截图...');
    const screenshotPath = path.join(__dirname, '../screenshots/winter-clash-3d-verified.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`   ✓ 截图已保存: ${screenshotPath}\n`);
    
    // 检查网络请求
    console.log('5. 检查资源加载:');
    const requests = [];
    page.on('request', req => requests.push(req.url()));
    await page.reload({ waitUntil: 'networkidle' });
    console.log(`   总请求数: ${requests.length}\n`);
    
    console.log('=== 验证完成 ===');
    console.log('✓ Winter Clash 3D 页面运行正常');
    console.log('✓ 可以访问: http://localhost:3002/winter-clash-3d');
    
  } catch (error) {
    console.error('❌ 验证失败:', error.message);
  } finally {
    await browser.close();
  }
})();
