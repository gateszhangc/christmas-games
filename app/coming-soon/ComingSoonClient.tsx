'use client'

import Link from 'next/link'
import { FormEvent, useEffect, useMemo, useState } from 'react'

type ComingSoonClientProps = {
  searchParams: {
    game?: string
    from?: string
  }
  navHtml?: string
  footerHtml?: string
}

const prettifyGameName = (raw?: string) => {
  if (!raw) return 'Game'
  return raw
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^\w|\s\w/g, (char) => char.toUpperCase())
}

export default function ComingSoonClient({ searchParams, navHtml, footerHtml }: ComingSoonClientProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle')
  const [message, setMessage] = useState('')

  const gameName = useMemo(
    () => prettifyGameName(searchParams.game ?? searchParams.from?.split('/').pop()),
    [searchParams.game, searchParams.from]
  )

  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => {
        window.location.href = '/'
      }, 1200)
      return () => clearTimeout(timer)
    }
  }, [status])

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = email.trim()
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailPattern.test(trimmed)) {
      setStatus('error')
      setMessage('Please enter a valid email address.')
      return
    }

    try {
      const stored = localStorage.getItem('waitlist')
      const list = stored ? JSON.parse(stored) : []
      list.push({
        email: trimmed,
        game: gameName,
        from: searchParams.from ?? '',
        createdAt: new Date().toISOString(),
      })
      localStorage.setItem('waitlist', JSON.stringify(list))
    } catch (error) {
      console.warn('Unable to write to localStorage', error)
    }

    setStatus('success')
    setMessage("Saved! We'll email you when it's live. Redirecting to home...")
  }

  return (
    <div className="comingSoonPage">
      <div className="comingSoonBackdrop" />

      <div className="comingSoonContainer">
        <div className="comingSoonNavBar">
          {navHtml ? (
            <div
              className="comingSoonNav"
              dangerouslySetInnerHTML={{ __html: navHtml }}
              suppressHydrationWarning
            />
          ) : (
            <div className="comingSoonBrand">
              <div className="comingSoonLogo">🎄</div>
              <span className="comingSoonBrandText">Christmas Games</span>
            </div>
          )}
        </div>

        <main className="comingSoonShell">
          <div className="comingSoonCard">
            <div className="comingSoonTag">Coming soon</div>
            <h1 className="comingSoonTitle">{gameName} is on the way</h1>
            <p className="comingSoonLead">
              Sorry, this page is still being built. Leave your email and we&apos;ll notify you the moment it goes live.
            </p>
            <div className="comingSoonMeta">
              <span className="comingSoonChip">{searchParams.from ?? 'Home game list'}</span>
            </div>

            <form className="comingSoonForm" onSubmit={onSubmit}>
              <label htmlFor="email" className="comingSoonLabel">
                Notify me at
              </label>
              <div className="comingSoonInputRow">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="comingSoonInput"
                  required
                />
                <button type="submit" className="comingSoonButton">
                  Save &amp; notify me
                </button>
              </div>
              {message ? (
                <p className={`comingSoonHint ${status === 'error' ? 'isError' : 'isSuccess'}`}>{message}</p>
              ) : null}
            </form>

            <div className="comingSoonFooter">
              <Link href="/" className="comingSoonBack">
                Back to home
              </Link>
            </div>
          </div>
        </main>

        {footerHtml ? (
          <div className="comingSoonFooterHolder">
            <div dangerouslySetInnerHTML={{ __html: footerHtml }} suppressHydrationWarning />
          </div>
        ) : null}
      </div>
    </div>
  )
}
