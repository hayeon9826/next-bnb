import FeatureSection from '@/components/RoomDetail/FeatureSection'
import HeaderSection from '@/components/RoomDetail/HeaderSection'
import HostInfoSection from '@/components/RoomDetail/HostInfoSection'
import MapSection from '@/components/RoomDetail/MapSection'
import Comment from '@/components/Comment'
import { RoomType } from '@/interface'

interface ParamsProps {
  params: { id: string }
}

export default async function RoomPage({ params }: ParamsProps) {
  const { id } = params
  const data: RoomType = await getData(id)

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
