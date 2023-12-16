'use client'

import { filterState } from '@/atom'
import { RoomType } from '@/interface'
import { useRecoilState, useRecoilValue } from 'recoil'

import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import { calculatedFilterState } from '@/atom/selector'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function BookingSection({ data }: { data: RoomType }) {
  const router = useRouter()
  const { status } = useSession()
  const [filterValue, setFilterValue] = useRecoilState(filterState)
  const { dayCount, guestCount } = useRecoilValue(calculatedFilterState)
  const totalAmount = data?.price * dayCount * guestCount
  const checkFormValid = totalAmount > 0 && status === 'authenticated'

  const onChangeCheckIn = (e: any) => {
    setFilterValue({
      ...filterValue,
      checkIn: e?.target?.value,
    })
  }
  const onChangeCheckOut = (e: any) => {
    setFilterValue({
      ...filterValue,
      checkOut: e?.target?.value,
    })
  }

  const onChangeGuest = (e: any) => {
    setFilterValue({
      ...filterValue,
      guest: e?.target?.value,
    })
  }

  const totalValue = `₩${totalAmount?.toLocaleString()}`

  const handleSubmit = useCallback(() => {
    router.prefetch(
      `/rooms/${data.id}/bookings?checkIn=${filterValue?.checkIn}&checkOut=${filterValue?.checkOut}&guestCount=${guestCount}&totalAmount=${totalAmount}&totalDays=${dayCount}`,
    )
    router.push(
      `/rooms/${data.id}/bookings?checkIn=${filterValue?.checkIn}&checkOut=${filterValue?.checkOut}&guestCount=${guestCount}&totalAmount=${totalAmount}&totalDays=${dayCount}`,
    )
  }, [data, filterValue, guestCount, totalAmount, dayCount])

  return (
    <div className="w-full">
      <div className="mt-8 shadow-lg rounded-lg border border-300 px-6 py-8 md:sticky md:top-20">
        <div className="text-gray-600 flex justify-between items-center">
          <div>
            <span className="font-semibold text-lg text-black md:text-xl">
              {data?.price?.toLocaleString()} 원
            </span>{' '}
            /박
          </div>
          <div className="text-xs">후기 15개</div>
        </div>
        <form className="mt-2">
          <div className="mt-2">
            <label className="text-xs font-semibold">체크인</label>
            <input
              type="date"
              value={filterValue?.checkIn || dayjs()?.format('YYYY-MM-DD')}
              min={dayjs()?.format('YYYY-MM-DD')}
              onChange={onChangeCheckIn}
              className="w-full px-4 py-3 border border-gray-400 rounded-md text-xs mt-1"
            />
          </div>
          <div className="mt-2">
            <label className="text-xs font-semibold">체크아웃</label>
            <input
              type="date"
              onChange={onChangeCheckOut}
              min={filterValue?.checkIn || dayjs()?.format('YYYY-MM-DD')}
              value={filterValue?.checkOut || dayjs()?.format('YYYY-MM-DD')}
              className="w-full px-4 py-3 border border-gray-400 rounded-md text-xs mt-1"
            />
          </div>
          <div className="mt-2">
            <label className="text-xs font-semibold">인원</label>
            <select
              onChange={onChangeGuest}
              value={filterValue?.guest}
              className="w-full px-4 py-3 border border-gray-400 rounded-md text-xs mt-1"
            >
              {[...Array(20)]?.map((_, i) => (
                <option value={i + 1} key={i}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-6">
            <button
              type="button"
              disabled={!checkFormValid}
              onClick={handleSubmit}
              className="bg-rose-500 hover:bg-rose-600 text-white rounded-md py-2.5 w-full disabled:bg-gray-300"
            >
              예약하기
            </button>
          </div>
          <div className="text-center text-gray-600 mt-4 text-xs md:text-sm">
            예약 확정 전에는 요금이 청구되지 않습니다.
          </div>
        </form>
        <div className="mt-4 flex flex-col gap-2 border-b-gray-300 border-b pb-4  text-xs md:text-sm">
          <div className="flex justify-between">
            <div className="text-gray-600 underline">
              ₩{data?.price?.toLocaleString()} x{dayCount}박
            </div>
            <div className="text-gray-500">{totalValue}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-gray-600 underline">청소비</div>
            <div className="text-gray-500">₩0</div>
          </div>
          <div className="flex justify-between">
            <div className="text-gray-600 underline">nextBnb 수수료</div>
            <div className="text-gray-500">₩0</div>
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <div>총 합계</div>
          <div>{totalValue}</div>
        </div>
      </div>
    </div>
  )
}
