import { Button } from '@/components/ui/button'

export default function AthleteCard({ athlete }) {
  return (
    <div className="group rounded-xl border border-purple-100 bg-white shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
      <div className="h-1 rounded-t-xl bg-gradient-to-r from-purple-500 to-gold-400" />
      <div className="p-5">
        <h3 className="text-lg font-bold text-purple-900">{athlete.Name}</h3>
        <p className="mt-1 text-sm font-medium text-purple-600">Grade {athlete.Grade}</p>
        {athlete.PersonalRecord?.String && (
          <p className="mt-3 text-sm">
            <span className="font-medium text-gray-500">PR:</span>{' '}
            <span className="inline-flex items-center gap-1 font-semibold text-purple-700">
              <svg className="h-3.5 w-3.5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {athlete.PersonalRecord.String}
            </span>
          </p>
        )}
        {athlete.Events?.String && (
          <p className="mt-1 text-sm">
            <span className="font-medium text-gray-500">Events:</span>{' '}
            <span className="text-gray-700">{athlete.Events.String}</span>
          </p>
        )}
        <Button variant="outline" size="sm" className="mt-4 w-full">
          View Details
        </Button>
      </div>
    </div>
  )
}
