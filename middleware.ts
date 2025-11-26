import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const prettifyFromPath = (pathname: string) => {
  const parts = pathname.split('/').filter(Boolean)
  const last = parts[parts.length - 1] ?? ''
  return last.replace(/[-_]+/g, ' ').trim()
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const isGameDetail = pathname.startsWith('/en/g/')
  const isWinterClash = pathname === '/winter-clash-3d' || pathname.startsWith('/winter-clash-3d/')

  if (isGameDetail || isWinterClash) {
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
  matcher: ['/en/g/:path*', '/winter-clash-3d', '/winter-clash-3d/:path*'],
}
