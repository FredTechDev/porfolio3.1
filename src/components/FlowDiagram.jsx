export default function FlowDiagram({ title, steps }) {
  return (
    <div className="diagram-card">
      {title && <p className="diagram-title">{title}</p>}
      <ol className="flow" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {steps.map((s, i) => (
          <li className="flow-step" key={i}>
            <span className="flow-marker" aria-hidden="true">
              <span className="flow-dot" />
              {i < steps.length - 1 && <span className="flow-line" />}
            </span>
            <span className="flow-label">
              {typeof s === 'string' ? s : s.label}
              {typeof s !== 'string' && s.note && <small>{s.note}</small>}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
