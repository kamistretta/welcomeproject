import { useState } from 'react'

const PLACEHOLDER_MEETS = [
  { name: 'Jones County Greyhound Invitational', date: '2026-03-14', location: 'Jones County High School, Gray, GA' },
  { name: 'Peach State Classic', date: '2026-03-28', location: 'Perry, GA' },
  { name: 'Region 4-AAAA Championship', date: '2026-04-11', location: 'Veterans High School, Kathleen, GA' },
  { name: 'GHSA State Meet', date: '2026-05-02', location: 'Carrollton, GA' },
]

function MeetCard({ meet }) {
  const [expanded, setExpanded] = useState(false)
  const date = new Date(meet.date + 'T00:00:00')
  const month = date.toLocaleString('default', { month: 'short' }).toUpperCase()
  const day = date.getDate()
  const weekday = date.toLocaleString('default', { weekday: 'long' })
  const fullDate = date.toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' })

  return (
    <button
      onClick={() => setExpanded(!expanded)}
      aria-expanded={expanded}
      className="w-full text-left rounded-xl border border-purple-100 bg-white shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-purple-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400/30"
    >
      <div className="flex items-center gap-4 p-4 sm:p-5">
        {/* Date badge with calendar icon */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center rounded-lg bg-gradient-to-b from-purple-600 to-purple-700 px-3 py-2.5 min-w-[3.75rem] text-white shadow-sm">
          <svg className="h-3.5 w-3.5 mb-1 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">{month}</span>
          <span className="font-heading text-2xl font-bold leading-none">{day}</span>
        </div>

        {/* Meet info */}
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-purple-900 text-sm sm:text-base leading-tight">{meet.name}</h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-gray-500">
            <span>{weekday}</span>
            <span className="flex items-center gap-1 text-gray-600">
              <svg className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span className="truncate">{meet.location}</span>
            </span>
          </div>
        </div>

        {/* Expand chevron */}
        <svg
          className={`h-5 w-5 flex-shrink-0 text-purple-300 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>

      {/* Expanded details */}
      <div className={`overflow-hidden transition-all duration-200 ${expanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="border-t border-purple-50 px-4 py-3 sm:px-5 bg-purple-50/50">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-purple-500">Date</span>
              <p className="font-medium">{fullDate}</p>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-purple-500">Location</span>
              <p className="font-medium">{meet.location}</p>
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}

export default function UpcomingMeets() {
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold uppercase tracking-wide text-purple-900 mb-6">Upcoming Meets</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        {PLACEHOLDER_MEETS.map((meet) => (
          <MeetCard key={meet.name} meet={meet} />
        ))}
      </div>
    </div>
  )
}

export { PLACEHOLDER_MEETS }
