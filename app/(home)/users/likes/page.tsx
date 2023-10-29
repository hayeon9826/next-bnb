'use client'

import { GridLoader, Loader } from '@/components/Loader'
import { GridLayout, RoomItem } from '@/components/RoomGrid'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import { Like } from '@/interface'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React from 'react'
import { useCallback, useEffect, useRef } from 'react'
import { useInfiniteQuery } from 'react-query'

export default function UserLikes() {
  const ref = useRef<HTMLDivElement | null>(null)
  const pageRef = useIntersectionObserver(ref, {})
  const isPageEnd = !!pageRef?.isIntersecting
  const { data: session } = useSession()

  const fetchLikes = async ({ pageParam = 1 }) => {
    const { data } = await axios('/api/likes?page=' + pageParam, {
      params: {
        limit: 12,
        page: pageParam,
      },
    })

    return data
  }

  const {
    data: likes,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery(`likes-user-${session?.user?.id}`, fetchLikes, {
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
      <h1 className="font-semibold text-lg md:text-2xl max-w-7xl mx-auto px-4">
        찜한 숙소 리스트
      </h1>
      <div className="mt-2 text-gray-500 max-w-7xl mx-auto px-4">
        찜한 숙소 리스트입니다.
      </div>
      {isLoading ? (
        <GridLoader />
      ) : (
        <GridLayout>
          {likes?.pages?.[0]?.totalCount > 0 ? (
            likes?.pages?.map((page, index) => (
              <React.Fragment key={index}>
                {page.data.map((like: Like) => (
                  <RoomItem room={like?.room} key={like?.room?.id} />
                ))}
              </React.Fragment>
            ))
          ) : (
            <div className="border md:col-span-4 p-4 rounded-md text-gray-600 my-10">
              작성한 후기가 없습니다.
            </div>
          )}
        </GridLayout>
      )}
      {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}
      <div className="w-full touch-none h-10 mb-10" ref={ref} />
    </>
  )
}
