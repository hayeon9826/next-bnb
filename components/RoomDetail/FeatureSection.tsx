import Image from 'next/image'

import { RoomType } from '@/interface'
import {
  AiOutlineCheckCircle,
  AiOutlineDesktop,
  AiOutlineWifi,
} from 'react-icons/ai'
import { BsDoorClosed, BsFan } from 'react-icons/bs'
import { IoBedOutline } from 'react-icons/io5'
import { PiMountainsDuotone, PiBathtub } from 'react-icons/pi'
import { MdOutlineLocalLaundryService } from 'react-icons/md'
import { LuParkingCircle } from 'react-icons/lu'
import { GiBarbecue } from 'react-icons/gi'
import { FeatureDesc } from '@/constants'

import cn from 'classnames'
import BookingSection from './BookingSection'
import CalendarSection from './CalendarSection'

export default function FeatureSection({ data }: { data: RoomType }) {
  return (
    <div className="md:grid md:grid-cols-3 gap-8 mt-8 relative">
      <div className="col-span-2">
        <div className="flex items-center justify-between px-4">
          <div>
            <h1 className="text-lg md:text-xl">
              {data?.user?.name ?? '사용자'}님이 호스팅하는 숙소
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {data?.user?.desc ?? '호스트 설명이 없습니다.'}
            </p>
          </div>
          <img
            src={data?.user?.image || '/images/logo.png'}
            alt="logo"
            width={50}
            height={50}
            className="rounded-full shadow"
          />
        </div>
        <div className="mt-4 flex flex-col gap-6 py-6 border-y border-gray-300">
          <div className="flex gap-6 items-center px-4">
            <AiOutlineCheckCircle className="text-lg md:text-2xl" />
            <div>
              <div className="font-semibold">무료 취소</div>
              <div className="text-sm text-gray-400">
                {data?.freeCancel
                  ? FeatureDesc.FREE_CANCEL
                  : FeatureDesc.PAID_CANCEL}
              </div>
            </div>
          </div>
          <div className="flex gap-6 items-center px-4">
            <BsDoorClosed className="text-lg md:text-2xl" />
            <div>
              <div className="font-semibold">셀프 체크인</div>
              <div className="text-sm text-gray-400">
                {data?.selfCheckIn
                  ? FeatureDesc.SELF_CHECKIN
                  : FeatureDesc.SELF_CHECKIN_DISALLOWED}
              </div>
            </div>
          </div>
          <div className="flex gap-6 items-center px-4">
            <AiOutlineDesktop className="text-lg md:text-2xl" />
            <div>
              <div className="font-semibold">사무 시설</div>
              <div className="text-sm text-gray-400">
                {data?.officeSpace
                  ? FeatureDesc.HAS_OFFICE_SPACE
                  : FeatureDesc.NO_OFFICE_SPACE}
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-300 py-8 px-4 leading-8 text-gray-800">
          <h1 className="font-semibold text-xl mb-2">숙소 설명</h1>
          {data?.desc ?? '설명이 없습니다.'}
        </div>
        <div className="border-b border-gray-300 py-8 px-4 text-gray-800">
          <h1 className="font-semibold text-xl mb-2">숙박 장소</h1>
          <div className="mt-4 rounded-lg p-5 border border-gray-300 max-w-[200px]">
            <IoBedOutline className="text-2xl" />
            <h1 className="font-semibold mt-2">침실 1</h1>
            <p className="text-gray-500 text-sm mt-2">
              {data?.bedroomDesc ?? '설명이 없습니다.'}
            </p>
          </div>
        </div>
        <div className="border-b border-gray-300 py-8 px-4 text-gray-800">
          <h1 className="font-semibold text-xl mb-2">숙소 편의시설</h1>
          <div className="grid md:grid-cols-2 gap-1">
            <FeatureSection.FeatureItem
              icon={<AiOutlineCheckCircle className="text-lg md:text-2xl" />}
              featureTitle="무료 취소"
              hasFeature={data.freeCancel}
            />
            <FeatureSection.FeatureItem
              icon={<BsDoorClosed className="text-lg md:text-2xl" />}
              featureTitle="셀프 체크인"
              hasFeature={data.selfCheckIn}
            />
            <FeatureSection.FeatureItem
              icon={<AiOutlineDesktop className="text-lg md:text-2xl" />}
              featureTitle="사무시설"
              hasFeature={data.officeSpace}
            />
            <FeatureSection.FeatureItem
              icon={<PiMountainsDuotone className="text-lg md:text-2xl" />}
              featureTitle="마운틴 뷰"
              hasFeature={data.hasMountainView}
            />
            <FeatureSection.FeatureItem
              icon={<PiBathtub className="text-lg md:text-2xl" />}
              featureTitle="샴푸 및 욕실 용품"
              hasFeature={data.hasShampoo}
            />
            <FeatureSection.FeatureItem
              icon={
                <MdOutlineLocalLaundryService className="text-lg md:text-2xl" />
              }
              featureTitle="무료 세탁"
              hasFeature={data.hasFreeLaundry}
            />
            <FeatureSection.FeatureItem
              icon={<BsFan className="text-lg md:text-2xl" />}
              featureTitle="에어컨"
              hasFeature={data.hasAirConditioner}
            />
            <FeatureSection.FeatureItem
              icon={<AiOutlineWifi className="text-lg md:text-2xl" />}
              featureTitle="무료 와이파이"
              hasFeature={data.hasWifi}
            />
            <FeatureSection.FeatureItem
              icon={<GiBarbecue className="text-lg md:text-2xl" />}
              featureTitle="바베큐 시설"
              hasFeature={data.hasBarbeque}
            />
            <FeatureSection.FeatureItem
              icon={<LuParkingCircle className="text-lg md:text-2xl" />}
              featureTitle="무료 주차"
              hasFeature={data.hasFreeParking}
            />
          </div>
        </div>
        <div className="border-b border-gray-300 py-8 px-4 text-gray-800">
          <h1 className="font-semibold text-xl mb-2">캘린더</h1>
          <CalendarSection />
        </div>
      </div>
      <BookingSection data={data} />
    </div>
  )
}

interface FeatureItemType {
  hasFeature: boolean
  featureTitle: string
  icon: React.ReactNode
}

FeatureSection.FeatureItem = ({
  hasFeature,
  featureTitle,
  icon,
}: FeatureItemType) => {
  return (
    <div className="flex gap-2 items-center mt-4">
      {icon}
      <span
        className={cn('text-gray-600', {
          'line-through': !hasFeature,
        })}
      >
        {featureTitle}
      </span>
    </div>
  )
}
