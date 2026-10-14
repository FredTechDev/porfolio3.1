import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { allSeoPaths, sitemapPaths } from '../src/seo/routes.js'
import { urlFor, headToHtml } from '../src/seo/head.js'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const dist = join(root, 'dist')

const { renderRoute } = await import(pathToFileURL(join(root, '.prerender', 'prerender-entry.js')).href)

// index.html brackets the page-specific head tags; Vite keeps everything else
// (charset, favicons, the module and stylesheet tags) outside those markers.
const HEAD_START = '<!--seo-head:start-->'
const HEAD_END = '<!--seo-head:end-->'
const ROOT_MARK = '<div id="root"></div>'
const NOT_FOUND_SAMPLE = '/no-such-page-for-the-404-template'

const esc = (v) => String(v).replace(/&/g, '&amp;')

function buildSitemap() {
  const urls = sitemapPaths()
    .map(({ path, lastmod }) => `    <url><loc>${esc(urlFor(path))}</loc><lastmod>${lastmod}</lastmod></url>`)
    .join('\n')
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
    '',
  ].join('\n')
}

const shell = await readFile(join(dist, 'index.html'), 'utf8')
for (const marker of [HEAD_START, HEAD_END, ROOT_MARK]) {
  if (!shell.includes(marker)) throw new Error(`Prerender: ${marker} missing from dist/index.html`)
}
const [before, headRegion] = shell.split(HEAD_START)
const [, tail] = headRegion.split(HEAD_END)

function outFileFor(path) {
  if (path === NOT_FOUND_SAMPLE) return '404.html'
  if (path === '/') return 'index.html'
  return join(path.slice(1), 'index.html')
}

let routes = 0
for (const path of [...allSeoPaths(), NOT_FOUND_SAMPLE]) {
  const { html, head } = renderRoute(path)
  const page =
    before + HEAD_START + '\n    ' + headToHtml(head) + '\n    ' + HEAD_END +
    tail.replace(ROOT_MARK, `<div id="root">${html}</div>`)

  const target = join(dist, outFileFor(path))
  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, page)
  routes += 1
}

await writeFile(join(dist, 'sitemap.xml'), buildSitemap())
await rm(join(root, '.prerender'), { recursive: true, force: true })

console.log(
  `prerender: ${routes - 1} routes, 404.html and sitemap.xml (${sitemapPaths().length} URLs)`,
)
