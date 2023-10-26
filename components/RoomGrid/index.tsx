import { ReactNode } from 'react'
import Link from 'next/link'

import Image from 'next/image'
import { RoomType } from '@/interface'
import { BLUR_DATA_URL } from '@/constants'

export function RoomItem({ room }: { room: RoomType }) {
  return (
    <div key={room.id}>
      <Link href={`/rooms/${room.id}`}>
        <Image
          src={room.images?.[0]}
          alt="room image"
          width={500}
          height={500}
          className="rounded-md w-full h-auto object-fit hover:shadow-lg"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
        <div className="mt-2 font-semibold text-sm">{room.title}</div>
        <div className="mt-1 text-gray-400 text-sm">{room.address}</div>
        <div className="mt-1 text-sm">
          {room.price?.toLocaleString()}원
          <span className="text-gray-500"> /박</span>
        </div>
      </Link>
    </div>
  )
}

export function GridLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-20 mt-16 max-w-7xl mx-auto">
      {children}
    </div>
  )
}
