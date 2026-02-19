import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { user, login, logout } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (username === 'TestUser' && password === '12345') {
      login(username)
      navigate('/')
    } else {
      setError('Invalid username or password.')
    }
  }

  if (user) {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <div className="rounded-2xl border border-purple-100 bg-white p-8 shadow-lg text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
            <svg className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="font-heading text-2xl font-bold uppercase tracking-wide text-purple-900">Welcome, {user.username}!</h1>
          <p className="mt-2 text-sm text-gray-500">You are logged in.</p>
          <button
            onClick={() => logout()}
            className="mt-6 rounded-lg bg-purple-700 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400/30"
          >
            Log Out
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-2xl border border-purple-100 bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-100">
            <svg className="h-7 w-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <h1 className="font-heading text-2xl font-bold uppercase tracking-wide text-purple-900">Coach Login</h1>
          <p className="mt-1 text-sm text-gray-500">Sign in to manage your team</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-purple-900 mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="block w-full rounded-lg border border-purple-200 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-purple-900 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="block w-full rounded-lg border border-purple-200 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div role="alert" className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
              <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <p className="text-sm font-medium text-red-700">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-purple-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400/30"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
