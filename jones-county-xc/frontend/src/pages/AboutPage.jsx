import { Link } from 'react-router-dom'

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-rainbow">About the Artist</h1>
      </div>

      <div className="rounded-2xl border border-ink-700 bg-ink-900 p-6 shadow-sm sm:p-8">
        <h2 className="font-heading text-2xl font-semibold text-ink-50">Hi, I'm Kat!</h2>

        <div className="mt-4 space-y-4 text-ink-200 leading-relaxed">
          <p>
            I'm a painter who works across a range of styles — from peaceful nature scenes to bold pop art, psychedelic pieces, graphic work, and custom animal portraits.
          </p>
          <p>
            Every painting starts with a connection to the subject. Whether it's capturing the personality of someone's pet or exploring color and texture in an abstract piece, I pour myself into each canvas.
          </p>
          <p>
            If you're interested in a custom piece, I'd love to hear from you. Head over to my commission page and tell me what you have in mind!
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="https://instagram.com/paintingsbykat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-neon-cyan/50 bg-transparent px-5 py-2.5 text-sm font-semibold text-neon-cyan transition-all hover:bg-neon-cyan/10 hover:border-neon-cyan hover:shadow-[0_0_15px_rgba(0,255,255,0.2)]"
          >
            Follow @paintingsbykat
          </a>
          <Link
            to="/commission"
            className="inline-flex items-center gap-2 rounded-lg bg-coral-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-coral-600 box-glow-pink"
          >
            Request a Commission
          </Link>
        </div>
      </div>
    </div>
  )
}
