import CategoryList from '@/components/CategoryList'
import { GridLayout, RoomItem } from '@/components/RoomGrid'
import { PrismaClient } from '@prisma/client'

export default async function Home() {
  const { data } = await getRooms()

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
  const prisma = new PrismaClient()
  const data = await prisma.room.findMany()

  return {
    data,
  }
}
