import { DetailFilterType, FilterProps } from '@/interface'
import { atom } from 'recoil'

export const filterState = atom<FilterProps>({
  key: 'filter',
  default: {
    location: '',
    checkIn: '',
    checkOut: '',
    guest: 0,
    category: '',
  },
})

export const detailFilterState = atom<DetailFilterType | null>({
  key: 'detailFilter',
  default: null,
})
