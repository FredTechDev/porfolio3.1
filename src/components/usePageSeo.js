import { useEffect } from 'react'
import { buildHead } from '../seo/head.js'

function setMeta(attr, name, content) {
  let el = document.head.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

// Some rels legitimately repeat with different hrefs (preconnect); others are
// singletons that must be updated in place across navigation (canonical, the
// RSS alternate). Matching preconnect on rel+href keeps all four, while the
// singleton path avoids leaving a stale canonical behind.
const REPEATABLE = new Set(['preconnect', 'preload', 'dns-prefetch', 'modulepreload', 'me'])

function setLink(link) {
  const base = `link[rel="${link.rel}"]`
  const selector = REPEATABLE.has(link.rel) ? `${base}[href="${link.href}"]` : base
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('link')
    document.head.appendChild(el)
  }
  for (const [key, value] of Object.entries(link)) el.setAttribute(key, value)
}

/**
 * Applies the same head payload the prerender build writes into static HTML,
 * so client navigation and crawler-visible HTML never disagree.
 */
export function usePageSeo(opts) {
  const head = buildHead(opts)
  const key = JSON.stringify(head)

  useEffect(() => {
    document.title = head.title
    for (const { name, property, content } of head.metas) {
      setMeta(name ? 'name' : 'property', name || property, content)
    }
    // Drop image preloads left over from a previous route (only the home page
    // preloads its hero), so navigating away doesn't leave a stale fetch hint.
    const keepPreloads = new Set(head.links.filter((l) => l.rel === 'preload').map((l) => l.href))
    document.head
      .querySelectorAll('link[rel="preload"][as="image"]')
      .forEach((el) => !keepPreloads.has(el.getAttribute('href')) && el.remove())
    for (const link of head.links) setLink(link)
    document.head.querySelectorAll('meta[http-equiv="refresh"]').forEach((el) => el.remove())
    if (head.metaRefresh) {
      const el = document.createElement('meta')
      el.httpEquiv = 'refresh'
      el.content = head.metaRefresh
      document.head.appendChild(el)
    }

    const scripts = head.jsonLd.map((schema) => {
      const el = document.createElement('script')
      el.type = 'application/ld+json'
      el.dataset.pageJsonld = 'true'
      el.textContent = JSON.stringify(schema)
      document.head.appendChild(el)
      return el
    })

    return () => scripts.forEach((el) => el.remove())
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `key` is the structural fingerprint of `head`
  }, [key])
}
