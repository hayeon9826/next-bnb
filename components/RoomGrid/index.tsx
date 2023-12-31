import { ReactNode } from 'react'
import Link from 'next/link'

import Image from 'next/image'
import { RoomType } from '@/interface'
import { BLUR_DATA_URL } from '@/constants'

export function RoomItem({ room }: { room: RoomType }) {
  return (
    <div key={room.id}>
      <Link href={`/rooms/${room.id}`}>
        <div className="h-[320px] md:h-[240px] overflow-hidden block relative z-0 hover:shadow-xl ">
          <Image
            src={room.images?.[0] || '/images/no-image.jpg'}
            alt="room image"
            style={{ objectFit: 'cover' }}
            fill
            quality={80}
            sizes="(min-width: 640px) 240px, 320px"
            className="rounded-md w-full h-auto object-fit relative z-0"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
        </div>
        <div className="mt-2 font-semibold text-sm hover:underline">
          {room.title}
        </div>
        <span
          data-cy="room-category"
          className="text-xs px-2 py-1 rounded-full bg-black text-white mt-1"
        >
          {room.category}
        </span>
        <div className="mt-1 text-gray-400 text-sm" data-cy="room-address">
          {room.address}
        </div>
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-20 mt-16 max-w-7xl mx-auto px-4">
      {children}
    </div>
  )
}
