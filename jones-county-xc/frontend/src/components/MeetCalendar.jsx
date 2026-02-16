import { useState, useMemo } from 'react'

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function MeetCalendar({ meets = [] }) {
  const today = new Date()
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [selectedDate, setSelectedDate] = useState(null)

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  const meetsByDate = useMemo(() => {
    const map = {}
    meets.forEach((meet) => {
      const d = new Date(meet.Date)
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
      if (!map[key]) map[key] = []
      map[key].push(meet)
    })
    return map
  }, [meets])

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1))
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1))

  const monthLabel = viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })

  const isToday = (day) =>
    day && year === today.getFullYear() && month === today.getMonth() && day === today.getDate()

  const getMeetsForDay = (day) => {
    if (!day) return []
    const key = `${year}-${month}-${day}`
    return meetsByDate[key] || []
  }

  const selectedKey = selectedDate ? `${selectedDate.year}-${selectedDate.month}-${selectedDate.day}` : null
  const selectedMeets = selectedKey ? (meetsByDate[selectedKey] || []) : []

  const handleDayClick = (day) => {
    if (!day) return
    const meetsOnDay = getMeetsForDay(day)
    if (meetsOnDay.length > 0) {
      setSelectedDate(
        selectedDate?.year === year && selectedDate?.month === month && selectedDate?.day === day
          ? null
          : { year, month, day }
      )
    }
  }

  return (
    <div className="rounded-2xl border border-purple-100 bg-white shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-purple-900 to-purple-700 px-6 py-4">
        <button
          onClick={prevMonth}
          className="rounded-lg p-2 text-purple-200 transition-colors hover:bg-purple-800 hover:text-white"
          aria-label="Previous month"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="text-lg font-bold text-white tracking-wide">{monthLabel}</h3>
        <button
          onClick={nextMonth}
          className="rounded-lg p-2 text-purple-200 transition-colors hover:bg-purple-800 hover:text-white"
          aria-label="Next month"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 border-b border-purple-100 bg-purple-50">
        {DAY_LABELS.map((d) => (
          <div key={d} className="py-2 text-center text-xs font-semibold text-purple-600 uppercase tracking-wider">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7" role="grid" aria-label={monthLabel}>
        {cells.map((day, i) => {
          const dayMeets = getMeetsForDay(day)
          const hasMeet = dayMeets.length > 0
          const todayClass = isToday(day)
          const isSelected = selectedDate?.year === year && selectedDate?.month === month && selectedDate?.day === day

          if (!day) {
            return <div key={i} role="gridcell" className="min-h-[3.5rem] border-b border-r border-purple-50" />
          }

          const cellContent = (
            <>
              <span
                className={[
                  'flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium',
                  todayClass ? 'bg-purple-600 text-white font-bold' : 'text-gray-700',
                  isSelected && !todayClass ? 'bg-purple-100' : '',
                ].join(' ')}
              >
                {day}
              </span>
              {hasMeet && (
                <div className="mt-1 flex gap-0.5" aria-hidden="true">
                  {dayMeets.map((_, mi) => (
                    <span key={mi} className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                  ))}
                </div>
              )}
            </>
          )

          if (hasMeet) {
            return (
              <button
                key={i}
                role="gridcell"
                onClick={() => handleDayClick(day)}
                aria-pressed={isSelected}
                aria-label={`${day}, ${dayMeets.length} meet${dayMeets.length > 1 ? 's' : ''}`}
                className={[
                  'relative flex flex-col items-center justify-start p-2 min-h-[3.5rem] border-b border-r border-purple-50 transition-colors',
                  'cursor-pointer hover:bg-gold-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-400',
                  isSelected ? 'bg-gold-50' : '',
                ].join(' ')}
              >
                {cellContent}
              </button>
            )
          }

          return (
            <div
              key={i}
              role="gridcell"
              className="relative flex flex-col items-center justify-start p-2 min-h-[3.5rem] border-b border-r border-purple-50"
            >
              {cellContent}
            </div>
          )
        })}
      </div>

      {/* Selected meet details */}
      {selectedMeets.length > 0 && (
        <div className="border-t border-purple-100 bg-gradient-to-r from-gold-50 to-purple-50 px-6 py-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-purple-500 mb-2">
            {new Date(year, selectedDate.month, selectedDate.day).toLocaleDateString('default', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          {selectedMeets.map((meet, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg bg-white/70 p-3 mt-2">
              <div className="mt-0.5 h-3 w-3 flex-shrink-0 rounded-full bg-gold-500" />
              <div>
                <p className="font-semibold text-purple-900">{meet.Name}</p>
                <p className="text-sm text-gray-600">{meet.Location}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
