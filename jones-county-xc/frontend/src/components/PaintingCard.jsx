import { Link } from 'react-router-dom'

export default function PaintingCard({ painting }) {
  return (
    <Link
      to={`/gallery/${painting.ID}`}
      className="group block overflow-hidden rounded-xl border border-ink-700 bg-ink-900 shadow-sm transition-all duration-200 hover:border-neon-pink hover:shadow-[0_0_20px_rgba(255,16,240,0.3)] hover:-translate-y-1"
    >
      <div className="aspect-square overflow-hidden bg-ink-800">
        <img
          src={painting.ImageUrl}
          alt={painting.Title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-heading text-lg font-semibold text-ink-50 group-hover:text-rainbow">{painting.Title}</h3>
        <p className="mt-1 text-sm text-neon-cyan">{painting.Style}</p>
        {painting.Price?.Valid && (
          <p className="mt-2 text-sm font-semibold text-neon-lime text-glow-lime">${painting.Price.String}</p>
        )}
      </div>
    </Link>
  )
}
