import dayjs from 'dayjs'
import 'dayjs/locale/ko'

import { selector } from 'recoil'
import { filterState } from './index'

export const calculatedFilterState = selector({
  key: 'FilterStateSelector',
  get: ({ get }) => {
    const filter = get(filterState)
    const checkInDate = filter.checkIn ? dayjs(filter.checkIn) : dayjs()
    const checkOutDate = filter.checkIn ? dayjs(filter.checkOut) : dayjs()
    const guestCount = filter.guest || 1
    const dayCount =
      !!checkOutDate?.diff(checkInDate, 'days') &&
      checkOutDate?.diff(checkInDate, 'days') > 0
        ? checkOutDate?.diff(checkInDate, 'days')
        : 0

    return { dayCount, guestCount }
  },
})
