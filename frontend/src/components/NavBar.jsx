import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

function NavBar() {
  const [online, setOnline] = useState(null)

  useEffect(() => {
    let cancelled = false

    fetch(`${API_BASE_URL}/health`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setOnline(data.status === 'ok')
      })
      .catch(() => {
        if (!cancelled) setOnline(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <nav className="nav-bar">
      <div className="nav-bar__logo">MediSync</div>
      <div className="nav-bar__links">
        <NavLink to="/" end className="nav-bar__link">
          Home
        </NavLink>
        <NavLink to="/results" className="nav-bar__link">
          Results
        </NavLink>
        <div className={`nav-bar__status nav-bar__status--${online ? 'online' : 'offline'}`}>
          <span className="nav-bar__status-dot" />
          {online ? 'AI online' : 'AI offline'}
        </div>
      </div>
    </nav>
  )
}

export default NavBar
