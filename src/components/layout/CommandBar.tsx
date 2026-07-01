import { NavLink } from 'react-router-dom'
import { business } from '../../data/business'
import { ScrollProgress } from './ScrollProgress'
import './CommandBar.css'

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/stocklist', label: 'Stocklist' },
  { to: '/visit', label: 'Visit' },
  { to: '/about', label: 'About' },
]

export function CommandBar() {
  return (
    <header className="command-bar">
      <div className="command-bar__inner">
        <NavLink to="/" className="command-bar__brand" end>
          <span className="command-bar__name">{business.name}</span>
        </NavLink>

        <nav className="command-bar__nav" aria-label="Main">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `command-bar__link${isActive ? ' command-bar__link--active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <ScrollProgress />
    </header>
  )
}
