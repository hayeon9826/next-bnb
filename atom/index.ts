import {
  DetailFilterType,
  FilterProps,
  LocationType,
  RoomType,
} from '@/interface'
import { atom } from 'recoil'

const DEFAULT_LAT = '37.565337'
const DEFAULT_LNG = '126.9772095'
const ZOOM_LEVEL = 7

export const mapState = atom({
  key: 'map',
  default: null,
  dangerouslyAllowMutability: true,
})

export const currentRoomState = atom<RoomType | null>({
  key: 'room',
  default: null,
})

export const locationState = atom<LocationType>({
  key: 'location',
  default: {
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
    zoom: ZOOM_LEVEL,
  },
})

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
