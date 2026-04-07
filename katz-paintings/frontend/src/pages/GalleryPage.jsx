import { useState, useEffect } from 'react'
import PaintingCard from '../components/PaintingCard'

const STYLES = ['All', 'Nature', 'Pop Art', 'Trippy', 'Graphic', 'Animal Portrait']

export default function GalleryPage() {
  const [activeStyle, setActiveStyle] = useState('All')
  const [paintings, setPaintings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')

    const url = activeStyle === 'All'
      ? '/api/paintings'
      : `/api/paintings?style=${encodeURIComponent(activeStyle)}`

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load paintings')
        return res.json()
      })
      .then((data) => setPaintings(data || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [activeStyle])

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-rainbow">Gallery</h1>
        <p className="mt-2 text-ink-300">Browse all paintings or filter by style.</p>
      </div>

      {/* Style filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        {STYLES.map((style) => (
          <button
            key={style}
            onClick={() => setActiveStyle(style)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              activeStyle === style
                ? 'bg-coral-500 text-white box-glow-pink'
                : 'bg-ink-800 text-ink-200 hover:text-neon-cyan hover:bg-ink-700'
            }`}
          >
            {style}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-neon-pink border-t-transparent" />
          <span className="ml-3 text-ink-300">Loading paintings...</span>
        </div>
      )}

      {error && (
        <div role="alert" className="rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3">
          <p className="text-sm font-medium text-red-400">{error}</p>
        </div>
      )}

      {!loading && !error && paintings.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paintings.map((painting) => (
            <PaintingCard key={painting.ID} painting={painting} />
          ))}
        </div>
      )}

      {!loading && !error && paintings.length === 0 && (
        <p className="py-12 text-center text-ink-400">
          {activeStyle === 'All'
            ? 'No paintings in the gallery yet.'
            : `No ${activeStyle} paintings yet.`}
        </p>
      )}
    </div>
  )
}
