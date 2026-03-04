export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20" role="status" aria-live="polite">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-neon-pink/30 border-t-neon-cyan" />
        <div className="absolute inset-1.5 animate-spin rounded-full border-4 border-neon-lime/30 border-b-neon-orange" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
      </div>
      <p className="mt-4 text-sm font-medium text-ink-200">{message}</p>
    </div>
  )
}
