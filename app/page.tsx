import CategoryList from '@/components/CategoryList'
import { GridLayout, RoomItem } from '@/components/RoomGrid'
import { RoomType } from '@/interface'

export default async function Home() {
  const data: RoomType[] = await getRooms()

  return (
    <>
      <CategoryList />
      <GridLayout>
        {data?.map((room) => <RoomItem room={room} key={room.id} />)}
      </GridLayout>
    </>
  )
}

async function getRooms() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms`, {
    cache: 'force-cache',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
