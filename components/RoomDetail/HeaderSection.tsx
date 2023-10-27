'use client'

import { useState } from 'react'

import { RoomType } from '@/interface'
import cn from 'classnames'

import Image from 'next/image'
import { CiHeart } from 'react-icons/ci'
import { AiOutlineUnorderedList, AiOutlineCloseCircle } from 'react-icons/ai'
import { BLUR_DATA_URL } from '@/constants'
import ShareButtonModal from './ShareButtonModal'

export default function HeaderSection({ data }: { data: RoomType }) {
  const [showImageModal, setShowImageModal] = useState<boolean>(false)
  const SHOW_DOUBLE_IMG_BANNER = data?.images?.length > 2
  return (
    <>
      <h1 className="text-lg md:text-3xl font-medium px-4">{data?.title}</h1>
      <div className="w-full flex justify-between items-center px-4">
        <div className="flex gap-2 underline text-xs md:text-sm mt-2">
          {data?.address}
        </div>
        <div className="flex gap-2 text-xs md:text-sm mt-2">
          <ShareButtonModal data={data} />
          <button className="flex gap-2 items-center" type="button">
            <CiHeart />
            <span className="underline">저장</span>
          </button>
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
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[400px] overflow-hidden relative rounded-lg">
            <Image
              src={data?.images?.[0]}
              alt="room img"
              fill
              style={{ objectFit: 'cover', objectPosition: 'middle' }}
              className="rounded-lg absolute bottom-0 top-0 my-auto"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          </div>
        )}
        <button
          onClick={() => setShowImageModal(true)}
          className="absolute right-6 bottom-8 bg-white text-black rounded-md px-4 py-1.5 text-sm border-black flex gap-2 items-center"
        >
          <AiOutlineUnorderedList />
          사진 모두 보기
        </button>
        <div
          className={cn(
            'fixed inset-0 w-screen overflow-y-auto bg-white mx-auto z-10 hidden',
            {
              '!block': showImageModal,
            },
          )}
        >
          <div className="fixed w-full shadow-sm bg-white border-b flex flex-row-reverse">
            <button
              type="button"
              className="p-4"
              onClick={() => setShowImageModal(false)}
            >
              <AiOutlineCloseCircle className="text-2xl text-gray-600" />
            </button>
          </div>
          <div className="flex flex-col gap-4 my-20">
            {data?.images?.map((img) => (
              <Image
                key={img}
                src={img}
                alt="room img"
                width={500}
                height={500}
                style={{ objectFit: 'cover' }}
                className="mx-auto"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
