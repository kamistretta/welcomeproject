import { useParams, Link } from 'react-router-dom'
import { getPaintingById } from '../data/paintings'

export default function PaintingDetailPage() {
  const { id } = useParams()
  const painting = getPaintingById(id)

  if (!painting) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12 text-center">
        <h1 className="font-heading text-2xl font-bold text-ink-50">Painting Not Found</h1>
        <p className="mt-2 text-ink-400">The painting you're looking for doesn't exist.</p>
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
          <span className="inline-block w-fit rounded-full border border-neon-cyan/30 bg-ink-800 px-3 py-1 text-xs font-semibold text-neon-cyan">
            {painting.Style}
          </span>
          <h1 className="mt-3 font-heading text-3xl font-bold text-rainbow sm:text-4xl">
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
            {painting.Price?.Valid && (
              <div className="flex items-center gap-3 text-sm">
                <span className="font-medium text-ink-300">Price</span>
                <span className="text-lg font-bold text-neon-lime text-glow-lime">${painting.Price.String}</span>
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
        </div>
      </div>
    </div>
  )
}
