import { RoomType } from '@/interface'

import Image from 'next/image'
import dynamic from 'next/dynamic'

import { BLUR_DATA_URL } from '@/constants'
import ShareButtonModal from './ShareButtonModal'
import LikeButton from './LikeButton'

export default function HeaderSection({ data }: { data: RoomType }) {
  const SHOW_DOUBLE_IMG_BANNER = data?.images?.length >= 2

  // @see - https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading
  const ImageListButtonModal = dynamic(() => import('./ImageListButtonModal'))

  return (
    <>
      <h1 className="text-lg md:text-3xl font-medium px-4">{data?.title}</h1>
      <div className="w-full flex justify-between flex-wrap items-center px-4">
        <div className="flex gap-2 underline text-xs md:text-sm mt-2">
          {data?.address}
        </div>
        <div className="flex gap-2 text-xs md:text-sm mt-2">
          <ShareButtonModal data={data} />
          <LikeButton roomId={data.id} />
        </div>
      </div>
      <div className="mt-6 relative">
        {SHOW_DOUBLE_IMG_BANNER ? (
          <div className="grid md:grid-cols-2 md:gap-4 gap-2 align-middle h-[400px] overflow-hidden relative md:rounded-lg">
            {data?.images?.slice(0, 2)?.map((img) => (
              <div className="w-full relative" key={img}>
                <Image
                  src={img}
                  alt="room img"
                  style={{ objectFit: 'cover' }}
                  fill
                  sizes="(min-width: 640px) 400px, 320px"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[400px] overflow-hidden relative rounded-lg">
            <Image
              src={data?.images?.[0] || '/images/no-image-long.jpg'}
              alt="room img"
              fill
              sizes="(min-width: 640px) 400px, 320px"
              style={{ objectFit: 'cover', objectPosition: 'middle' }}
              className="rounded-lg absolute bottom-0 top-0 my-auto"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          </div>
        )}
        <ImageListButtonModal data={data} />
      </div>
    </>
  )
}
