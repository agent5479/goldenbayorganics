import { specials } from '../../lib/stock'
import './RecentUpdates.css'

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-NZ', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function RecentUpdates() {
  const recent = [...specials]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 6)

  return (
    <section className="section section--alt">
      <div className="section__inner">
        <p className="section__label mono">Fresh signal · Store updates</p>
        <h2>Recent specials & news</h2>
        <ol className="recent-list">
          {recent.map((item, i) => (
            <li key={item.id} className="recent-list__item">
              <span className="recent-list__index mono">{String(i + 1).padStart(2, '0')}</span>
              <div className="recent-list__body">
                <span className="recent-list__title">{item.title}</span>
                <span className="recent-list__date mono">{formatDate(item.date)}</span>
              </div>
              <span className="recent-list__kind mono">Update</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
