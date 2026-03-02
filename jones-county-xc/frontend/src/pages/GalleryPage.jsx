import { useState } from 'react'
import PaintingCard from '../components/PaintingCard'
import { getPaintingsByStyle } from '../data/paintings'

const STYLES = ['All', 'Nature', 'Pop Art', 'Trippy', 'Graphic', 'Animal Portrait']

export default function GalleryPage() {
  const [activeStyle, setActiveStyle] = useState('All')

  const paintings = getPaintingsByStyle(activeStyle)

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-rainbow">Gallery</h1>
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

      {paintings.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paintings.map((painting) => (
            <PaintingCard key={painting.ID} painting={painting} />
          ))}
        </div>
      )}

      {paintings.length === 0 && (
        <p className="py-12 text-center text-ink-400">
          {activeStyle === 'All'
            ? 'No paintings in the gallery yet.'
            : `No ${activeStyle} paintings yet.`}
        </p>
      )}
    </div>
  )
}
