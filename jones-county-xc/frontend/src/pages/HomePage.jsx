import { Link } from 'react-router-dom'
import PaintingCard from '../components/PaintingCard'
import { getFeaturedPaintings } from '../data/paintings'

export default function HomePage() {
  const featured = getFeaturedPaintings()

  return (
    <div>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink-950 px-4 py-32 text-center text-white sm:py-40">
        <div className="absolute inset-0 bg-gradient-to-br from-ink-950 via-ink-900 to-ink-800" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,0,255,0.15),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(0,255,255,0.1),_transparent_60%)]" />

        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-neon-cyan text-glow-cyan">Original Art by Kat</p>
          <h1 className="font-heading text-5xl font-bold leading-tight text-rainbow sm:text-7xl">
            Paintingz By Kat
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lg text-ink-200">
            Nature, pop art, psychedelic, graphic, and custom animal portraits — each piece crafted with passion.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/gallery"
              className="rounded-lg bg-coral-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-coral-600 box-glow-pink"
            >
              View Gallery
            </Link>
            <Link
              to="/commission"
              className="rounded-lg border border-neon-cyan/50 px-6 py-3 text-sm font-semibold text-neon-cyan transition-all hover:bg-neon-cyan/10 hover:border-neon-cyan hover:shadow-[0_0_15px_rgba(0,255,255,0.2)]"
            >
              Request a Commission
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-heading text-2xl font-bold text-rainbow mb-8">Featured Work</h2>

        {featured.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((painting) => (
              <PaintingCard key={painting.ID} painting={painting} />
            ))}
          </div>
        )}

        {featured.length === 0 && (
          <p className="text-center text-ink-400 py-12">Featured paintings coming soon.</p>
        )}

        <div className="mt-10 text-center">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 rounded-lg bg-ink-800 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-ink-700 hover:shadow-[0_0_15px_rgba(255,16,240,0.2)]"
          >
            View All Paintings
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
