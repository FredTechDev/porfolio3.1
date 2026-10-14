import react from '@vitejs/plugin-react'

/** `vite build --config vite.seo.config.js` — the SSR bundle the prerender step runs. */
export default {
  plugins: [react()],
  build: {
    ssr: 'src/prerender-entry.jsx',
    outDir: '.prerender',
    emptyOutDir: true,
    minify: false,
  },
}
