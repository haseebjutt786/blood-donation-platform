export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gray-200" />
            <div className="space-y-1">
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="h-3 w-16 rounded bg-gray-200" />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-20 rounded-lg bg-gray-200" />
            <div className="h-8 w-20 rounded-lg bg-gray-200" />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-8 animate-pulse">
        <div className="mb-8 flex gap-2">
          {[1,2,3,4].map(n => <div key={n} className="h-10 w-28 rounded-xl bg-gray-200" />)}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1,2,3,4,5,6,7,8].map(n => (
            <div key={n} className="h-20 rounded-2xl bg-gray-200" />
          ))}
        </div>
      </div>
    </div>
  )
}
