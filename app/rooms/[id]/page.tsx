import type { Metadata, ResolvingMetadata } from 'next'
import dynamic from 'next/dynamic'

import FeatureSection from '@/components/RoomDetail/FeatureSection'
import HeaderSection from '@/components/RoomDetail/HeaderSection'
import HostInfoSection from '@/components/RoomDetail/HostInfoSection'

import { RoomType } from '@/interface'

interface ParamsProps {
  params: { id: string }
}

export default async function RoomPage({ params }: ParamsProps) {
  const { id } = params
  const data: RoomType = await getData(id)

  // @see - https://nextjs.org/docs/app/building-your-application/optimizing/static-assets
  const Comment = dynamic(() => import('@/components/Comment'))

  const MapSection = dynamic(
    () => import('@/components/RoomDetail/MapSection'),
    {
      ssr: false,
    },
  )

  return (
    <div className="my-28 max-w-6xl mx-auto">
      <HeaderSection data={data} />
      <FeatureSection data={data} />
      <Comment room={data} />
      <MapSection data={data} />
      <HostInfoSection data={data} />
    </div>
  )
}

async function getData(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/rooms?id=${id}`,
      {
        next: {
          revalidate: 60 * 60,
        },
      },
    )

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    return res.json()
  } catch (e) {
    console.log(e)
  }
}

// @see - https://nextjs.org/docs/app/building-your-application/optimizing/metadata#dynamic-metadata
export async function generateMetadata(
  { params }: ParamsProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = params.id

  // fetch data
  const product = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/rooms?id=${id}`,
    {
      next: {
        revalidate: 60 * 60,
      },
    },
  ).then((res) => res.json())

  // optionally access and extend (rather than replace) parent metadata
  const prevKeywords = (await parent).keywords || []

  return {
    title: `Nextbnb 숙소 - ${product?.title}`,
    description: product?.description,
    keywords: [product?.category, ...prevKeywords],
  }
}
