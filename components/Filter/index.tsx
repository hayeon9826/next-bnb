import { detailFilterState, filterState } from '@/atom'
import cn from 'classnames'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import { useState } from 'react'

import { useRecoilState, useRecoilValue } from 'recoil'

import Calendar from 'react-calendar'

import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

import FilterLayout from './layout'

export const SearchFilter = () => {
  return (
    <>
      <LocationFilter />
      <CheckInFilter />
      <CheckOutFilter />
      <GuestFilter />
    </>
  )
}

export const LocationFilter = () => {
  const [filterValue, setFilterValue] = useRecoilState(filterState)
  const [detailFilter, setDetailFilter] = useRecoilState(detailFilterState)

  return (
    <FilterLayout
      title="지역으로 검색하기"
      isShow={detailFilter === 'location'}
    >
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
    </FilterLayout>
  )
}

export const CheckInFilter = () => {
  const [filterValue, setFilterValue] = useRecoilState(filterState)
  const [detailFilter, setDetailFilter] = useRecoilState(detailFilterState)

  const onChange = (e: any) => {
    setFilterValue({
      ...filterValue,
      checkIn: dayjs(e).format('YYYY-MM-DD'),
    })
    setDetailFilter('checkOut')
  }

  return (
    <FilterLayout
      title="체크인 날짜 설정하기"
      isShow={detailFilter === 'checkIn'}
    >
      <Calendar
        next2Label={null}
        prev2Label={null}
        className="mt-8 mx-auto"
        onChange={onChange}
        minDate={new Date()}
        defaultValue={
          filterValue?.checkIn ? new Date(filterValue?.checkIn) : null
        }
        formatDay={(locale, date) => dayjs(date).format('DD')}
      />
    </FilterLayout>
  )
}

export const CheckOutFilter = () => {
  const [filterValue, setFilterValue] = useRecoilState(filterState)
  const [detailFilter, setDetailFilter] = useRecoilState(detailFilterState)

  const onChange = (e: any) => {
    setFilterValue({
      ...filterValue,
      checkOut: dayjs(e).format('YYYY-MM-DD'),
    })
    setDetailFilter('guest')
  }

  return (
    <FilterLayout
      title="체크아웃 날짜 설정하기"
      isShow={detailFilter === 'checkOut'}
    >
      <Calendar
        next2Label={null}
        prev2Label={null}
        className="mt-8 mx-auto"
        onChange={onChange}
        minDate={new Date()}
        defaultValue={
          filterValue?.checkOut ? new Date(filterValue?.checkOut) : null
        }
        formatDay={(locale, date) => dayjs(date).format('DD')}
      />
    </FilterLayout>
  )
}

export const GuestFilter = () => {
  const [filterValue, setFilterValue] = useRecoilState(filterState)
  const detailFilter = useRecoilValue(detailFilterState)
  const [counter, setCounter] = useState<number>(filterValue.guest || 0)

  return (
    <FilterLayout title="게스트 수 추가하기" isShow={detailFilter === 'guest'}>
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
    </FilterLayout>
  )
}
