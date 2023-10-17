'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import cn from 'classnames'

import { RxDividerVertical } from 'react-icons/rx'
import { AiOutlineSearch, AiOutlineMenu, AiOutlineUser } from 'react-icons/ai'
import { MdModeOfTravel } from 'react-icons/md'

import { SearchFilter } from './Filter'
import { useRecoilState, useRecoilValue } from 'recoil'
import { detailFilterState, filterState } from '@/atom'
import Link from 'next/link'

const menus = [
  { id: 1, title: '로그인', url: '/users/login' },
  { id: 2, title: '회원가입', url: '/users/signup' },
  { id: 3, title: 'FAQ', url: '/faqs' },
]

export default function Navbar() {
  const router = useRouter()

  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [detailFilter, setDetailFilter] = useRecoilState(detailFilterState)
  const filterValue = useRecoilValue(filterState)

  return (
    <nav
      className={cn(
        'z-10 h-20 border border-b-gray-20 items-center w-full px-4 py-4 md:py-3 sm:px-10 lg:px-20 md:px-12 flex justify-between align-middle fixed top-0 bg-white',
        {
          '!h-44': showFilter === true,
          '!items-start': showFilter === true,
        },
      )}
    >
      <div className="hidden font-semibold text-lg sm:text-xl text-rose-500 cursor-pointer grow basis-0 sm:flex sm:gap-2 h-14 items-center">
        <MdModeOfTravel className="text-4xl" />
        <Link href="/">nextbnb</Link>
      </div>
      {showFilter === false ? (
        <div className="w-full py-1.5 sm:w-[340px] border border-gray-20 rounded-full shadow hover:shadow-lg cursor-pointer flex justify-between pl-6 pr-2">
          <div
            className="flex justify-center gap-1"
            role="presentation"
            onClick={() => setShowFilter(true)}
          >
            <div className="my-auto font-semibold text-sm">어디든지</div>
            <RxDividerVertical className="text-gray-200 text-2xl my-auto" />
            <div className="my-auto font-semibold text-sm">언제든 일주일</div>
            <RxDividerVertical className="text-gray-200 text-2xl my-auto" />
            <div className="my-auto text-sm text-gray-500">게스트 추가</div>
          </div>
          <button
            role="presentation"
            className="bg-rose-500 text-white rounded-full w-8 h-8"
            onClick={() => setShowFilter(true)}
          >
            <AiOutlineSearch className="font-semibold text-lg m-auto" />
          </button>
        </div>
      ) : (
        <div className="w-full sm:w-[340px] cursor-pointer relative">
          <div className="flex justify-center gap-7 text-center h-14 items-center">
            <div
              role="presentation"
              className="my-auto font-semibold underline underline-offset-8"
            >
              숙소
            </div>
            <div
              role="presentation"
              className="my-auto"
              onClick={() => window.alert('서비스 준비중입니다.')}
            >
              체험
            </div>
            <div
              role="presentation"
              className="my-auto"
              onClick={() => window.alert('서비스 준비중입니다.')}
            >
              온라인 체험
            </div>
            <div
              role="presentation"
              className="my-auto text-sm underline underline-offset-8 cursor-pointer text-gray-500 hover:text-black"
              onClick={() => setShowFilter(false)}
            >
              필터 닫기
            </div>
          </div>
          <div
            className={cn(
              'w-[90%] sm:max-w-3xl gap-4 border border-gray-20 rounded-lg py-4 sm:py-0 sm:rounded-full shadow-sm bg-white hover:shadow-lg cursor-pointer flex flex-col sm:flex-row justify-between fixed top-20 inset-x-0 mx-auto',
              { 'bg-gray-200': detailFilter !== null },
            )}
          >
            <div className="grid grid-cols-1 sm:grid-cols-4 w-full relative">
              <div
                role="presentation"
                onClick={() => setDetailFilter('location')}
                className={cn(
                  'my-auto font-semibold text-xs rounded-full hover:bg-gray-100 py-3 px-6',
                  { 'shadow bg-white': detailFilter === 'location' },
                )}
              >
                여행지
                <div className=" text-gray-500 font-normal text-sm">
                  {filterValue?.location || '여행지 검색'}
                </div>
              </div>
              <div
                role="presentation"
                onClick={() => setDetailFilter('checkIn')}
                className={cn(
                  'my-auto font-semibold text-xs rounded-full hover:bg-gray-100 py-3 px-6',
                  {
                    'shadow bg-white': detailFilter === 'checkIn',
                  },
                )}
              >
                체크인
                <div className=" text-gray-500 font-normal text-sm">
                  {filterValue?.checkIn || '날짜 추가'}
                </div>
              </div>
              <div
                role="presentation"
                onClick={() => setDetailFilter('checkOut')}
                className={cn(
                  'my-auto font-semibold text-xs  rounded-full hover:bg-gray-100 py-3 px-6',
                  {
                    'shadow bg-white': detailFilter === 'checkOut',
                  },
                )}
              >
                체크아웃
                <div className=" text-gray-500 font-normal text-sm">
                  {filterValue?.checkOut || '날짜 추가'}
                </div>
              </div>
              <div
                role="presentation"
                onClick={() => setDetailFilter('guest')}
                className={cn(
                  'my-auto text-xs font-semibold rounded-full hover:bg-gray-100 py-3 px-6',
                  {
                    'shadow bg-white': detailFilter === 'guest',
                  },
                )}
              >
                여행자
                <div className=" text-gray-500 font-normal text-sm">
                  {filterValue?.guest
                    ? `게스트 ${filterValue?.guest}명`
                    : '게스트 추가'}
                </div>
              </div>
              <SearchFilter />
            </div>
            <button
              role="presentation"
              className="bg-rose-600 text-white rounded-full h-12 mx-4 sm:h-10 sm:w-24 my-auto flex justify-center gap-1 px-2 sm:px-4 py-2 sm:mr-2 hover:shadow hover:bg-rose-500"
              onClick={() => {
                setShowFilter(false)
                setDetailFilter(null)
              }}
            >
              <AiOutlineSearch className="font-semibold text-xl my-auto" />
              <div className="my-auto">검색</div>
            </button>
          </div>
        </div>
      )}

      <div className="hidden md:flex gap-4 grow basis-0 justify-end relative  h-14 items-center">
        <button className="hidden lg:block font-semibold text-sm px-4 py-3 rounded-full hover:bg-gray-50 max-h-10">
          당신의 공간을 등록해주세요
        </button>
        <div
          className="flex gap-3 rounded-full border border-gray-20 shadow-sm px-4 py-3 hover:shadow-lg cursor-pointer max-h-10"
          onClick={() => setShowMenu((val) => !val)}
        >
          <AiOutlineMenu />
          <AiOutlineUser />
        </div>
        {showMenu && (
          <div className="border border-gray-20 shadow-lg py-2 flex flex-col absolute bg-white w-60 rounded-lg top-16">
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
