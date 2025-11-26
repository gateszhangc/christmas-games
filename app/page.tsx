import { readFileSync } from 'fs'
import { join } from 'path'

export default function Home() {
  let bodyContent = ''
  try {
    bodyContent = readFileSync(join(process.cwd(), 'data/home-body.html'), 'utf-8')
  } catch (e) {
    console.warn('home-body.html not found, run: npm run fetch')
    bodyContent = '<div style="padding: 2rem; text-align: center;"><h1>请先运行: npm run fetch</h1></div>'
  }

  return (
    <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: bodyContent }} />
  )
}
