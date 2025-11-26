export default function Compare() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ color: '#002b50' }}>🎄 Poki Christmas Page - 复刻对比</h1>
      
      <div style={{ marginTop: '20px', padding: '20px', background: '#e8f5e9', borderRadius: '8px', border: '2px solid #4caf50' }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#2e7d32' }}>✅ 复刻成功！</h3>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>✅ 使用 Playwright 获取了完整的渲染后HTML</li>
          <li>✅ 成功保留圣诞主题背景和雪花效果</li>
          <li>✅ 完整的DOM结构和CSS样式</li>
          <li>✅ 所有游戏卡片和分类信息</li>
        </ul>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h2>查看复刻版本：</h2>
        <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
          <a 
            href="/" 
            style={{ 
              padding: '12px 24px', 
              background: '#002b50', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '6px',
              fontWeight: 'bold'
            }}
          >
            查看主页复刻
          </a>
          <a 
            href="https://poki.com/en/christmas" 
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              padding: '12px 24px', 
              background: '#4caf50', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '6px',
              fontWeight: 'bold'
            }}
          >
            打开原网站对比
          </a>
        </div>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', background: '#fff3e0', borderRadius: '8px', border: '2px solid #ff9800' }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#e65100' }}>⚠️ 技术说明</h3>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>原网站是React单页应用（SPA），使用客户端渲染</li>
          <li>我们使用Playwright浏览器自动化工具获取渲染后的完整HTML</li>
          <li>静态版本保留了所有视觉效果，但交互功能需要JavaScript支持</li>
          <li>适合学习网页结构、CSS样式和布局设计</li>
        </ul>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 15px 0' }}>📁 项目文件结构</h3>
        <pre style={{ background: '#263238', color: '#aed581', padding: '15px', borderRadius: '6px', overflow: 'auto' }}>
{`data/
├── home-head.html    # 网站 <head> 内容
├── home-body.html    # 网站 <body> 内容
└── full.html         # 完整HTML（调试用）

public/
└── original.html     # 合并后的静态快照

scripts/
├── fetchSite.js           # 获取网站内容
├── updateOriginalHtml.js  # 生成静态快照
├── captureScreenshots.js  # 截图对比
├── compareScreenshots.js  # 像素差异分析
└── analyzeRawDiff.js      # 差异区域定位`}
        </pre>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', background: '#e3f2fd', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#1565c0' }}>🚀 可用命令</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
          <div style={{ background: 'white', padding: '15px', borderRadius: '6px' }}>
            <code style={{ background: '#263238', color: '#4fc3f7', padding: '4px 8px', borderRadius: '4px' }}>npm run fetch</code>
            <p style={{ margin: '10px 0 0 0', fontSize: '14px' }}>重新获取网站内容</p>
          </div>
          <div style={{ background: 'white', padding: '15px', borderRadius: '6px' }}>
            <code style={{ background: '#263238', color: '#4fc3f7', padding: '4px 8px', borderRadius: '4px' }}>npm run build</code>
            <p style={{ margin: '10px 0 0 0', fontSize: '14px' }}>构建生产版本</p>
          </div>
          <div style={{ background: 'white', padding: '15px', borderRadius: '6px' }}>
            <code style={{ background: '#263238', color: '#4fc3f7', padding: '4px 8px', borderRadius: '4px' }}>npm run capture</code>
            <p style={{ margin: '10px 0 0 0', fontSize: '14px' }}>截图对比测试</p>
          </div>
        </div>
      </div>
    </div>
  )
}
