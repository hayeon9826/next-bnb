'use client'

import React, { useCallback, useEffect, useRef } from 'react'

import { useInfiniteQuery } from 'react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'

import CategoryList from '@/components/CategoryList'
import { Loader, GridLoader } from '@/components/Loader'
import { GridLayout, RoomItem } from '@/components/RoomGrid'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import { RoomType } from '@/interface'
import { MapButton } from '@/components/Map'
import { useRecoilValue } from 'recoil'
import { filterState } from '@/atom'

export default function Home() {
  const router = useRouter()
  const ref = useRef<HTMLDivElement | null>(null)
  const filterValue = useRecoilValue(filterState)
  const pageRef = useIntersectionObserver(ref, {})
  const isPageEnd = !!pageRef?.isIntersecting

  const filterParams = {
    location: filterValue.location,
    category: filterValue.category,
  }

  const fetchRooms = async ({ pageParam = 1 }) => {
    // Error Boundary 테스트: 아래 url 변경 후 테스트하기
    const { data } = await axios(`/api/rooms?page=${pageParam}`, {
      params: {
        limit: 12,
        page: pageParam,
        ...filterParams,
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
  } = useInfiniteQuery(['rooms', filterParams], fetchRooms, {
    getNextPageParam: (lastPage: any) =>
      lastPage.data?.length > 0 ? lastPage.page + 1 : undefined,
  })

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage()
    if (res.isError) {
      console.log(res.error)
    }
  }, [fetchNextPage])

  const goToMapPage = () => {
    router.replace('/map')
  }

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined

    if (isPageEnd && hasNextPage) {
      timerId = setTimeout(() => {
        fetchNext()
      }, 500)
    }

    return () => clearTimeout(timerId)
  }, [fetchNext, isPageEnd, hasNextPage])

  if (isError) {
    throw new Error('room API fetching error')
  }

  return (
    <>
      <CategoryList />
      {isLoading ? (
        <GridLoader />
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
      <MapButton onClick={goToMapPage} />
      {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}
      <div className="w-full touch-none h-10 mb-10" ref={ref} />
    </>
  )
}
