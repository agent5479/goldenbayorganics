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
    <section className="section">
      <div className="section__inner">
        <p className="section__label label">Latest from the shop</p>
        <h2>Recent specials & news</h2>
        <ul className="recent-list">
          {recent.map((item) => (
            <li key={item.id} className="recent-list__item">
              <time className="recent-list__date" dateTime={item.date}>
                {formatDate(item.date)}
              </time>
              <div className="recent-list__body">
                <span className="recent-list__title">{item.title}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
