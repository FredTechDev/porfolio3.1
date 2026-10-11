import { useEffect } from 'react'
import { SITE_URL } from '../data/site.js'

function setMeta(attr, name, content) {
  let el = document.head.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * Per-page SEO: unique title, description, canonical, Open Graph and
 * optional structured data. `path` is the route path (e.g. "/projects/apex").
 */
export function usePageSeo({ title, description, path = '/', jsonLd }) {
  const ldKey = jsonLd ? JSON.stringify(jsonLd) : ''

  useEffect(() => {
    const url = `${SITE_URL}${path === '/' ? '/' : path}`
    document.title = title
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url

    let ld = document.head.querySelector('script[data-page-jsonld]')
    if (ldKey) {
      if (!ld) {
        ld = document.createElement('script')
        ld.type = 'application/ld+json'
        ld.dataset.pageJsonld = 'true'
        document.head.appendChild(ld)
      }
      ld.textContent = ldKey
    } else if (ld) {
      ld.remove()
    }

    return () => {
      if (ld) ld.remove()
    }
  }, [title, description, path, ldKey])
}
