import { useState, useEffect } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AdminDashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) return
    fetch('/api/admin/stats')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load stats')
        return res.json()
      })
      .then((data) => setStats(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [user])

  if (!user) return <Navigate to="/login" replace />

  const statCards = stats ? [
    { label: 'Total Paintings', value: stats.paintings, color: 'text-neon-cyan', bg: 'bg-neon-cyan/10 border-neon-cyan/30' },
    { label: 'New Requests', value: stats.commissions.new, color: 'text-neon-orange', bg: 'bg-neon-orange/10 border-neon-orange/30' },
    { label: 'In Progress', value: stats.commissions['in-progress'], color: 'text-neon-pink', bg: 'bg-neon-pink/10 border-neon-pink/30' },
    { label: 'Completed', value: stats.commissions.completed, color: 'text-neon-green', bg: 'bg-neon-green/10 border-neon-green/30' },
  ] : []

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-rainbow">Admin Dashboard</h1>
        <p className="mt-2 text-ink-300">Welcome back, {user.username}.</p>
      </div>

      {loading && (
        <div role="status" aria-label="Loading stats" className="flex items-center gap-3 text-ink-300">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-neon-pink border-t-transparent" aria-hidden="true" />
          Loading stats...
        </div>
      )}

      {error && (
        <div role="alert" className="rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {stats && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
            {statCards.map((card) => (
              <div key={card.label} className={`rounded-2xl border ${card.bg} p-6`}>
                <p className="text-sm font-medium text-ink-300">{card.label}</p>
                <p className={`mt-2 text-4xl font-bold ${card.color}`}>{card.value}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              to="/admin/add-painting"
              className="flex items-center gap-4 rounded-2xl border border-ink-700 bg-ink-900 p-6 transition-all hover:border-neon-cyan/50 hover:bg-ink-800"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neon-cyan/10">
                <svg className="h-6 w-6 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-ink-50">Add Painting</p>
                <p className="text-sm text-ink-400">Upload new artwork to the gallery</p>
              </div>
            </Link>

            <Link
              to="/admin/commissions"
              className="flex items-center gap-4 rounded-2xl border border-ink-700 bg-ink-900 p-6 transition-all hover:border-neon-pink/50 hover:bg-ink-800"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neon-pink/10">
                <svg className="h-6 w-6 text-neon-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-ink-50">Commission Requests</p>
                <p className="text-sm text-ink-400">
                  {stats.commissions.new > 0
                    ? `${stats.commissions.new} new request${stats.commissions.new !== 1 ? 's' : ''} waiting`
                    : 'View and manage requests'}
                </p>
              </div>
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
