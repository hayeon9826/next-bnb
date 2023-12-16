import type { Metadata } from 'next'

// @see - https://nextjs.org/docs/app/building-your-application/optimizing/metadata#static-metadata
export const metadata: Metadata = {
  title: 'nextbnb 숙소 등록하기',
  description: 'nextbnb로 숙소를 등록하세요',
  keywords: ['숙박 공유', 'Nextbnb', '여행', '휴가'],
}

export default function RoomRegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="max-w-4xl mx-auto px-4 min-h-screen py-20">
      {children}
    </section>
  )
}
