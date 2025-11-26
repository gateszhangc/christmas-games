import './globals.css'
import { readFileSync } from 'fs'
import { join } from 'path'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let headContent = ''
  try {
    headContent = readFileSync(join(process.cwd(), 'data/home-head.html'), 'utf-8')
    // 移除所有 script 标签，只保留 CSS
    headContent = headContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  } catch (e) {
    console.warn('home-head.html not found, run: npm run fetch')
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head dangerouslySetInnerHTML={{ __html: headContent }} />
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
