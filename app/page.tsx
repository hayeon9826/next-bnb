import { PrismaClient } from '@prisma/client'

export default async function Home() {
  const { data } = await getRooms()

  return (
    <div className="sm:px-4 md:px-8 lg:px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-20">
      {data?.map((room) => (
        <div key={room.id}>
          <img
            src={room.images?.[0]}
            alt="room image"
            className="rounded-md w-full h-auto object-fit"
          />
          <div className="mt-2 font-semibold text-sm">{room.title}</div>
          <div className="mt-1 text-gray-400 text-sm">{room.address}</div>
          <div className="mt-1 text-sm">
            {room.price?.toLocaleString()}원
            <span className="text-gray-500"> /박</span>
          </div>
        </div>
      ))}
    </div>
  )
}

async function getRooms() {
  const prisma = new PrismaClient()
  const data = await prisma.room.findMany()

  return {
    data,
  }
}
