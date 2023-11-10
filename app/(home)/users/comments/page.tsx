'use client'

import { ListLoader, Loader } from '@/components/Loader'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import { CommentType } from '@/interface'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useCallback, useEffect, useRef } from 'react'
import { useInfiniteQuery } from 'react-query'

import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import { BiChevronRight } from 'react-icons/bi'
import { useRouter } from 'next/navigation'

export default function UserComments() {
  const router = useRouter()
  const ref = useRef<HTMLDivElement | null>(null)
  const pageRef = useIntersectionObserver(ref, {})
  const isPageEnd = !!pageRef?.isIntersecting
  const { data: session } = useSession()

  const fetchComments = async ({ pageParam = 1 }) => {
    const { data } = await axios(`/api/comments?my=true&page=${pageParam}`, {
      params: {
        limit: 12,
        page: pageParam,
      },
    })
    return data
  }

  const {
    data: comments,
    fetchNextPage,
    isLoading,
    isFetching,
    hasNextPage,
  } = useInfiniteQuery(
    `comments-infinite-user-${session?.user?.id}`,
    fetchComments,
    {
      getNextPageParam: (lastPage: any) =>
        lastPage.data?.length > 0 ? lastPage.page + 1 : undefined,
    },
  )

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

  return (
    <>
      <h1 className="font-semibold text-lg md:text-2xl max-w-7xl mx-auto px-4">
        나의 후기 리스트
      </h1>
      <div className="mt-2 text-gray-500 max-w-7xl mx-auto px-4">
        내가 쓴 후기 리스트입니다.
      </div>
      {isLoading ? (
        <ListLoader className="mt-12" />
      ) : (
        <div className="mt-12 grid md:grid-cols-2 gap-12 px-4">
          {comments?.pages?.[0]?.totalCount > 0 ? (
            comments?.pages?.map((page, index) => (
              <React.Fragment key={index}>
                {page.data.map((comment: CommentType) => (
                  <div key={comment?.id} className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                      <img
                        src={comment?.user?.image || '/images/logo.png'}
                        width={50}
                        height={50}
                        className="rounded-full"
                        alt="user img"
                      />
                      <div>
                        <h1 className="font-semibold">
                          {comment?.user?.name || '-'}
                        </h1>
                        <div className="text-gray-500 text-xs">
                          {dayjs(comment?.createdAt)?.format(
                            'YYYY-MM-DD HH:MM:ss',
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-600 max-w-md">
                      {comment?.body}
                    </div>
                    <button
                      type="button"
                      onClick={() => router.push(`/rooms/${comment?.roomId}`)}
                      className="underline font-semibold text-left flex gap-1 items-center justify-start hover:text-gray-500"
                    >
                      <BiChevronRight className="text-xl" />
                    </button>
                  </div>
                ))}
              </React.Fragment>
            ))
          ) : (
            <div className="border md:col-span-2 p-4 rounded-md text-gray-600 my-10">
              작성한 후기가 없습니다.
            </div>
          )}
        </div>
      )}
      {(isFetching || hasNextPage) && <Loader />}
      <div className="w-full touch-none h-10 mb-10" ref={ref} />
    </>
  )
}
