import { RoomType } from '@/interface'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

export default function Comment({ data }: { data: RoomType }) {
  return (
    <div className="border-b border-gray-300 py-8 px-4 text-gray-800">
      <CommentList />
      <CommentForm />
    </div>
  )
}
