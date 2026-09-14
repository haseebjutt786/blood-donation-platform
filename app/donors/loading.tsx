export default function DonorsLoading() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-red-600 px-6 py-16 text-center text-white animate-pulse">
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto h-10 w-64 rounded-lg bg-red-500" />
          <div className="mx-auto mt-4 h-5 w-96 rounded bg-red-500" />
        </div>
      </section>
      <section className="mx-auto -mt-8 max-w-6xl px-6 pb-12">
        <div className="rounded-2xl bg-white p-6 shadow-lg animate-pulse">
          <div className="h-7 w-40 rounded bg-gray-200 mb-6" />
          <div className="grid gap-5 md:grid-cols-3">
            {[1, 2, 3].map(n => (
              <div key={n} className="h-12 rounded-lg bg-gray-200" />
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <div key={n} className="rounded-2xl bg-white p-6 shadow-sm animate-pulse">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 w-32 rounded bg-gray-200" />
                  <div className="h-3 w-24 rounded bg-gray-200" />
                </div>
                <div className="h-14 w-14 rounded-full bg-gray-200" />
              </div>
              <div className="mt-5 flex items-center justify-between">
                <div className="h-6 w-24 rounded-full bg-gray-200" />
                <div className="h-4 w-20 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
