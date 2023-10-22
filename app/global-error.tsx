'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <div className="text-center h-[60vh] flex flex-col justify-center">
        <div>
          <h2 className="text-3xl font-semibold text-rose-700">
            Something went wrong!
          </h2>
          <p className="mt-4 text-gray-500">
            해당 페이지를 가져오던 중 문제가 생겼습니다.
          </p>
          <div className="mt-8">
            <button
              onClick={() => reset()}
              className="bg-rose-700 text-white rounded-xl px-4 py-2.5 hover:shadow-lg"
            >
              다시 시도하기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
