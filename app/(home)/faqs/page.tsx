import type { Metadata } from 'next'
import { FaqType } from '@/interface'

// @see - https://nextjs.org/docs/app/building-your-application/optimizing/metadata#static-metadata
export const metadata: Metadata = {
  title: 'nextbnb 도움말',
  description: 'nextbnb에 궁금한 점을 확인하세요',
  keywords: ['Nextbnb', '도움말', '정보', '여행 팁', '숙소 팁'],
}

export default async function FaqPage() {
  const data: FaqType[] = await getData()

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-lg md:text-3xl font-semibold">FAQ</h1>
      <p className="mt-2 text-gray-600">도움말을 모두 살펴보세요.</p>
      <div className="mt-8 flex flex-col mb-10">
        {data?.map((data) => (
          <div
            key={data.id}
            className="py-5 border-b border-b-gray-200 text-black items-center font-semibold"
          >
            <div>{data.title}</div>
            <div className="mt-2 text-gray-500 font-normal text-sm">
              {data.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

async function getData() {
  // Error Boundary 테스트: 아래 url 변경 후 테스트하기
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/faqs`, {
      cache: 'force-cache',
    })

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    return res.json()
  } catch (e) {
    console.log(e)
  }
}
