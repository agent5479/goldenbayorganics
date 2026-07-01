import './StatsStrip.css'

const stats = [
  { value: '6', label: 'Days open' },
  { value: '100%', label: 'Organic focus' },
  { value: '47', label: 'Commercial St' },
]

export function StatsStrip() {
  return (
    <section className="stats-strip" aria-label="Store highlights">
      <div className="stats-strip__inner">
        {stats.map((stat, i) => (
          <div key={stat.label} className="stats-strip__item">
            {i > 0 && <span className="stats-strip__sep" aria-hidden="true">·</span>}
            <span className="stats-strip__value">{stat.value}</span>
            <span className="stats-strip__label mono">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
