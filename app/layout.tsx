import './globals.css'
import type { Metadata } from 'next'
import { noto_sans } from './fonts'
import { NextLayout, NextProvider } from './providers'

export const metadata: Metadata = {
  // @see - https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
  metadataBase: new URL('https://next-bnb-omega.vercel.app'),
  alternates: {
    canonical: '/',
  },
  // @see - https://nextjs.org/docs/app/api-reference/functions/generate-metadata#basic-fields
  title: 'nextbnb로 여행하기',
  description: 'nextbnb로 여행을 계획해보세요',
  keywords: ['연말 휴가', 'Nextbnb', '여행', '휴가', '숙박'],
  // @see - https://nextjs.org/docs/app/api-reference/functions/generate-metadata#opengraph
  openGraph: {
    title: 'nextbnb로 여행하기',
    description: 'nextbnb로 여행을 계획해보세요',
    url: 'https://next-bnb-omega.vercel.app/',
    siteName: 'Nextbnb',
    locale: 'ko_KR',
    type: 'website',
  },
  // @description - https://www.cloudflare.com/ko-kr/learning/bots/what-is-robots-txt/
  // @see - https://nextjs.org/docs/app/api-reference/functions/generate-metadata#robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={noto_sans.className}>
        <NextProvider>
          <NextLayout>{children}</NextLayout>
        </NextProvider>
      </body>
    </html>
  )
}
