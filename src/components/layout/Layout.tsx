import { Outlet } from 'react-router-dom'
import { CommandBar } from './CommandBar'
import { Footer } from './Footer'

export function Layout() {
  return (
    <>
      <CommandBar />
      <div className="page-main">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
