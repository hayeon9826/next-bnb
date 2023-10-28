'use client'

import { RoomType } from '@/interface'
import CommentForm from './CommentForm'
import CommentList from './CommentList'
import axios from 'axios'
import { useQuery } from 'react-query'
import { useSession } from 'next-auth/react'

export default function Comment({ room }: { room: RoomType }) {
  const { status } = useSession()
  const fetchComments = async () => {
    const { data } = await axios(`/api/comments?roomId=${room.id}&limit=6`)
    return data
  }

  const {
    data: comments,
    refetch,
    isLoading,
  } = useQuery(`comments-${room.id}`, fetchComments, {
    enabled: !!room.id,
  })

  return (
    <div className="border-b border-gray-300 py-8 px-4 text-gray-800">
      <CommentList comments={comments} roomId={room.id} isLoading={isLoading} />
      {status === 'authenticated' && (
        <CommentForm room={room} refetch={refetch} />
      )}
    </div>
  )
}
