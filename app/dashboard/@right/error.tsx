'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <div className="text-center min-h-screen flex flex-col justify-center">
        <div>
          <h2 className="text-2xl font-semibold text-rose-700">
            Error.tsx Page!!
          </h2>
          <p className="mt-4 text-gray-500 text-sm">
            Something went wrong...please try again
          </p>
          <div className="mt-8">
            <button
              onClick={() => reset()}
              className="bg-rose-700 text-white rounded-md leading-6 text-sm px-2.5 py-1.5 hover:shadow-lg"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
