'use client'

import { RoomType } from '@/interface'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useRef } from 'react'
import { useInfiniteQuery } from 'react-query'

import dayjs from 'dayjs'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import { Loader } from '@/components/Loader'
import { Domains } from '@/constants'

export default function UserRooms() {
  const router = useRouter()
  const ref = useRef<HTMLDivElement | null>(null)
  const pageRef = useIntersectionObserver(ref, {})
  const isPageEnd = !!pageRef?.isIntersecting
  const { data: session } = useSession()

  const fetchMyRooms = async ({ pageParam = 1 }) => {
    const { data } = await axios('/api/rooms?my=true&page=' + pageParam, {
      params: {
        limit: 12,
        page: pageParam,
      },
    })

    return data
  }

  const {
    data: rooms,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery(`rooms-user-${session?.user?.id}`, fetchMyRooms, {
    getNextPageParam: (lastPage: any) =>
      lastPage.data?.length > 0 ? lastPage.page + 1 : undefined,
  })

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage()
    if (res.isError) {
      console.log(res.error)
    }
  }, [fetchNextPage])

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined

    if (isPageEnd && hasNextPage) {
      timerId = setTimeout(() => {
        fetchNext()
      }, 500)
    }

    return () => clearTimeout(timerId)
  }, [fetchNext, isPageEnd, hasNextPage])

  if (!!isError) {
    throw new Error('room API fetching error')
  }

  return (
    <div className="relative mt-10 mb-40 w-full px-4 overflow-auto">
      <h1 className="mb-10 text-lg md:text-2xl font-semibold">
        나의 숙소 관리
      </h1>
      <table className="text-sm text-left text-gray-500 shadow-lg overflow-x-scroll table-auto">
        <UserRooms.TableHead />
        <tbody>
          {rooms?.pages?.[0]?.totalCount > 0 ? (
            rooms?.pages?.map((page, index) => (
              <React.Fragment key={index}>
                {page?.data?.map((room: RoomType) => (
                  <tr className="bg-white border-b" key={room.id}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {room.title}
                    </th>
                    <td className="px-6 py-4">{room?.address}</td>
                    <td className="px-6 py-4">{room?.category}</td>
                    <td className="px-6 py-4">{`${room?.price?.toLocaleString()} 원`}</td>
                    <td className="px-6 py-4">
                      {dayjs(room?.createdAt).format('YYYY-MM-DD HH:MM:ss')}
                    </td>
                    <td className="px-6 py-4">
                      {dayjs(room?.updatedAt).format('YYYY-MM-DD HH:MM:ss')}
                    </td>
                    <td className="px-6 py-4 min-w-[100px]">
                      <Link
                        href={`/rooms/${room.id}`}
                        className="font-medium text-gray-600  hover:underline"
                      >
                        보기
                      </Link>
                    </td>
                    <td className="px-6 py-4 min-w-[100px]">
                      <Link
                        href={`/rooms/edit/${room.id}`}
                        className="font-medium text-gray-600  hover:underline"
                      >
                        수정
                      </Link>
                    </td>
                    <td className="px-6 py-4 min-w-[100px]">
                      <Link
                        href="#"
                        className="font-medium text-rose-600  hover:underline"
                      >
                        삭제
                      </Link>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))
          ) : (
            <tr className="bg-white border-b">
              <td className="px-6 py-4 text-center" colSpan={9}>
                <div className="mt-2">등록한 숙소가 없습니다.</div>
                <button
                  onClick={() => router.push(Domains.REGISTER_ROOM)}
                  className="mt-4 px-4 py-2 rounded-md bg-rose-600 text-white hover:bg-rose-500"
                >
                  숙소 등록하러 가기
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}
      <div className="w-full touch-none h-10 mb-10" ref={ref} />
    </div>
  )
}

UserRooms.TableHead = () => {
  return (
    <thead className="text-xs text-gray-700 bg-gray-50">
      <tr>
        <th scope="col" className="px-6 py-3 min-w-[120px]">
          숙소
        </th>
        <th scope="col" className="px-6 py-3 min-w-[300px]">
          주소
        </th>
        <th scope="col" className="px-6 py-3 min-w-[120px]">
          카테고리
        </th>
        <th scope="col" className="px-6 py-3 min-w-[120px]">
          가격
        </th>
        <th scope="col" className="px-6 py-3 min-w-[200px]">
          생성 날짜
        </th>
        <th scope="col" className="px-6 py-3 min-w-[200px]">
          업데이트 날짜
        </th>
        <th scope="col" className="px-6 py-3 min-w-[80px]">
          상세보기
        </th>
        <th scope="col" className="px-6 py-3 min-w-[80px]">
          수정
        </th>
        <th scope="col" className="px-6 py-3 min-w-[80px]">
          삭제
        </th>
      </tr>
    </thead>
  )
}
