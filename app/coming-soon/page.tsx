import { readFileSync } from 'fs'
import { join } from 'path'
import ComingSoonClient from './ComingSoonClient'

type SearchParams = {
  game?: string | string[]
  from?: string | string[]
}

const extractFirstMatch = (html: string, pattern: RegExp) => {
  const match = html.match(pattern)
  return match?.[0] ?? ''
}

const normalizeParams = (params: SearchParams) => ({
  game: Array.isArray(params.game) ? params.game[0] : params.game,
  from: Array.isArray(params.from) ? params.from[0] : params.from,
})

export default function ComingSoonPage({ searchParams }: { searchParams: SearchParams }) {
  let navHtml = ''
  let footerHtml = ''

  try {
    const bodyContent = readFileSync(join(process.cwd(), 'data/home-body.html'), 'utf-8')
    navHtml = extractFirstMatch(bodyContent, /<nav[^>]*>.*?<\/nav>/s)
    footerHtml = extractFirstMatch(bodyContent, /<footer[^>]*>.*?<\/footer>/s)
  } catch (error) {
    console.warn('home-body.html not found, run: npm run fetch')
  }

  return <ComingSoonClient searchParams={normalizeParams(searchParams)} navHtml={navHtml} footerHtml={footerHtml} />
}
