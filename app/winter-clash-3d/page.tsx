import { readFileSync } from 'fs'
import { join } from 'path'

export default function WinterClash3D() {
  let bodyContent = ''
  try {
    bodyContent = readFileSync(join(process.cwd(), 'data/winter-clash-3d/body.html'), 'utf-8')
  } catch (e) {
    console.warn('winter-clash-3d body.html not found')
    bodyContent = '<div style="padding: 2rem; text-align: center;"><h1>Winter Clash 3D - 页面加载失败</h1></div>'
  }

  return (
    <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: bodyContent }} />
  )
}
