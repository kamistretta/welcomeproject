export default function Footer() {
  return (
    <footer className="relative bg-ink-950 py-8 text-center text-white">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-animated" />
      <p className="text-lg font-heading font-semibold tracking-wide text-rainbow">Paintingz By Kat</p>
      <a
        href="https://instagram.com/paintingzbykat"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex items-center gap-1.5 text-sm text-neon-cyan transition-colors hover:text-neon-cyan/80 text-glow-cyan"
      >
        @paintingzbykat
      </a>
      <p className="mt-4 text-xs text-ink-400">&copy; {new Date().getFullYear()} Paintingz By Kat</p>
    </footer>
  )
}
