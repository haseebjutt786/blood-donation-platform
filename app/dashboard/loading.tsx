export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto flex max-w-7xl gap-8 px-4 py-10">

        {/* Sidebar skeleton */}
        <aside className="hidden w-56 shrink-0 md:block">
          <div className="rounded-2xl bg-white p-4 shadow-sm animate-pulse">
            <div className="mb-5 rounded-xl bg-gray-100 p-4">
              <div className="mx-auto h-14 w-14 rounded-full bg-gray-200" />
              <div className="mt-3 h-4 w-28 mx-auto rounded bg-gray-200" />
              <div className="mt-2 h-3 w-20 mx-auto rounded bg-gray-200" />
            </div>
            <div className="space-y-2">
              {[1,2,3,4,5,6].map(n => (
                <div key={n} className="h-10 rounded-xl bg-gray-100" />
              ))}
            </div>
          </div>
        </aside>

        {/* Main skeleton */}
        <div className="flex-1 animate-pulse">
          <div className="mb-7">
            <div className="h-7 w-56 rounded bg-gray-200" />
            <div className="mt-2 h-4 w-40 rounded bg-gray-200" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {[1,2,3,4].map(n => (
              <div key={n} className="h-24 rounded-2xl bg-gray-200" />
            ))}
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
            <div className="h-5 w-32 rounded bg-gray-200 mb-5" />
            <div className="h-20 rounded-xl bg-gray-100" />
          </div>
        </div>

      </div>
    </div>
  )
}
