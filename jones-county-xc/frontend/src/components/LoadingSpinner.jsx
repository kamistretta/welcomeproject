export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20" role="status" aria-live="polite">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
        <div className="absolute inset-1.5 animate-spin rounded-full border-4 border-gold-200 border-b-gold-500" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
      </div>
      <p className="mt-4 text-sm font-medium text-purple-700">{message}</p>
    </div>
  )
}
