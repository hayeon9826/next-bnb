'use client'

import { filterState } from '@/atom'
import { useRecoilState } from 'recoil'

import dayjs from 'dayjs'
import 'dayjs/locale/ko'

import Calendar from 'react-calendar'

export default function CalendarSection() {
  const [filterValue, setFilterValue] = useRecoilState(filterState)

  const onChangeCheckIn = (e: any) => {
    setFilterValue({
      ...filterValue,
      checkIn: dayjs(e).format('YYYY-MM-DD'),
    })
  }

  const onChangeCheckOut = (e: any) => {
    setFilterValue({
      ...filterValue,
      checkOut: dayjs(e).format('YYYY-MM-DD'),
    })
  }
  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className=" text-gray-500 text-sm">
        {filterValue?.checkIn && filterValue?.checkOut
          ? `${filterValue?.checkIn} ~ ${filterValue?.checkOut}`
          : '체크인/체크아웃 날짜를 입력해주세요'}
      </div>
      <div className="flex flex-col lg:flex-row gap-4 justify-between">
        <Calendar
          next2Label={null}
          prev2Label={null}
          className="mt-2 mx-auto"
          onChange={onChangeCheckIn}
          minDate={new Date()}
          defaultValue={
            filterValue?.checkIn ? new Date(filterValue?.checkIn) : null
          }
          formatDay={(locale, date) => dayjs(date).format('DD')}
        />
        <Calendar
          next2Label={null}
          prev2Label={null}
          className="mt-2 mx-auto"
          onChange={onChangeCheckOut}
          minDate={
            filterValue?.checkIn ? new Date(filterValue?.checkIn) : new Date()
          }
          defaultValue={
            filterValue?.checkOut ? new Date(filterValue?.checkOut) : null
          }
          formatDay={(locale, date) => dayjs(date).format('DD')}
        />
      </div>
    </div>
  )
}
