import './globals.css'
import { readFileSync } from 'fs'
import { join } from 'path'
import Script from 'next/script'

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
      <body suppressHydrationWarning>
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-BLXZZ0WE9Y"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BLXZZ0WE9Y');
          `}
        </Script>
        {children}
      </body>
    </html>
  )
}
