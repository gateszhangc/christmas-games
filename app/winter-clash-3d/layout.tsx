import { readFileSync } from 'fs'
import { join } from 'path'
import '../globals.css'

export default function WinterClash3DLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let headContent = ''
  try {
    headContent = readFileSync(join(process.cwd(), 'data/winter-clash-3d/head.html'), 'utf-8')
    // 移除所有 script 标签，只保留 CSS
    headContent = headContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  } catch (e) {
    console.warn('winter-clash-3d head.html not found')
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head dangerouslySetInnerHTML={{ __html: headContent }} />
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
