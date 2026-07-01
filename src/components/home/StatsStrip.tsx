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
        {stats.map((stat) => (
          <div key={stat.label} className="stats-strip__item">
            <span className="stats-strip__value">{stat.value}</span>
            <span className="stats-strip__label label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
