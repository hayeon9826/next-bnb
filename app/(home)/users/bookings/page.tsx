'use client'

import { ListLoader } from '@/components/Loader'
import { BookingType, bookingStatusMessage } from '@/interface'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useInfiniteQuery } from 'react-query'

import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import { BiChevronRight } from 'react-icons/bi'

export default function BookingsPage() {
  const router = useRouter()
  const { data: session } = useSession()

  const fetchBookings = async ({ pageParam = 1 }) => {
    const { data } = await axios(`/api/bookings?page=${pageParam}`, {
      params: {
        limit: 5,
        page: pageParam,
        userId: session?.user?.id,
      },
    })
    return data
  }

  const {
    data: bookings,
    fetchNextPage,
    isLoading,
    hasNextPage,
  } = useInfiniteQuery(`bookings-user-${session?.user?.id}`, fetchBookings, {
    getNextPageParam: (lastPage: any) =>
      lastPage.data?.length > 0 ? lastPage.page + 1 : undefined,
    enabled: !!session?.user?.id,
  })

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage()
    if (res.isError) {
      console.log(res.error)
    }
  }, [fetchNextPage])

  return (
    <>
      <h1 className="font-semibold text-lg md:text-2xl max-w-7xl mx-auto px-4">
        나의 예약 리스트
      </h1>
      <div className="mt-2 text-gray-500 max-w-7xl mx-auto px-4">
        나의 예약 일정입니다.
      </div>
      {isLoading ? (
        <ListLoader className="mb-20 mt-10 md:!grid-cols-1" />
      ) : (
        <div className="mb-20 mt-10 flex flex-col gap-8 px-4">
          {bookings?.pages?.[0]?.totalCount > 0 ? (
            bookings?.pages?.map((page, index) => (
              <React.Fragment key={index}>
                {page.data.map((booking: BookingType) => (
                  <div
                    key={booking?.id}
                    className="flex flex-col gap-6 border-b w-full pb-8 hover:bg-black/5 cursor-pointer p-6"
                  >
                    <div className="text-lg md:text-xl font-semibold">
                      {bookingStatusMessage?.[booking.status]}
                    </div>
                    <div className="flex gap-4 items-center">
                      <img
                        src={booking?.room?.images?.[0] || '/images/logo.png'}
                        width={80}
                        height={80}
                        className="rounded-md"
                        alt="booking img"
                      />
                      <div className="flex flex-col gap-1 w-full">
                        <div className="flex gap-4 items-center flex-wrap justify-between">
                          <h1 className="font-semibold">
                            {booking?.room?.address}
                          </h1>
                          <button
                            type="button"
                            onClick={() =>
                              router.push(`/rooms/${booking?.roomId}`)
                            }
                            className="underline font-semibold text-left flex gap-1 items-center justify-start hover:text-gray-500"
                          >
                            숙소 보기 <BiChevronRight className="text-xl" />
                          </button>
                        </div>
                        <div className="text-gray-500">
                          {booking?.room?.title}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {dayjs(booking?.checkIn)?.format('YYYY년 MM월 DD일')}{' '}
                          -{' '}
                          {dayjs(booking?.checkOut)?.format('YYYY년 MM월 DD일')}{' '}
                          · {booking?.guestCount}명
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() =>
                          router.push(`/users/bookings/${booking?.id}`)
                        }
                        className="text-white bg-rose-500 rounded-md hover:bg-rose-600 px-4 py-2.5"
                      >
                        예약내역 확인
                      </button>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))
          ) : (
            <div className="border md:col-span-2 p-4 rounded-md text-gray-600 my-10">
              예약 내역이 없습니다.
            </div>
          )}
          {hasNextPage && (
            <button
              onClick={fetchNext}
              className="mt-8 flex gap-2 items-center text-sm bg-black rounded-full text-white px-5 py-3.5 shadow-sm mx-auto hover:shadow-lg"
            >
              예약내역 더 불러오기
            </button>
          )}
        </div>
      )}
    </>
  )
}
