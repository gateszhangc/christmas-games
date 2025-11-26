'use client'

import Link from 'next/link'
import { FormEvent, useEffect, useMemo, useState } from 'react'

type ComingSoonPageProps = {
  searchParams: {
    game?: string
    from?: string
  }
}

const prettifyGameName = (raw?: string) => {
  if (!raw) return '游戏'
  return raw
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^\w|\s\w/g, (char) => char.toUpperCase())
}

export default function ComingSoonPage({ searchParams }: ComingSoonPageProps) {
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
      setMessage('请输入有效的邮箱地址')
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
      console.warn('无法写入本地存储', error)
    }

    setStatus('success')
    setMessage('邮箱已保存，我们会第一时间通知你！即将返回首页...')
  }

  return (
    <div className="comingSoonShell">
      <div className="comingSoonBackdrop" />
      <div className="comingSoonCard">
        <div className="comingSoonTag">开发中</div>
        <h1 className="comingSoonTitle">《{gameName}》即将上线</h1>
        <p className="comingSoonLead">
          抱歉，当前游戏页面正在开发中。留下你的邮箱，等上线后我们会立刻通知你。
        </p>

        <form className="comingSoonForm" onSubmit={onSubmit}>
          <label htmlFor="email" className="comingSoonLabel">
            通知邮箱
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
              保存并通知我
            </button>
          </div>
          {message ? (
            <p className={`comingSoonHint ${status === 'error' ? 'isError' : 'isSuccess'}`}>
              {message}
            </p>
          ) : null}
        </form>

        <div className="comingSoonFooter">
          <span className="comingSoonFrom">来源：{searchParams.from ?? '首页游戏列表'}</span>
          <Link href="/" className="comingSoonBack">
            返回首页
          </Link>
        </div>
      </div>
    </div>
  )
}
