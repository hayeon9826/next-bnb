'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';

import { RoomType } from '@/interface';
import axios from 'axios';
import { useQueryClient } from 'react-query';

interface CommentFormProps {
  room: RoomType
  refetch: () => void
}

export default function CommentForm({ room, refetch }: CommentFormProps) {
  const [comment, setComment] = useState<string>('');
  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    const res = await axios.post('/api/comments', {
      body: comment,
      roomId: room.id,
    });

    if (res.status === 200) {
      toast.success('댓글을 생성했습니다.');
      setComment('');
      refetch?.();
      queryClient.invalidateQueries(`comments-infinite-${room.id}`);
    } else {
      toast.error('다시 시도해주세요.');
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'comment') {
      setComment(value);
    }
  };

  return (
    <form className="mt-20">
      <textarea
        rows={3}
        onChange={onChange}
        value={comment}
        name="comment"
        required
        placeholder="후기를 작성해주세요..."
        className="block w-full min-h-[120px] resize-none border rounded-md bg-transparent py-2.5 px-4 text-black placeholder:text-gray-400 text-sm leading-6 outline-none focus:border-black"
      />
      <div className="flex flex-row-reverse mt-4">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-rose-600 hover:bg-rose-500 text-white px-8 py-2.5 text-sm font-semibold shadow-sm rounded-md"
        >
          작성하기
        </button>
      </div>
    </form>
  );
}
