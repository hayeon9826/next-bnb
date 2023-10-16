'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import cn from 'classnames'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'

import { RxDividerVertical } from 'react-icons/rx'
import {
  AiOutlineSearch,
  AiOutlineMenu,
  AiOutlineUser,
  AiOutlineMinus,
  AiOutlinePlus,
} from 'react-icons/ai'
import { MdModeOfTravel } from 'react-icons/md'

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const menus = [
  { id: 1, title: '로그인', url: '/users/login' },
  { id: 2, title: '회원가입', url: '/users/signup' },
  { id: 3, title: 'FAQ', url: '/faqs' },
]

type DetailFilterType = 'location' | 'checkIn' | 'checkOut' | 'guest'
interface FilterProps {
  location?: string
  checkIn?: string
  checkOut?: string
  guest?: number
}

type ValuePiece = Date | null

type Value = ValuePiece | [ValuePiece, ValuePiece]

export default function Navbar() {
  const router = useRouter()

  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [detailFilter, setDetailFilter] = useState<DetailFilterType | null>(
    null,
  )
  const [filterValue, setFilterValue] = useState<FilterProps>({
    location: '',
    checkIn: '',
    checkOut: '',
    guest: 0,
  })

  return (
    <nav
      className={cn(
        'border border-b-gray-20 items-center w-full px-4 py-4 md:py-3 sm:px-10 lg:px-20 md:px-12 flex justify-between align-middle fixed top-0 bg-white',
        {
          'h-44': showFilter === true,
          '!items-start': showFilter === true,
        },
      )}
    >
      <div className="hidden font-semibold text-lg sm:text-xl text-rose-500 cursor-pointer grow basis-0 sm:flex sm:gap-2 h-14 items-center">
        <MdModeOfTravel className="text-4xl" />
        <div>nextbnb</div>
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
              {detailFilter === 'location' && (
                <Navbar.LocationFilter
                  filterValue={filterValue}
                  setFilterValue={setFilterValue}
                  setDetailFilter={setDetailFilter}
                />
              )}
              {detailFilter === 'checkIn' && (
                <Navbar.CheckInFilter
                  filterValue={filterValue}
                  setFilterValue={setFilterValue}
                  setDetailFilter={setDetailFilter}
                />
              )}
              {detailFilter === 'checkOut' && (
                <Navbar.CheckOutFilter
                  filterValue={filterValue}
                  setFilterValue={setFilterValue}
                  setDetailFilter={setDetailFilter}
                />
              )}
              {detailFilter === 'guest' && (
                <Navbar.GuestFilter
                  filterValue={filterValue}
                  setFilterValue={setFilterValue}
                  setDetailFilter={setDetailFilter}
                />
              )}
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

interface FilterComponentProps {
  filterValue: FilterProps
  setFilterValue: React.Dispatch<React.SetStateAction<FilterProps>>
  setDetailFilter: React.Dispatch<React.SetStateAction<DetailFilterType | null>>
}

Navbar.LocationFilter = ({
  filterValue,
  setFilterValue,
  setDetailFilter,
}: FilterComponentProps) => {
  return (
    <div className="border px-8 py-10 border-gray-20 shadow-lg flex flex-col absolute bg-white w-full sm:max-w-3xl md:w-[768px] left-0 rounded-xl sm:top-[70px] top-80">
      <div className="text-sm font-semibold">지역으로 검색하기</div>
      <div className="flex flex-wrap gap-4 mt-4">
        {['서울', '부산', '대구', '인천', '광주', '대전', '울산']?.map(
          (value) => (
            <div
              role="presentation"
              key={value}
              className={cn(
                'border rounded-lg px-5 py-2.5 hover:bg-gray-200 focus:bg-rose-500',
                {
                  'bg-rose-600 text-white': filterValue.location === value,
                },
              )}
              onClick={() => {
                setFilterValue({
                  ...filterValue,
                  location: value,
                })
                setDetailFilter('checkIn')
              }}
            >
              {value}
            </div>
          ),
        )}
      </div>
    </div>
  )
}

Navbar.CheckInFilter = ({
  filterValue,
  setFilterValue,
  setDetailFilter,
}: FilterComponentProps) => {
  const onChange = (e: any) => {
    setFilterValue({
      ...filterValue,
      checkIn: dayjs(e).format('YYYY-MM-DD'),
    })
    setDetailFilter('checkOut')
  }

  return (
    <div className="border px-8 py-10 border-gray-20 shadow-lg flex flex-col absolute bg-white w-full sm:max-w-3xl md:w-[768px] left-0 rounded-xl sm:top-[70px] top-80">
      <div className="text-sm font-semibold">체크인 날짜 설정하기</div>
      <Calendar
        className="mt-8 mx-auto"
        onChange={onChange}
        minDate={new Date()}
        defaultValue={
          filterValue?.checkIn ? new Date(filterValue?.checkIn) : null
        }
        formatDay={(locale, date) => dayjs(date).format('DD')}
      />
    </div>
  )
}

Navbar.CheckOutFilter = ({
  filterValue,
  setFilterValue,
  setDetailFilter,
}: FilterComponentProps) => {
  const onChange = (e: any) => {
    setFilterValue({
      ...filterValue,
      checkOut: dayjs(e).format('YYYY-MM-DD'),
    })
    setDetailFilter('guest')
  }

  return (
    <div className="border px-8 py-10 border-gray-20 shadow-lg flex flex-col absolute bg-white w-full sm:max-w-3xl md:w-[768px] left-0 rounded-xl sm:top-[70px] top-80">
      <div className="text-sm font-semibold">체크아웃 날짜 설정하기</div>
      <Calendar
        className="mt-8 mx-auto"
        onChange={onChange}
        minDate={new Date()}
        defaultValue={
          filterValue?.checkOut ? new Date(filterValue?.checkOut) : null
        }
        formatDay={(locale, date) => dayjs(date).format('DD')}
      />
    </div>
  )
}

Navbar.GuestFilter = ({
  filterValue,
  setFilterValue,
  setDetailFilter,
}: FilterComponentProps) => {
  const [counter, setCounter] = useState<number>(filterValue.guest || 0)
  return (
    <div className="border px-8 py-10 border-gray-20 shadow-lg flex flex-col absolute bg-white w-full sm:max-w-3xl md:w-[768px] left-0 rounded-xl sm:top-[70px] top-80">
      <div className="text-sm font-semibold">게스트 수 추가하기</div>
      <div className="mt-4 border border-200 py-3 px-4 rounded-lg flex justify-between items-center">
        <div>
          <div className="font-semibold text-sm">게스트 수 추가</div>
          <div className="text-gray-500 text-sm">숙박 인원을 입력해주세요</div>
        </div>
        <div className="flex gap-4 items-center justify-center">
          <button
            type="button"
            className="rounded-full border border-gray-400 w-8 h-8 disabled:border-gray-200 hover:border-black"
            disabled={counter <= 0}
            onClick={() => {
              setCounter((val) => val - 1)
              setFilterValue({
                ...filterValue,
                guest: counter - 1,
              })
            }}
          >
            <AiOutlineMinus
              className={cn('m-auto', { 'text-gray-200': counter <= 0 })}
            />
          </button>
          <div className="w-3 text-center">{counter}</div>
          <button
            type="button"
            className="rounded-full border border-gray-400 w-8 h-8 hover:border-black disabled:border-gray-200"
            disabled={counter >= 20}
            onClick={() => {
              setCounter((val) => val + 1)
              setFilterValue({
                ...filterValue,
                guest: counter + 1,
              })
            }}
          >
            <AiOutlinePlus
              className={cn('m-auto', { 'text-gray-200': counter >= 20 })}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
