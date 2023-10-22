'use client'

import React, { useCallback, useEffect, useRef } from 'react'

import { useInfiniteQuery } from 'react-query'
import axios from 'axios'
import { BsMap } from 'react-icons/bs'
import { useRouter } from 'next/navigation'

import CategoryList from '@/components/CategoryList'
import { Loader, LoaderGrid } from '@/components/Loader'
import { GridLayout, RoomItem } from '@/components/RoomGrid'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import { RoomType } from '@/interface'

export default function Home() {
  const router = useRouter()
  const ref = useRef<HTMLDivElement | null>(null)
  const pageRef = useIntersectionObserver(ref, {})
  const isPageEnd = !!pageRef?.isIntersecting

  const fetchRooms = async ({ pageParam = 1 }) => {
    // Error Boundary 테스트: 아래 url 변경 후 테스트하기
    const { data } = await axios('/api/rooms?page=' + pageParam, {
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
  } = useInfiniteQuery('rooms', fetchRooms, {
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
    <>
      <CategoryList />
      {isLoading || isFetching ? (
        <LoaderGrid />
      ) : (
        <GridLayout>
          {rooms?.pages?.map((page, index) => (
            <React.Fragment key={index}>
              {page.data.map((room: RoomType) => (
                <RoomItem room={room} key={room.id} />
              ))}
            </React.Fragment>
          ))}
        </GridLayout>
      )}
      <button
        onClick={() => router.push('/map')}
        className="flex gap-2 items-center text-sm bg-black rounded-full text-white px-5 py-3.5 shadow-sm sticky bottom-12 mx-auto hover:shadow-lg"
      >
        지도 표시하기 <BsMap className="text-xs" />
      </button>
      {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}
      <div className="w-full touch-none h-10 mb-10" ref={ref} />
    </>
  )
}
