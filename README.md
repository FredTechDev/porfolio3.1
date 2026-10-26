# Fredrick Onyango — Portfolio

Personal portfolio site: full-stack development, backend engineering, AI/ML,
system architecture — showcasing **Kilele Archade** and **Apex** with full case
studies, a technical blog, an experiments lab and clean redirect routes.

Built with **Vite + React + React Router**, hand-written CSS design system
(no UI framework), system fonts, minimal JavaScript.

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # client build + prerender → dist/
npm run preview  # serve the production build
```

Every route is prerendered to real HTML at build (`dist/<route>/index.html`),
so crawlers and link previews see each page's own title, description, Open
Graph tags and JSON-LD without executing JavaScript. Client navigation still
behaves like an SPA.

## Structure

```text
src/data/site.js        identity, links, skills, experience, achievements
src/data/projects.js    featured projects + full case-study content
src/data/lab.js         The Lab experiments
src/data/blog.js        blog posts
src/sections/*.jsx      homepage sections (hero → contact, spec order)
src/pages/*.jsx         routed pages incl. case studies, blog, redirects
src/seo/routes.js       every page's title, description and structured data
src/seo/head.js         turns that into meta/link tags + JSON-LD (shared by
                        the client hook and the prerender build)
scripts/prerender.mjs   renders each route into dist/ and writes sitemap.xml
public/                 favicon, robots.txt, llms.txt, og-cover.png, CV PDF
```

`index.html` brackets its page-specific tags between `<!--seo-head:start-->`
and `<!--seo-head:end-->`; the prerender build replaces that block per route.

Routes: `/ · /about · /experience · /contact · /projects · /projects/:slug ·
/blog · /blog/:slug · /github · /linkedin · /instagram · /facebook · /cv ·
/kilelearchade · /apex`

## Before launch — replace every TODO

Search the repo for `TODO`. In particular:

- [ ] Real GitHub / LinkedIn / email in `src/data/site.js`
- [ ] Real repository URLs for projects and lab experiments
- [ ] Apex live URL (or keep it unset until launch)
- [ ] Final domain: `src/data/site.js` (`SITE_URL`) feeds the head tags,
      structured data and the generated sitemap; `public/robots.txt` and
      `public/llms.txt` still name it by hand
- [ ] Real CV → replace `public/Fredrick-Onyango-CV.pdf`
- [ ] Real project screenshots → replace `ProjectVisual` placeholders
      (`public/images/`)
- [ ] Verify all dates in Experience; only genuine achievements
- [ ] Review blog drafts — publish only what is genuinely yours
- [ ] `og-cover.png` is a plain gradient; replace with a designed cover

## Security notes

- No secrets, env vars or private infrastructure anywhere in this repo.
- Admin dashboards (Apex etc.) are intentionally not linked or redirected to.
- Contact form is client-side (opens email) with a honeypot; if you add a
  backend endpoint later, rate-limit it server-side.
