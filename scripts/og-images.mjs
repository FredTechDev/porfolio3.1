// Generates the branded 1200x630 social cards into public/og/.
//
// Run with: node scripts/og-images.mjs
// Rasterising needs a local Chrome, so the PNGs are committed rather than
// built — Vercel never has to produce them. Regenerate after changing any
// title, post, project or experiment.
import { execFileSync } from 'node:child_process'
import { mkdirSync, renameSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { posts, categories, postsInCategory } from '../src/data/blog.js'
import { projects } from '../src/data/projects.js'
import { labExperiments } from '../src/data/lab.js'
import { profile } from '../src/data/site.js'

const CHROME = process.env.CHROME || '/usr/bin/google-chrome'
const OUT = 'public/og'
const WORK = '.og-work'

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const sizeFor = (text) =>
  text.length <= 26 ? 78 : text.length <= 42 ? 64 : text.length <= 60 ? 54 : text.length <= 84 ? 46 : 38

function card({ kicker, title, sub }) {
  const px = sizeFor(title)
  // The home card is the name, so repeating it in the footer reads as a bug.
  const footName = title === profile.name ? null : profile.name
  const foot = [footName, sub].filter(Boolean).join('  ·  ')
  return `<!doctype html>
<html><head><meta charset="utf-8"><style>
  * { margin: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body {
    background:
      radial-gradient(1100px 620px at 88% -18%, rgba(90,169,255,.20), transparent 62%),
      linear-gradient(155deg, #070b14 0%, #0b1220 55%, #0e1626 100%);
    color: #e6ecf7;
    font: 400 16px/1.4 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    padding: 64px 72px;
    display: flex; flex-direction: column; justify-content: space-between;
    position: relative;
  }
  body::before {
    content: ""; position: absolute; inset: 0;
    background-image:
      linear-gradient(to right, rgba(30,42,68,.55) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(30,42,68,.55) 1px, transparent 1px);
    background-size: 56px 56px;
    mask-image: radial-gradient(900px 500px at 20% 20%, #000 20%, transparent 78%);
  }
  .kicker {
    font: 500 25px/1 ui-monospace, "SF Mono", Menlo, Consolas, monospace;
    letter-spacing: .18em; text-transform: uppercase; color: #82c0ff;
    position: relative;
  }
  h1 {
    position: relative; max-width: 1010px; letter-spacing: -.015em;
    /* Explicit size: the UA sheet sets h1 to 2em, which would double this. */
    font: 600 ${px}px/1.14 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  }
  .foot {
    display: flex; align-items: center; gap: 20px; position: relative;
    font: 500 27px/1.3 ui-monospace, "SF Mono", Menlo, Consolas, monospace;
    color: #9aa8c1;
  }
  .dot { width: 13px; height: 13px; border-radius: 50%; background: #4ade80; flex: none; }
  .sub { color: #9aa8c1; }
</style></head>
<body>
  <div class="kicker">${esc(kicker)}</div>
  <h1>${esc(title)}</h1>
  <div class="foot"><span class="dot"></span>${
    footName ? `<span>${esc(footName)}</span>` : ''
  }${sub ? `<span class="sub">${footName ? '· ' : ''}${esc(sub)}</span>` : ''}</div>
</body></html>`
}

const cards = [
  { file: 'home', kicker: 'Portfolio', title: profile.name, sub: 'Full-Stack · Backend · AI/ML' },
  { file: 'about', kicker: 'About', title: 'Who I am and what I build', sub: 'Nairobi, Kenya' },
  { file: 'projects', kicker: 'Portfolio', title: 'Projects', sub: 'Case studies with architecture and results' },
  { file: 'blog', kicker: 'Writing', title: 'Technical Blog', sub: 'AI engineering, RAG, PostgreSQL, architecture' },
  { file: 'lab', kicker: 'Experiments', title: 'Lab', sub: 'AI, IoT and data work with source code' },
  { file: 'services', kicker: 'Hire', title: 'Engineering Services', sub: 'AI and RAG systems, full-stack products, APIs' },
  { file: 'experience', kicker: 'Track record', title: 'Experience', sub: 'Cine Creatives · Apex · Kilele Archade' },
  { file: 'ai-engineering', kicker: 'Deep dive', title: 'AI & Engineering', sub: 'RAG, pgvector, LLM integration, fallback' },
  { file: 'contact', kicker: 'Get in touch', title: 'Contact', sub: 'Nairobi-based · remote worldwide' },
  ...categories.map((c) => ({
    file: `blog-category-${c.slug}`,
    kicker: 'Topic',
    title: c.name,
    sub: `${postsInCategory(c.slug).length} article${postsInCategory(c.slug).length === 1 ? '' : 's'}`,
  })),
  ...posts.map((p) => ({
    file: `blog-${p.slug}`,
    kicker: p.category,
    title: p.title.replace(/:.*$/, ''),
    sub: `${p.readingMinutes} min read`,
  })),
  ...projects
    .filter((p) => p.featured)
    .map((p) => ({
      file: `project-${p.slug}`,
      kicker: 'Case Study',
      title: p.name,
      sub: p.tags[0],
    })),
  ...labExperiments.map((x) => ({
    file: `lab-${x.slug}`,
    kicker: 'Lab Experiment',
    title: x.name,
    sub: x.stack.slice(0, 3).join(' · '),
  })),
]

rmSync(WORK, { recursive: true, force: true })
mkdirSync(OUT, { recursive: true })
mkdirSync(WORK, { recursive: true })

for (const c of cards) {
  const html = join(process.cwd(), WORK, `${c.file}.html`)
  const png = join(process.cwd(), OUT, `${c.file}.png`)
  writeFileSync(html, card(c))
  execFileSync(
    CHROME,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      '--window-size=1200,630',
      `--screenshot=${png}`,
      `file://${html}`,
    ],
    { stdio: 'pipe' },
  )
  // Chrome writes 24-bit PNGs; the cards are flat colour, so quantising to a
  // palette cuts them to roughly a third with no visible banding.
  const palette = join(process.cwd(), WORK, 'palette.png')
  execFileSync(
    'ffmpeg',
    [
      '-hide_banner', '-loglevel', 'error', '-y',
      '-i', png, '-vf', 'palettegen=stats_mode=full:max_colors=256', palette,
    ],
    { stdio: 'pipe' },
  )
  execFileSync(
    'ffmpeg',
    [
      '-hide_banner', '-loglevel', 'error', '-y',
      '-i', png, '-i', palette,
      '-lavfi', 'paletteuse=dither=bayer:bayer_scale=5',
      join(process.cwd(), WORK, 'out.png'),
    ],
    { stdio: 'pipe' },
  )
  renameSync(join(process.cwd(), WORK, 'out.png'), png)
  console.log('og:', c.file)
}

rmSync(WORK, { recursive: true, force: true })
console.log(`\n${cards.length} social cards written to ${OUT}/`)
