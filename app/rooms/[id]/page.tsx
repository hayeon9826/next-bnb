import FeatureSection from '@/components/RoomDetail/FeatureSection'
import HeaderSection from '@/components/RoomDetail/HeaderSection'
import { BLUR_DATA_URL } from '@/constants'
import { RoomType } from '@/interface'

import cn from 'classnames'
import { useState } from 'react'

interface ParamsProps {
  params: { id: string }
}

export default async function RoomPage({ params }: ParamsProps) {
  const id = params.id
  const data: RoomType = await getData(id)

  return (
    <div className="my-28 max-w-6xl mx-auto">
      <HeaderSection data={data} />
      <FeatureSection data={data} />
    </div>
  )
}

async function getData(id: string) {
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
}
