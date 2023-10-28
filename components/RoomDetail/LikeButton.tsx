import { toast } from 'react-hot-toast'

import { RoomType } from '@/interface'
import { CiHeart } from 'react-icons/ci'

export default function LikeButton({ data }: { data: RoomType }) {
  const toggleLike = () => {
    toast.success('찜 목록에 추가했습니다.')
  }

  return (
    <button
      onClick={toggleLike}
      className="flex gap-2 items-center rounded-md px-3 py-1.5 hover:bg-black/5"
      type="button"
    >
      <CiHeart />
      <span className="underline">저장</span>
    </button>
  )
}
