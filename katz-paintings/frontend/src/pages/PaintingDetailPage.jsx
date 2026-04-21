import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const STYLES = ['Nature', 'Pop Art', 'Trippy', 'Graphic', 'Animal Portrait']

export default function PaintingDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [painting, setPainting] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [editing, setEditing] = useState(false)
  const [editForm, setEditForm] = useState({})
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetch(`/api/paintings/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Painting not found')
        return res.json()
      })
      .then((data) => setPainting(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  function startEditing() {
    setEditForm({
      title: painting.Title,
      description: painting.Description?.String || '',
      style: painting.Style,
      medium: painting.Medium?.String || '',
      size: painting.Size?.String || '',
    })
    setEditing(true)
  }

  function handleSave() {
    setSaving(true)
    fetch(`/api/paintings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to update painting')
        return res.json()
      })
      .then(() => {
        setPainting((prev) => ({
          ...prev,
          Title: editForm.title,
          Description: { String: editForm.description, Valid: editForm.description !== '' },
          Style: editForm.style,
          Medium: { String: editForm.medium, Valid: editForm.medium !== '' },
          Size: { String: editForm.size, Valid: editForm.size !== '' },
        }))
        setEditing(false)
      })
      .catch((err) => alert(err.message))
      .finally(() => setSaving(false))
  }

  function handleDelete() {
    if (!window.confirm('Are you sure you want to delete this painting?')) return
    setDeleting(true)
    fetch(`/api/paintings/${id}`, { method: 'DELETE' })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to delete painting')
        navigate('/gallery')
      })
      .catch((err) => {
        alert(err.message)
        setDeleting(false)
      })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neon-pink border-t-transparent" />
        <span className="ml-3 text-ink-300">Loading painting...</span>
      </div>
    )
  }

  if (error || !painting) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-ink-50">Painting Not Found</h1>
        <p className="mt-2 text-ink-400">{error || "The painting you're looking for doesn't exist."}</p>
        <Link to="/gallery" className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-neon-cyan transition-colors hover:text-neon-cyan/80 text-glow-cyan">
          Back to Gallery
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Link to="/gallery" className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-neon-cyan transition-colors hover:text-neon-cyan/80 text-glow-cyan">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to Gallery
      </Link>

      <div className="mt-4 grid gap-8 lg:grid-cols-2">
        {/* Image */}
        <div className="overflow-hidden rounded-xl bg-ink-900 border border-ink-700">
          <img
            src={painting.ImageUrl}
            alt={painting.Title}
            className="h-full w-full object-contain"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          {editing ? (
            /* Edit Form */
            <div className="space-y-4">
              <div>
                <label htmlFor="edit-title" className="block text-sm font-medium text-ink-300 mb-1">Title</label>
                <input
                  id="edit-title"
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full rounded-lg border border-ink-600 bg-ink-800 px-3 py-2 text-ink-50 focus:border-neon-cyan focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="edit-description" className="block text-sm font-medium text-ink-300 mb-1">Description</label>
                <textarea
                  id="edit-description"
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  rows={3}
                  className="w-full rounded-lg border border-ink-600 bg-ink-800 px-3 py-2 text-ink-50 focus:border-neon-cyan focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="edit-style" className="block text-sm font-medium text-ink-300 mb-1">Style</label>
                <select
                  id="edit-style"
                  value={editForm.style}
                  onChange={(e) => setEditForm({ ...editForm, style: e.target.value })}
                  className="w-full rounded-lg border border-ink-600 bg-ink-800 px-3 py-2 text-ink-50 focus:border-neon-cyan focus:outline-none"
                >
                  {STYLES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="edit-medium" className="block text-sm font-medium text-ink-300 mb-1">Medium</label>
                <input
                  id="edit-medium"
                  type="text"
                  value={editForm.medium}
                  onChange={(e) => setEditForm({ ...editForm, medium: e.target.value })}
                  className="w-full rounded-lg border border-ink-600 bg-ink-800 px-3 py-2 text-ink-50 focus:border-neon-cyan focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="edit-size" className="block text-sm font-medium text-ink-300 mb-1">Size</label>
                <input
                  id="edit-size"
                  type="text"
                  value={editForm.size}
                  onChange={(e) => setEditForm({ ...editForm, size: e.target.value })}
                  className="w-full rounded-lg border border-ink-600 bg-ink-800 px-3 py-2 text-ink-50 focus:border-neon-cyan focus:outline-none"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="rounded-lg bg-coral-500 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-coral-600 disabled:opacity-50 box-glow-pink"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="rounded-lg border border-ink-600 px-5 py-2 text-sm font-semibold text-ink-200 transition-all hover:bg-ink-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            /* Display View */
            <>
              <span className="inline-block w-fit rounded-full border border-neon-cyan/30 bg-ink-800 px-3 py-1 text-xs font-semibold text-neon-cyan">
                {painting.Style}
              </span>
              <h1 className="mt-3 text-3xl font-bold text-rainbow sm:text-4xl">
                {painting.Title}
              </h1>

              {painting.Description?.Valid && (
                <p className="mt-4 text-ink-200 leading-relaxed">{painting.Description.String}</p>
              )}

              <div className="mt-6 space-y-3">
                {painting.Medium?.Valid && (
                  <div className="flex items-center gap-3 text-sm">
                    <span className="font-medium text-ink-300">Medium</span>
                    <span className="text-ink-100">{painting.Medium.String}</span>
                  </div>
                )}
                {painting.Size?.Valid && (
                  <div className="flex items-center gap-3 text-sm">
                    <span className="font-medium text-ink-300">Size</span>
                    <span className="text-ink-100">{painting.Size.String}</span>
                  </div>
                )}
              </div>

              <Link
                to="/commission"
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-lg bg-coral-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-coral-600 box-glow-pink"
              >
                Request a Commission
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>

              {user && (
                <div className="mt-6 flex gap-3 border-t border-ink-700 pt-6">
                  <button
                    onClick={startEditing}
                    className="rounded-lg border border-neon-cyan/50 px-5 py-2 text-sm font-semibold text-neon-cyan transition-all hover:bg-neon-cyan/10"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="rounded-lg border border-red-500/50 px-5 py-2 text-sm font-semibold text-red-400 transition-all hover:bg-red-500/10 disabled:opacity-50"
                  >
                    {deleting ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
