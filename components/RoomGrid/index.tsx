import { ReactNode } from 'react'

interface RoomType {
  id: number
  images: string[]
  title: string
  address: string
  price: number
}

export function RoomItem({ room }: { room: RoomType }) {
  return (
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
  )
}

export function GridLayout({ children }: { children: ReactNode }) {
  return (
    <div className="sm:px-4 md:px-8 lg:px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 my-20 max-w-7xl mx-auto">
      {children}
    </div>
  )
}
