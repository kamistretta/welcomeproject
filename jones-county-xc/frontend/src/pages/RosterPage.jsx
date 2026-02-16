import { useQuery } from '@tanstack/react-query'
import AthleteCard from '../components/AthleteCard'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

export default function RosterPage() {
  const { data: athletes, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['athletes'],
    queryFn: async () => {
      const res = await fetch('/api/athletes')
      if (!res.ok) throw new Error('Failed to fetch athletes')
      return res.json()
    },
  })

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold uppercase tracking-wide text-purple-900">Team Roster</h1>
        <p className="mt-2 text-gray-600">Meet the athletes of Jones County Greyhounds Cross Country.</p>
      </div>

      {isLoading && <LoadingSpinner message="Loading roster..." />}
      {isError && <ErrorMessage message={error.message} onRetry={refetch} />}

      {athletes && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {athletes.map((athlete) => (
            <AthleteCard key={athlete.ID} athlete={athlete} />
          ))}
        </div>
      )}
    </div>
  )
}
