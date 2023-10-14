'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { RxDividerVertical } from 'react-icons/rx'
import { AiOutlineSearch, AiOutlineMenu, AiOutlineUser } from 'react-icons/ai'
import { MdModeOfTravel } from 'react-icons/md'

const menus = [
  { id: 1, title: '로그인', url: '/users/login' },
  { id: 2, title: '회원가입', url: '/users/signup' },
  { id: 3, title: 'FAQ', url: '/faqs' },
]

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false)
  const router = useRouter()

  return (
    <nav className="h-20 border border-b-gray-20 w-full shadow-sm px-4 py-4 sm:px-10 flex justify-between align-center fixed top-0 bg-white">
      <div className="hidden my-auto font-semibold text-lg sm:text-xl text-rose-500 cursor-pointer grow basis-0 sm:flex sm:gap-2">
        <MdModeOfTravel className="text-4xl my-auto" />
        <div className=" my-auto">nextbnb</div>
      </div>
      <div className="w-full sm:w-[340px] border border-gray-20 rounded-full shadow hover:shadow-lg cursor-pointer flex justify-between pl-6 pr-2">
        <div className="flex justify-center gap-1">
          <div className="my-auto font-semibold text-sm">어디든지</div>
          <RxDividerVertical className="text-gray-200 my-auto text-2xl" />
          <div className="my-auto font-semibold text-sm">언제든 일주일</div>
          <RxDividerVertical className="text-gray-200 my-auto text-2xl" />
          <div className="my-auto text-sm text-gray-500">게스트 추가</div>
        </div>
        <button className="bg-rose-500 text-white rounded-full w-8 h-8 my-auto">
          <AiOutlineSearch className="font-semibold text-lg m-auto" />
        </button>
      </div>
      <div className="hidden sm:flex gap-4 align-middle my-auto grow basis-0 justify-end relative">
        <button className="font-semibold text-sm my-auto px-4 py-3 rounded-full hover:bg-gray-50">
          당신의 공간을 등록해주세요
        </button>
        <div
          className="flex align-middle gap-3 rounded-full border border-gray-20 shadow-sm px-4 py-3 my-auto hover:shadow-lg cursor-pointer"
          onClick={() => setShowMenu((val) => !val)}
        >
          <AiOutlineMenu />
          <AiOutlineUser />
        </div>
        {showMenu && (
          <div className="border border-gray-20 shadow-lg py-2 flex flex-col absolute bg-white w-60 rounded-lg top-12">
            {menus?.map((menu) => (
              <div
                key={menu.id}
                onClick={() => router.push(menu.url)}
                className="h-10 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 pl-3 flex flex-col justify-center"
              >
                {menu.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
