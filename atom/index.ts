import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

import {
  DetailFilterType,
  FilterProps,
  LocationType,
  RoomFormType,
  RoomType,
} from '@/interface'
import { atom } from 'recoil'

const DEFAULT_LAT = '37.565337'
const DEFAULT_LNG = '126.9772095'
const ZOOM_LEVEL = 7

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

export const roomFormState = atom<RoomFormType | null>({
  key: 'roomRegisterForm',
  default: {
    images: [],
    title: '',
    address: '',
    lat: '',
    lng: '',
    category: '',
    desc: '',
    bedroomDesc: '',
    price: 0,
    freeCancel: false,
    selfCheckIn: false,
    officeSpace: false,
    hasMountainView: false,
    hasShampoo: false,
    hasFreeLaundry: false,
    hasAirConditioner: false,
    hasWifi: false,
    hasBarbeque: false,
    hasFreeParking: false,
    userId: 0,
  },
  effects_UNSTABLE: [persistAtom],
})
