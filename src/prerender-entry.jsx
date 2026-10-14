import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App.jsx'
import { getSeo } from './seo/routes.js'
import { buildHead } from './seo/head.js'

/**
 * Render one route to HTML for the prerender build. Effects do not run here,
 * so the head payload is taken from the same `getSeo` table the client hook
 * uses rather than from DOM writes.
 */
export function renderRoute(path) {
  return {
    html: renderToString(
      <StaticRouter location={path}>
        <App />
      </StaticRouter>,
    ),
    head: buildHead(getSeo(path)),
  }
}
