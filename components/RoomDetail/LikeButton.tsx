'use client'

import { toast } from 'react-hot-toast'

import { RoomType } from '@/interface'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { useQuery } from 'react-query'
import { event } from '@/utils/gtag'

export default function LikeButton({ roomId }: { roomId: number }) {
  const { data: session, status } = useSession()

  const fetchRoom = async () => {
    const { data } = await axios(`/api/rooms?id=${roomId}`)
    return data as RoomType
  }

  const { data: room, refetch } = useQuery<RoomType>(
    `like-room-${roomId}`,
    fetchRoom,
    {
      enabled: !!roomId,
      refetchOnWindowFocus: false,
    },
  )

  const toggleLike = async () => {
    // 찜하기/찜취소 로직
    if (session?.user && room) {
      try {
        const like = await axios.post('/api/likes', {
          roomId: room.id,
        })

        if (like.status === 201) {
          toast.success('숙소를 찜했습니다.')
        } else {
          toast.error('찜을 취소했습니다.')
        }
        event({
          action: 'click_like',
          category: 'like',
          label: like.status === 201 ? 'create_like' : 'delete_like',
          value: roomId,
        })
        refetch()
      } catch (e) {
        console.log(e)
      }
    } else {
      toast.error('로그인 후 시도해주세요')
      event({
        action: 'click_like',
        category: 'like',
        label: 'need_login_like',
        value: roomId,
      })
    }
  }

  return (
    <button
      onClick={toggleLike}
      className="flex gap-2 items-center rounded-md px-3 py-1.5 hover:bg-black/5"
      type="button"
    >
      {/* 로그인된 사용자가 좋아요를 눌렀다면? */}
      {status === 'authenticated' && room?.likes?.length ? (
        <>
          <AiFillHeart className="hover:text-red-600 focus:text-red-600 text-red-500" />
          <span className="underline">취소하기</span>
        </>
      ) : (
        <>
          <AiOutlineHeart className="hover:text-red-600 focus:text-red-600" />
          <span className="underline">저장하기</span>
        </>
      )}
    </button>
  )
}
