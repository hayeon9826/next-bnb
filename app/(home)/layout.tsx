import type { Metadata } from 'next'

// @see - https://nextjs.org/docs/app/building-your-application/optimizing/metadata#static-metadata
export const metadata: Metadata = {
  title: 'nextbnb 숙소 검색',
  description: 'nextbnb에서 최고의 숙소를 검색하세요',
  keywords: ['호텔', '펜션', '최저가', 'Nextbnb', '여행'],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="mt-20 py-10 max-w-7xl mx-auto">{children}</div>
}
