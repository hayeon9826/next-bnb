import Image from 'next/image'
import { AiOutlineCloseCircle } from 'react-icons/ai'

import { BLUR_DATA_URL } from '@/constants'
import { useRecoilState } from 'recoil'
import { currentRoomState } from '@/atom'

export default function SelectedRoom() {
  const [room, setRoom] = useRecoilState(currentRoomState)

  return (
    <div className="fixed inset-x-0 mx-auto bottom-20 rounded-lg shadow-lg max-w-xs md:max-w-sm z-10 w-full bg-white">
      {room && (
        <div className="flex flex-col relative">
          <div
            className="absolute right-2 top-2 text-white text-2xl bg-black/20 rounded-full cursor-pointer"
            onClick={() => setRoom(null)}
          >
            <AiOutlineCloseCircle />
          </div>
          <div className="rounded-lg-t h-[200px] overflow-hidden">
            <Image
              src={room.images?.[0]}
              width={384}
              height={384}
              alt="room img"
              objectFit="cover"
              className="rounded-t-lg"
              blurDataURL={BLUR_DATA_URL}
            />
          </div>
          <div className="p-4 font-semibold bg-white rounded-b-lg">
            <div className="mt-2 font-semibold text-sm">{room.title}</div>
            <div className="mt-1 text-gray-400 text-sm">{room.address}</div>
            <div className="mt-1 text-sm">
              {room.price?.toLocaleString()}원
              <span className="text-gray-500"> /박</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
