'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function PaymentFail() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const message = searchParams.get('message')
  const router = useRouter()
  return (
    <div>
      <div className="text-center h-[60vh] flex flex-col justify-center">
        <div>
          <h2 className="text-3xl font-semibold text-rose-700">
            결제가 실패했습니다.
          </h2>
          <p className="mt-4 text-gray-500 font-semibold">
            결제 도중 아래와 같은 문제가 생겼습니다. 다시 시도해주세요.
          </p>
          <p className="mt-8 text-gray-400 text-sm max-w-lg mx-auto">
            에러코드: {code || '-'}
          </p>
          <p className="mt-2 text-gray-400 text-sm max-w-lg mx-auto">
            에러 메레지: {message || '-'}
          </p>
          <div className="mt-8">
            <button
              onClick={() => router.replace('/')}
              className="bg-rose-700 text-white rounded-xl px-4 py-2.5 hover:shadow-lg"
            >
              메인으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
