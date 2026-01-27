import { useQuery } from '@tanstack/react-query'

function App() {
  const { data: athletes, isLoading, isError, error } = useQuery({
    queryKey: ['athletes'],
    queryFn: async () => {
      const res = await fetch('/api/athletes')
      if (!res.ok) throw new Error('Failed to fetch athletes')
      return res.json()
    }
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading athletes...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-2">Error loading athletes</p>
          <p className="text-gray-500">{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Jones County XC Athletes
        </h1>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Grade</th>
                <th className="px-6 py-3 text-left">Personal Record</th>
              </tr>
            </thead>
            <tbody>
              {athletes.map(athlete => (
                <tr key={athlete.ID} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{athlete.Name}</td>
                  <td className="px-6 py-4">{athlete.Grade}</td>
                  <td className="px-6 py-4">{athlete.PersonalRecord?.String || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App
