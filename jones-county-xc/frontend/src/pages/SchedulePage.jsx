import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

export default function SchedulePage() {
  const { data: meets, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['meets'],
    queryFn: async () => {
      const res = await fetch('/api/meets')
      if (!res.ok) throw new Error('Failed to fetch meets')
      return res.json()
    },
  })

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold uppercase tracking-wide text-purple-900">Meet Schedule</h1>
        <p className="mt-2 text-gray-600">Upcoming meets and events for the season.</p>
      </div>

      {isLoading && <LoadingSpinner message="Loading schedule..." />}
      {isError && <ErrorMessage message={error.message} onRetry={refetch} />}

      {meets && (
        <div className="overflow-hidden rounded-xl border border-purple-100 bg-white shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-purple-900 to-purple-800 text-white">
                <th className="px-6 py-4 text-left text-sm font-semibold">Meet</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {meets.map((meet, i) => (
                <tr key={meet.ID} className={`transition-colors hover:bg-purple-50 ${i % 2 === 1 ? 'bg-gray-50/50' : ''}`}>
                  <td className="px-6 py-4 font-medium text-purple-900">{meet.Name}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {new Date(meet.Date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{meet.Location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
