'use client'

import { CommentType, RoomType } from '@/interface'
import CommentForm from './CommentForm'
import CommentList from './CommentList'
import axios from 'axios'
import { useQuery } from 'react-query'

export default function Comment({ room }: { room: RoomType }) {
  const fetchComments = async () => {
    const { data } = await axios(`/api/comments?roomId=${room.id}&limit=6`)

    return data
  }

  const { data: comments, refetch } = useQuery(
    `comments-${room.id}`,
    fetchComments,
    {
      enabled: !!room.id,
    },
  )

  return (
    <div className="border-b border-gray-300 py-8 px-4 text-gray-800">
      <CommentList data={comments} roomId={room.id} />
      <CommentForm room={room} refetch={refetch} />
    </div>
  )
}
