import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const prettifyFromPath = (pathname: string) => {
  const parts = pathname.split('/').filter(Boolean)
  const last = parts[parts.length - 1] ?? ''
  return last.replace(/[-_]+/g, ' ').trim()
}

const categoryFallbacks = new Set([
  '/en/winter',
  '/en/skateboarding',
  '/en/bike',
  '/en/mobile',
  '/en/shooting',
  '/en/multiplayer',
  '/en/nitrome',
  '/en/skill',
  '/en/arcade',
  '/en/action',
])

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const isGameDetail = pathname.startsWith('/en/g/')
  const isCategory = categoryFallbacks.has(pathname.replace(/\/$/, ''))

  // Keep Winter Clash 3D live page accessible
  if (pathname === '/winter-clash-3d' || pathname.startsWith('/winter-clash-3d/')) {
    return NextResponse.next()
  }

  if (isGameDetail || isCategory) {
    const params = new URLSearchParams(search)

    if (!params.has('game')) {
      params.set('game', prettifyFromPath(pathname))
    }

    params.set('from', pathname)
    const redirectUrl = new URL(`/coming-soon?${params.toString()}`, request.url)
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/en/g/:path*', '/en/winter', '/en/skateboarding', '/en/bike', '/en/mobile', '/en/shooting', '/en/multiplayer', '/en/nitrome', '/en/skill', '/en/arcade', '/en/action'],
}
