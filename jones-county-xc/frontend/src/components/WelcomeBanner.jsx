export default function WelcomeBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-purple-950 px-4 py-32 text-center text-white sm:py-40 lg:py-48">
      {/* Full gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-purple-900 to-purple-800" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(196,155,56,0.15),_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(126,58,242,0.2),_transparent_60%)]" />

      {/* Decorative orbs */}
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-gold-400/10 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-500/15 blur-3xl" />
      <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-gold-300/8 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center justify-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-gold-400 sm:text-base sm:tracking-[0.35em]">
          Jones County High School
        </p>

        <h1 className="font-heading text-6xl font-bold uppercase leading-none tracking-wide sm:text-8xl lg:text-9xl">
          <span className="bg-gradient-to-b from-white via-white to-purple-200 bg-clip-text text-transparent">
            Greyhounds
          </span>
        </h1>

        <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 sm:w-32" aria-hidden="true" />

        <h2 className="font-heading mt-4 text-3xl font-medium uppercase tracking-[0.2em] text-purple-200 sm:text-4xl lg:text-5xl">
          Cross Country
        </h2>

        <p className="mt-6 max-w-md text-lg font-medium text-gold-300/90 sm:text-xl">
          Running with Pride & Purpose
        </p>
      </div>

      {/* Bottom accent */}
      <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
    </section>
  )
}
