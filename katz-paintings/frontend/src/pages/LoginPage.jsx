import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const inputClass = 'block w-full rounded-lg border border-ink-700 bg-ink-950 px-3 py-2.5 text-sm text-ink-50 shadow-sm transition-colors placeholder:text-ink-500 focus:border-neon-pink focus:outline-none focus:ring-2 focus:ring-neon-pink/50'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { user, login, logout } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (username === 'KatMistretta' && password === 'deal!65N') {
      login(username)
      navigate('/admin')
    } else {
      setError('Invalid username or password.')
    }
  }

  if (user) {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <div className="rounded-2xl border border-ink-700 bg-ink-900 p-8 shadow-lg text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-neon-green/10">
            <svg className="h-7 w-7 text-neon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-rainbow">Welcome, {user.username}!</h1>
          <p className="mt-2 text-sm text-ink-300">You are logged in.</p>
          <button
            onClick={() => logout()}
            className="mt-6 rounded-lg bg-ink-800 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-ink-700 hover:shadow-[0_0_15px_rgba(255,16,240,0.2)] focus:outline-none focus:ring-2 focus:ring-neon-pink/50"
          >
            Log Out
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-2xl border border-ink-700 bg-ink-900 p-8 shadow-lg">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-neon-cyan/10">
            <svg className="h-7 w-7 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-rainbow">Log In</h1>
          <p className="mt-1 text-sm text-ink-300">Sign in to manage your portfolio</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-ink-100 mb-2">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className={inputClass}
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-ink-100 mb-2">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className={inputClass}
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div role="alert" className="flex items-start gap-3 rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3">
              <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <p className="text-sm font-medium text-red-400">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-coral-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-coral-600 box-glow-pink focus:outline-none focus:ring-2 focus:ring-neon-pink/50"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
