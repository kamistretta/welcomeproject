import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const STATUS_OPTIONS = ['new', 'in-progress', 'completed']

export default function AdminCommissionsPage() {
  const { user } = useAuth()
  const [commissions, setCommissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  function handleStatusChange(id, status) {
    fetch(`/api/commissions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    }).then((res) => {
      if (!res.ok) return
      setCommissions((prev) =>
        prev.map((c) => c.ID === id ? { ...c, Status: { String: status, Valid: true } } : c)
      )
    })
  }

  useEffect(() => {
    if (!user) return

    fetch('/api/commissions')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load commissions')
        return res.json()
      })
      .then((data) => setCommissions(data || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [user])

  if (!user) return <Navigate to="/login" replace />

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-rainbow">Commission Requests</h1>
        <p className="mt-2 text-ink-300">
          {commissions.length} request{commissions.length !== 1 ? 's' : ''} total
        </p>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-neon-pink border-t-transparent" />
          <span className="ml-3 text-ink-300">Loading requests...</span>
        </div>
      )}

      {error && (
        <div role="alert" className="rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3">
          <p className="text-sm font-medium text-red-400">{error}</p>
        </div>
      )}

      {!loading && !error && commissions.length === 0 && (
        <div className="rounded-2xl border border-ink-700 bg-ink-900 p-12 text-center">
          <p className="text-ink-300">No commission requests yet.</p>
        </div>
      )}

      {!loading && !error && commissions.length > 0 && (
        <div className="space-y-4">
          {commissions.map((c) => (
            <div key={c.ID} className="rounded-2xl border border-ink-700 bg-ink-900 p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-ink-50">{c.Name}</h2>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-300">
                    <a href={`mailto:${c.Email}`} className="text-neon-cyan hover:underline">{c.Email}</a>
                    {c.Phone?.Valid && c.Phone.String && (
                      <span>{c.Phone.String}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-neon-pink/10 px-3 py-1 text-xs font-semibold text-neon-pink">
                    {c.Style}
                  </span>
                  <select
                    value={c.Status?.String || 'new'}
                    onChange={(e) => handleStatusChange(c.ID, e.target.value)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-neon-pink/50 ${
                      c.Status?.String === 'completed' ? 'bg-neon-green/10 text-neon-green' :
                      c.Status?.String === 'in-progress' ? 'bg-neon-cyan/10 text-neon-cyan' :
                      'bg-neon-orange/10 text-neon-orange'
                    }`}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s} className="bg-ink-900 text-ink-50">{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-ink-950 p-4">
                <p className="text-sm font-semibold text-ink-200 mb-1">Description</p>
                <p className="text-sm text-ink-300 whitespace-pre-wrap">{c.Description}</p>
              </div>

              {c.SpecialRequests?.Valid && c.SpecialRequests.String && (
                <div className="mt-3 rounded-lg bg-ink-950 p-4">
                  <p className="text-sm font-semibold text-ink-200 mb-1">Special Requests</p>
                  <p className="text-sm text-ink-300 whitespace-pre-wrap">{c.SpecialRequests.String}</p>
                </div>
              )}

              <div className="mt-3 text-xs text-ink-500">
                Submitted {c.CreatedAt?.Valid ? new Date(c.CreatedAt.String).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }) : 'Unknown'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
