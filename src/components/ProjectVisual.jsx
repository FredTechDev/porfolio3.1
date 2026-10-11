// Abstract SVG stand-ins for project screenshots.
// TODO: replace with real product screenshots (public/images/*) when available.

const palettes = {
  edu: { bg: '#0c1a2e', glow: '#5aa9ff', bar: '#22375c', pill: '#16b8a6' },
  prop: { bg: '#101c18', glow: '#4ade80', bar: '#1d3a2a', pill: '#5aa9ff' },
  med: { bg: '#161426', glow: '#a78bfa', bar: '#2c2850', pill: '#f472b6' },
  generic: { bg: '#101624', glow: '#5aa9ff', bar: '#22304d', pill: '#94a3b8' },
}

export default function ProjectVisual({ kind = 'generic', label = '', alt }) {
  const c = palettes[kind] ?? palettes.generic
  return (
    <svg
      className="project-card-visual"
      viewBox="0 0 640 360"
      role="img"
      aria-label={alt || `${label} interface preview (placeholder artwork)`}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="640" height="360" fill={c.bg} />
      <circle cx="540" cy="60" r="180" fill={c.glow} opacity="0.12" />

      {/* window chrome */}
      <rect x="40" y="36" width="560" height="288" rx="14" fill="#0a0f1a" stroke={c.bar} />
      <rect x="40" y="36" width="560" height="34" rx="14" fill="#0a0f1a" />
      <circle cx="62" cy="53" r="5" fill={c.glow} opacity="0.9" />
      <circle cx="78" cy="53" r="5" fill={c.pill} opacity="0.7" />
      <circle cx="94" cy="53" r="5" fill={c.bar} />

      {/* sidebar */}
      <rect x="56" y="84" width="120" height="10" rx="5" fill={c.bar} />
      <rect x="56" y="104" width="96" height="8" rx="4" fill={c.bar} opacity="0.7" />
      <rect x="56" y="120" width="108" height="8" rx="4" fill={c.bar} opacity="0.7" />
      <rect x="56" y="136" width="84" height="8" rx="4" fill={c.bar} opacity="0.7" />
      <rect x="56" y="152" width="100" height="8" rx="4" fill={c.bar} opacity="0.7" />

      {/* content blocks */}
      <rect x="196" y="84" width="200" height="14" rx="7" fill={c.glow} opacity="0.85" />
      <rect x="196" y="110" width="380" height="8" rx="4" fill={c.bar} />
      <rect x="196" y="124" width="340" height="8" rx="4" fill={c.bar} />

      <rect x="196" y="150" width="176" height="72" rx="10" fill={c.bar} opacity="0.55" />
      <rect x="384" y="150" width="176" height="72" rx="10" fill={c.bar} opacity="0.55" />
      <rect x="212" y="166" width="70" height="8" rx="4" fill={c.pill} />
      <rect x="400" y="166" width="70" height="8" rx="4" fill={c.glow} />
      <rect x="212" y="196" width="120" height="12" rx="6" fill={c.glow} opacity="0.8" />
      <rect x="400" y="196" width="120" height="12" rx="6" fill={c.pill} opacity="0.8" />

      <rect x="196" y="240" width="364" height="10" rx="5" fill={c.bar} />
      <rect x="196" y="258" width="300" height="10" rx="5" fill={c.bar} opacity="0.7" />
      <rect x="196" y="284" width="120" height="26" rx="8" fill={c.glow} opacity="0.85" />

      {label && (
        <text
          x="56"
          y="312"
          fill={c.glow}
          fontFamily="ui-monospace, monospace"
          fontSize="13"
          opacity="0.9"
        >
          {label}
        </text>
      )}
    </svg>
  )
}
