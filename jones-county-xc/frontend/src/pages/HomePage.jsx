import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import WelcomeBanner from '../components/WelcomeBanner'
import MeetCalendar from '../components/MeetCalendar'
import UpcomingMeets, { PLACEHOLDER_MEETS } from '../components/UpcomingMeets'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

const quickLinks = [
  {
    to: '/roster',
    title: 'Roster',
    description: 'View the full team roster and athlete profiles',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    to: '/schedule',
    title: 'Schedule',
    description: 'Check upcoming meets and event dates',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    to: '/results',
    title: 'Results',
    description: 'See race results and personal records',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.003 6.003 0 01-5.54 0" />
      </svg>
    ),
  },
]

// Convert placeholder meets to the format MeetCalendar expects
const placeholderCalendarMeets = PLACEHOLDER_MEETS.map((m, i) => ({
  ID: i + 1,
  Name: m.name,
  Date: m.date,
  Location: m.location,
}))

export default function HomePage() {
  const { data: meets, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['meets'],
    queryFn: async () => {
      const res = await fetch('/api/meets')
      if (!res.ok) throw new Error('Failed to fetch meets')
      return res.json()
    },
  })

  // Use API data if available, otherwise fall back to placeholder
  const calendarMeets = meets && meets.length > 0 ? meets : placeholderCalendarMeets

  return (
    <div>
      <WelcomeBanner />

      <div className="mx-auto max-w-5xl px-4 py-12">
        {/* Calendar Section */}
        <div className="mb-16">
          <h2 className="font-heading text-2xl font-bold uppercase tracking-wide text-purple-900 mb-6">Meet Calendar</h2>
          {isLoading && <LoadingSpinner message="Loading calendar..." />}
          {isError && <ErrorMessage message={error.message} onRetry={refetch} />}
          {!isLoading && <MeetCalendar meets={calendarMeets} />}
        </div>

        {/* Upcoming Meets */}
        <div className="mb-16">
          <UpcomingMeets />
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="font-heading text-2xl font-bold uppercase tracking-wide text-purple-900 mb-6">Quick Links</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {quickLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="group rounded-xl border border-purple-100 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-purple-200"
              >
                <div className="mb-3 inline-flex rounded-lg bg-purple-50 p-2.5 text-purple-600 transition-colors group-hover:bg-purple-100 group-hover:text-purple-700">
                  {link.icon}
                </div>
                <h3 className="text-lg font-bold text-purple-900">{link.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{link.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
