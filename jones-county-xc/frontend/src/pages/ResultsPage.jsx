import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function ResultsPage() {
  const [selectedMeetId, setSelectedMeetId] = useState('')
  const [event, setEvent] = useState('all')

  const { data: meets, isLoading: meetsLoading, isError: meetsError, error: meetsErrorMsg, refetch: refetchMeets } = useQuery({
    queryKey: ['meets'],
    queryFn: async () => {
      const res = await fetch('/api/meets')
      if (!res.ok) throw new Error('Failed to fetch meets')
      return res.json()
    },
  })

  const { data: athletes } = useQuery({
    queryKey: ['athletes'],
    queryFn: async () => {
      const res = await fetch('/api/athletes')
      if (!res.ok) throw new Error('Failed to fetch athletes')
      return res.json()
    },
  })

  const { data: results, isLoading: resultsLoading, isError: resultsError, error: resultsErrorMsg, refetch: refetchResults } = useQuery({
    queryKey: ['results', selectedMeetId],
    queryFn: async () => {
      const res = await fetch(`/api/meets/${selectedMeetId}/results`)
      if (!res.ok) throw new Error('Failed to fetch results')
      return res.json()
    },
    enabled: !!selectedMeetId,
  })

  // Build a map of athlete ID → list of events
  const athleteEvents = useMemo(() => {
    if (!athletes) return {}
    const map = {}
    athletes.forEach((a) => {
      if (a.Events?.String) {
        map[a.ID] = a.Events.String.split(',').map((e) => e.trim())
      }
    })
    return map
  }, [athletes])

  // Filter results by selected event
  const filteredResults = useMemo(() => {
    if (!results) return null
    if (event === 'all') return results
    return results.filter((r) => {
      const events = athleteEvents[r.AthleteID]
      return events && events.includes(event)
    })
  }, [results, event, athleteEvents])

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold uppercase tracking-wide text-purple-900">Meet Results</h1>
        <p className="mt-2 text-gray-600">Select a meet and event to view individual results.</p>
      </div>

      {meetsLoading && <LoadingSpinner message="Loading meets..." />}
      {meetsError && <ErrorMessage message={meetsErrorMsg.message} onRetry={refetchMeets} />}

      {meets && (
        <form role="search" aria-label="Filter results" onSubmit={(e) => e.preventDefault()} className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1 sm:max-w-sm">
            <label htmlFor="meet-select" className="block text-sm font-semibold text-purple-900 mb-2">
              Select a meet
            </label>
            <select
              id="meet-select"
              value={selectedMeetId}
              onChange={(e) => setSelectedMeetId(e.target.value)}
              className="block w-full rounded-lg border border-purple-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition-colors focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30"
            >
              <option value="">-- Choose a meet --</option>
              {meets.map((meet) => (
                <option key={meet.ID} value={meet.ID}>
                  {meet.Name} ({new Date(meet.Date).toLocaleDateString()})
                </option>
              ))}
            </select>
          </div>

          <div className="sm:w-48">
            <label id="event-label" className="block text-sm font-semibold text-purple-900 mb-2">
              Event
            </label>
            <Select value={event} onValueChange={setEvent}>
              <SelectTrigger aria-labelledby="event-label">
                <SelectValue placeholder="Select event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="5K">5K</SelectItem>
                <SelectItem value="3200m">3200m</SelectItem>
                <SelectItem value="1600m">1600m</SelectItem>
                <SelectItem value="800m">800m</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
      )}

      {resultsLoading && <LoadingSpinner message="Loading results..." />}
      {resultsError && <ErrorMessage message={resultsErrorMsg.message} onRetry={refetchResults} />}

      {filteredResults && filteredResults.length > 0 && (
        <>
          {event !== 'all' && (
            <p className="mb-3 text-sm text-gray-500">
              Showing {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} for <span className="font-semibold text-purple-700">{event}</span>
            </p>
          )}
          <div className="overflow-hidden rounded-xl border border-purple-100 bg-white shadow-sm">
            <table className="w-full">
              <caption className="sr-only">Race results for selected meet</caption>
              <thead>
                <tr className="bg-gradient-to-r from-purple-900 to-purple-800 text-white">
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold">Place</th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold">Athlete</th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold">Time</th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold">Events</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-50">
                {filteredResults.map((r, i) => (
                  <tr key={r.ID} className={`transition-colors hover:bg-purple-50 ${i % 2 === 1 ? 'bg-gray-50/50' : ''}`}>
                    <td className="px-6 py-4 font-bold text-gold-800">{r.Place}</td>
                    <td className="px-6 py-4 font-medium text-purple-900">{r.AthleteName}</td>
                    <td className="px-6 py-4 text-gray-700">{r.Time}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {athleteEvents[r.AthleteID]?.join(', ') || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {filteredResults && filteredResults.length === 0 && (
        <p className="mt-8 text-center text-gray-500">
          {event !== 'all'
            ? `No results for ${event} at this meet.`
            : 'No results recorded for this meet yet.'}
        </p>
      )}
    </div>
  )
}
