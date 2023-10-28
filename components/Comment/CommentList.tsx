'use client'

import { useState } from 'react'
import { BiChevronRight } from 'react-icons/bi'
import CommentListModal from './CommentListModal'
import { CommentApiProps } from '@/interface'
import { Loader } from '../Loader'

export default function CommentList({
  comments,
  roomId,
  isLoading,
}: {
  comments?: CommentApiProps
  roomId: number
  isLoading: boolean
}) {
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  return (
    <>
      <h1 className="font-semibold text-xl mb-2">
        후기 {comments?.totalCount || 0}개
      </h1>
      <div className="mt-8 grid md:grid-cols-2 gap-12">
        {isLoading ? (
          <Loader className="col-span-2" />
        ) : (
          comments?.data?.map((comment) => (
            <div key={comment?.id} className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <img
                  src={comment?.user?.image || '/images/logo.png'}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <h1 className="font-semibold">
                    {comment?.user?.name || '-'}
                  </h1>
                  <div className="text-gray-500 text-xs">
                    {comment?.createdAt}
                  </div>
                </div>
              </div>
              <div className="text-gray-600 max-w-md">{comment?.body}</div>
              <button
                type="button"
                onClick={openModal}
                className="underline font-semibold text-left flex gap-1 items-center justify-start"
              >
                더보기 <BiChevronRight className="text-xl" />
              </button>
            </div>
          ))
        )}
      </div>
      {comments?.totalCount === 0 ? (
        <div className="mt-8 mb-20">
          <button className="border border-gray-700 font-semibold rounded-lg px-6 py-4 flex items-center gap-4 hover:bg-black/5">
            아직 작성된 후기가 없습니다.
          </button>
        </div>
      ) : (
        <div className="mt-8 mb-20" onClick={openModal}>
          <button className="border border-gray-700 font-semibold rounded-lg px-6 py-4 flex items-center gap-4 hover:bg-black/5">
            후기 {comments?.totalCount || 0}개 모두보기
          </button>
        </div>
      )}
      {isOpen && (
        <CommentListModal
          isOpen={isOpen}
          closeModal={closeModal}
          roomId={roomId}
        />
      )}
    </>
  )
}
