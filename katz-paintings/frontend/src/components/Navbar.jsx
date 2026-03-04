import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/', label: 'Home' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/commission', label: 'Commission' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const linkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'text-neon-cyan text-glow-cyan'
        : 'text-ink-200 hover:text-neon-pink hover:bg-ink-800/50'
    }`

  const handleLogout = () => {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-neon-pink/30 bg-gradient-to-r from-ink-950 via-ink-900 to-ink-950 shadow-lg backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <NavLink to="/" className="font-heading text-xl font-bold tracking-wide text-rainbow transition-colors">
            Paintingz By Kat
          </NavLink>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === '/'} className={linkClass}>
                {link.label}
              </NavLink>
            ))}
            {user ? (
              <div className="ml-2 flex items-center gap-2 border-l border-ink-700/50 pl-3">
                <span className="text-sm font-medium text-neon-pink">{user.username}</span>
                <button
                  onClick={handleLogout}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-ink-300 transition-all duration-200 hover:bg-ink-800/50 hover:text-white"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <NavLink to="/login" className={linkClass}>
                Log In
              </NavLink>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-ink-300 transition-colors hover:bg-ink-800/50 hover:text-neon-cyan md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
            menuOpen ? 'max-h-80 pb-3 opacity-100' : 'max-h-0 opacity-0 invisible'
          }`}
        >
          <div className="space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={linkClass}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            {user ? (
              <>
                <div className="mx-3 my-2 border-t border-ink-700/50" />
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-sm font-medium text-neon-pink">{user.username}</span>
                  <button
                    onClick={handleLogout}
                    className="rounded-lg px-3 py-1.5 text-sm font-medium text-ink-300 transition-colors hover:bg-ink-800/50 hover:text-white"
                  >
                    Log Out
                  </button>
                </div>
              </>
            ) : (
              <NavLink
                to="/login"
                className={linkClass}
                onClick={() => setMenuOpen(false)}
              >
                Log In
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
