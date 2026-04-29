import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const STYLES = ['Nature', 'Pop Art', 'Trippy', 'Graphic', 'Animal Portrait']

const inputClass = 'block w-full rounded-lg border border-ink-700 bg-ink-950 px-3 py-2.5 text-sm text-ink-50 shadow-sm transition-colors placeholder:text-ink-500 focus:border-neon-pink focus:outline-none focus:ring-2 focus:ring-neon-pink/50'

export default function AddPaintingPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [form, setForm] = useState({ title: '', style: '', description: '', medium: '', size: '', featured: false })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  if (!user) return <Navigate to="/login" replace />

  function handleFileChange(e) {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!imageFile) {
      setError('Please select an image.')
      return
    }
    setError('')
    setSubmitting(true)

    try {
      // Upload image first
      const formData = new FormData()
      formData.append('file', imageFile)
      const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData })
      if (!uploadRes.ok) throw new Error('Image upload failed')
      const { url } = await uploadRes.json()

      // Create painting with uploaded image URL
      const paintingRes = await fetch('/api/paintings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          style: form.style,
          description: form.description,
          medium: form.medium,
          size: form.size,
          image_url: url,
          featured: form.featured,
        }),
      })
      if (!paintingRes.ok) throw new Error('Failed to create painting')
      const { id } = await paintingRes.json()
      navigate(`/gallery/${id}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-rainbow">Add Painting</h1>
        <p className="mt-2 text-ink-300">Upload a new painting to your gallery.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-ink-700 bg-ink-900 p-6 shadow-sm sm:p-8">

        {/* Image upload */}
        <div>
          <label htmlFor="image" className="block text-sm font-semibold text-ink-100 mb-1.5">Painting Image *</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="block w-full text-sm text-ink-300 file:mr-4 file:rounded-lg file:border-0 file:bg-ink-800 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-neon-cyan hover:file:bg-ink-700 cursor-pointer"
          />
          {imagePreview && (
            <div className="mt-4 overflow-hidden rounded-xl border border-ink-700 bg-ink-800">
              <img src={imagePreview} alt="Preview" className="max-h-64 w-full object-contain" />
            </div>
          )}
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-ink-100 mb-1.5">Title *</label>
          <input
            id="title"
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className={inputClass}
            placeholder="Painting title"
          />
        </div>

        {/* Style */}
        <div>
          <label htmlFor="style" className="block text-sm font-semibold text-ink-100 mb-1.5">Style *</label>
          <select
            id="style"
            required
            value={form.style}
            onChange={(e) => setForm({ ...form, style: e.target.value })}
            className={inputClass}
          >
            <option value="">-- Select a style --</option>
            {STYLES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-ink-100 mb-1.5">Description</label>
          <textarea
            id="description"
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className={inputClass}
            placeholder="Describe this painting..."
          />
        </div>

        {/* Medium + Size */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="medium" className="block text-sm font-semibold text-ink-100 mb-1.5">Medium</label>
            <input
              id="medium"
              type="text"
              value={form.medium}
              onChange={(e) => setForm({ ...form, medium: e.target.value })}
              className={inputClass}
              placeholder="e.g. Acrylic on Canvas"
            />
          </div>
          <div>
            <label htmlFor="size" className="block text-sm font-semibold text-ink-100 mb-1.5">Size</label>
            <input
              id="size"
              type="text"
              value={form.size}
              onChange={(e) => setForm({ ...form, size: e.target.value })}
              className={inputClass}
              placeholder="e.g. 24x36"
            />
          </div>
        </div>

        {/* Featured toggle */}
        <div className="flex items-center gap-3">
          <input
            id="featured"
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            className="h-4 w-4 rounded border-ink-600 bg-ink-800 accent-neon-pink"
          />
          <label htmlFor="featured" className="text-sm font-semibold text-ink-100">Feature on homepage</label>
        </div>

        {error && (
          <div role="alert" className="rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3">
            <p className="text-sm font-medium text-red-400">{error}</p>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-coral-500 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-coral-600 box-glow-pink focus:outline-none focus:ring-2 focus:ring-neon-pink/50 disabled:opacity-50"
          >
            {submitting ? 'Uploading...' : 'Add Painting'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/gallery')}
            className="rounded-lg border border-ink-600 px-6 py-2.5 text-sm font-semibold text-ink-200 transition-all hover:bg-ink-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
