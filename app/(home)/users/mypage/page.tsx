'use client'

import { UserType } from '@/interface'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { AiOutlineUser, AiOutlineHeart, AiOutlineComment } from 'react-icons/ai'
import { BsHouseAdd, BsHouseCheck } from 'react-icons/bs'
import { useQuery } from 'react-query'

export default function Mypage() {
  const { status } = useSession()

  const fetchUser = async () => {
    const { data } = await axios('/api/users')
    return data as UserType
  }

  const { data: user, isSuccess } = useQuery('user', fetchUser, {
    enabled: status === 'authenticated',
    refetchOnMount: false,
  })

  return (
    <div className="mt-10 max-w-5xl mx-auto px-4">
      <h1 className="text-3xl font-semibold">계정</h1>
      <div className="flex gap-2 mt-2 text-lg">
        <div className="font-semibold">{user?.name || '사용자'}</div>
        <div className="font-semibold">·</div>
        <div className="text-gray-700">{user?.email || 'user@nextbnb'}</div>
      </div>
      <div className="grid md:grid-cols-3 gap-4 mt-12 mb-20">
        <Link
          href="/users/info"
          className="shadow-lg rounded-lg flex flex-col justify-between p-4 gap-12 cursor-pointer hover:shadow-xl"
        >
          <AiOutlineUser className="text-xl md:text-3xl" />
          <div>
            <h1 className="font-semibold">개인정보</h1>
            <h2 className="text-sm text-gray-500">개인정보 및 연락처 정보</h2>
          </div>
        </Link>
        <div className="shadow-lg rounded-lg flex flex-col justify-between p-4 gap-12 cursor-pointer hover:shadow-xl">
          <BsHouseAdd className="text-xl md:text-3xl" />
          <div>
            <h1 className="font-semibold">숙소 등록</h1>
            <h2 className="text-sm text-gray-500">나의 숙소 등록하기</h2>
          </div>
        </div>
        <div className="shadow-lg rounded-lg flex flex-col justify-between p-4 gap-12 cursor-pointer hover:shadow-xl">
          <BsHouseCheck className="text-xl md:text-3xl" />
          <div>
            <h1 className="font-semibold">숙소 관리</h1>
            <h2 className="text-sm text-gray-500">나의 숙소 관리하기</h2>
          </div>
        </div>
        <div className="shadow-lg rounded-lg flex flex-col justify-between p-4 gap-12 cursor-pointer hover:shadow-xl">
          <AiOutlineHeart className="text-xl md:text-3xl" />
          <div>
            <h1 className="font-semibold">찜한 숙소</h1>
            <h2 className="text-sm text-gray-500">찜한 숙소 모아보기</h2>
          </div>
        </div>
        <div className="shadow-lg rounded-lg flex flex-col justify-between p-4 gap-12 cursor-pointer hover:shadow-xl">
          <AiOutlineComment className="text-xl md:text-3xl" />
          <div>
            <h1 className="font-semibold">나의 댓글</h1>
            <h2 className="text-sm text-gray-500">나의 댓글 모아보기</h2>
          </div>
        </div>
      </div>
    </div>
  )
}
