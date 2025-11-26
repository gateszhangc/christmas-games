# 🎄 Poki 圣诞主题页面复刻项目

这是一个用于学习研究的网站复刻项目，使用 Next.js 和 Playwright 复刻 https://poki.com/en/christmas 圣诞主题页面。

## ✅ 复刻成果

- ✅ 成功使用 Playwright 获取完整渲染后的HTML
- ✅ 保留了圣诞主题背景（雪花SVG）
- ✅ 完整的DOM结构和CSS样式
- ✅ 所有游戏卡片和分类信息
- ⚠️ 原网站是React SPA，动态内容需要JavaScript支持

## 🎯 项目特点

1. **自动化抓取**：使用Playwright浏览器自动化工具，等待页面完全渲染后再抓取
2. **完整保留**：保留了所有CSS样式、SVG图标、背景图片
3. **像素对比**：提供截图对比工具，可以进行像素级差异分析
4. **学习友好**：适合学习网页结构、CSS布局和React应用架构

## 快速开始

### 1. 安装依赖

```bash
npm install
npm install -D playwright pixelmatch pngjs
npx playwright install chromium
```

### 2. 获取网站内容

```bash
npm run fetch
```

这会从 https://poki.com/en/christmas 下载 HTML 并提取到 `data/` 目录。

### 3. 生成静态快照

```bash
npm run update-original
```

生成 `public/original.html` 用于对比。

### 4. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看复刻的网站。

### 5. 构建生产版本

```bash
npm run build
npm run start
```

## 视觉对比测试

### 截图对比

1. 启动生产服务器：
```bash
npm run start
```

2. 在另一个终端捕获截图：
```bash
npm run capture
```

3. 生成差异图：
```bash
npm run compare
```

4. 分析差异区域（可选）：
```bash
npm run analyze
```

## 项目结构

```
├── app/
│   ├── layout.tsx      # 读取 data/home-head.html
│   ├── page.tsx        # 渲染 data/home-body.html
│   └── globals.css     # Tailwind CSS
├── data/
│   ├── home-head.html  # 网站 <head> 内容
│   └── home-body.html  # 网站 <body> 内容
├── public/
│   └── original.html   # 完整的静态快照
├── scripts/
│   ├── fetchSite.js           # 获取网站内容
│   ├── updateOriginalHtml.js  # 生成静态快照
│   ├── captureScreenshots.js  # 截图对比
│   ├── compareScreenshots.js  # 像素差异分析
│   └── analyzeRawDiff.js      # 差异区域定位
└── screenshots/
    ├── original.png    # 原网站截图
    ├── clone.png       # 复刻网站截图
    └── diff.png        # 差异图
```

## SEO 文件

项目包含以下 SEO 相关文件：

### robots.txt
- 静态版本：`public/robots.txt`
- 动态版本：`app/robots.ts`（Next.js 自动生成）
- 访问：http://localhost:3002/robots.txt

### sitemap.xml
- 静态版本：`public/sitemap.xml`
- 动态版本：`app/sitemap.ts`（Next.js 自动生成）
- 访问：http://localhost:3002/sitemap.xml

### 配置环境变量
```bash
# 复制环境变量模板
cp .env.example .env.local

# 编辑 .env.local，设置你的域名
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

## 注意事项

- 原网站会加载广告、分析等动态资源，即使禁用 JavaScript，也可能有 2-3% 的像素差异
- 这个项目仅用于学习研究目的
- robots.txt 和 sitemap.xml 中的域名需要根据实际部署情况修改
