import { IoPartlySunnyOutline } from 'react-icons/io5'
import { MdOutlineBedroomChild, MdOutlineSurfing } from 'react-icons/md'
import {
  GiHolyOak,
  GiCaveEntrance,
  GiCampingTent,
  GiBarn,
  GiSkier,
  GiStarKey,
} from 'react-icons/gi'
import { FaHouseUser, FaUmbrellaBeach } from 'react-icons/fa6'
import { BiSolidTree, BiWater } from 'react-icons/bi'
import { AiOutlineStar } from 'react-icons/ai'
import { TbSwimming, TbMoodKid } from 'react-icons/tb'

const weatherIcon = IoPartlySunnyOutline
const natureIcon = GiHolyOak
const caveIcon = GiCaveEntrance
const campingIcon = GiCampingTent
const roomIcon = MdOutlineBedroomChild
const koreanHouseIcon = FaHouseUser
const beachIcon = FaUmbrellaBeach
const treeIcon = BiSolidTree
const popularIcon = AiOutlineStar
const swimmingIcon = TbSwimming
const farmIcon = GiBarn
const skiIcon = GiSkier
const lakeIcon = BiWater
const kidIcon = TbMoodKid
const keyIcon = GiStarKey
const surfingIcon = MdOutlineSurfing

export const CATEGORY = [
  { title: '전망좋은', icon: weatherIcon },
  { title: '자연', icon: natureIcon },
  { title: '동굴', icon: caveIcon },
  { title: '캠핑장', icon: campingIcon },
  { title: '방', icon: roomIcon },
  { title: '한옥', icon: koreanHouseIcon },
  { title: '해변', icon: beachIcon },
  { title: '국립공원', icon: treeIcon },
  { title: '인기', icon: popularIcon },
  { title: '수영장', icon: swimmingIcon },
  { title: '농장', icon: farmIcon },
  { title: '스키', icon: skiIcon },
  { title: '호수', icon: lakeIcon },
  { title: '키즈', icon: kidIcon },
  { title: '신규', icon: keyIcon },
  { title: '서핑', icon: surfingIcon },
]

/** @example - Blur Data URL 생성: https://png-pixel.com/  */
export const BLUR_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8fOJEPQAHfQLUAsZOIAAAAABJRU5ErkJggg=='

const FEATURE_TYPE = {
  FREE_CANCEL: 'FREE_CANCEL',
  PAID_CANCEL: 'PAID_CANCEL',
  SELF_CHECKIN: 'SELF_CHECKIN',
  SELF_CHECKIN_DISALLOWED: 'SELF_CHECKIN_DISALLOWED',
  HAS_OFFICE_SPACE: 'HAS_OFFICE_SPACE',
  NO_OFFICE_SPACE: 'NO_OFFICE_SPACE',
}

type FeatureType = (typeof FEATURE_TYPE)[keyof typeof FEATURE_TYPE]

export const FeatureDesc: Record<FeatureType, string> = {
  [FEATURE_TYPE.FREE_CANCEL]: '무료 취소가 가능합니다.',
  [FEATURE_TYPE.PAID_CANCEL]: '무료 취소가 불가능합니다.',
  [FEATURE_TYPE.SELF_CHECKIN]: '셀프 체크인이 가능합니다.',
  [FEATURE_TYPE.SELF_CHECKIN_DISALLOWED]: '셀프 체크인이 불가능합니다.',
  [FEATURE_TYPE.HAS_OFFICE_SPACE]: '사무 시설이 있습니다.',
  [FEATURE_TYPE.NO_OFFICE_SPACE]: '사무 시설이 없습니다.',
}

enum DOMAIN_TYPE {
  REGISTER_ROOM = 'REGISTER_ROOM',
  REGISTER_ROOM_INFO = 'REGISTER_ROOM_INFO',
  REGISTER_ROOM_ADDRESS = 'REGISTER_ROOM_ADDRESS',
  REGISTER_ROOM_FEATURE = 'REGISTER_ROOM_FEATURE',
  REGISTER_ROOM_IMAGE = 'REGISTER_ROOM_IMAGE',
}

type DomainType = (typeof DOMAIN_TYPE)[keyof typeof DOMAIN_TYPE]

export const Domains: Record<DomainType, string> = {
  [DOMAIN_TYPE.REGISTER_ROOM]: '/rooms/register/category',
  [DOMAIN_TYPE.REGISTER_ROOM_INFO]: '/rooms/register/info',
  [DOMAIN_TYPE.REGISTER_ROOM_ADDRESS]: '/rooms/register/address',
  [DOMAIN_TYPE.REGISTER_ROOM_FEATURE]: '/rooms/register/feature',
  [DOMAIN_TYPE.REGISTER_ROOM_IMAGE]: '/rooms/register/image',
}

enum API_TYPE {
  USERS_API = 'USERS_API',
  ROOMS_API = 'ROOMS_API',
  FAQS_API = 'FAQS_API',
  PAYMENTS_API = 'PAYMENTS_API',
  BOOKINGS_API = 'BOOKINGS_API',
  COMMENTS_API = 'COMMENTS_API',
  LIKES_API = 'LIKES_API',
}

type ApiType = (typeof API_TYPE)[keyof typeof API_TYPE]

export const API: Record<ApiType, string> = {
  [API_TYPE.USERS_API]: '/api/users',
  [API_TYPE.ROOMS_API]: '/api/rooms',
  [API_TYPE.FAQS_API]: '/api/faqs',
  [API_TYPE.PAYMENTS_API]: '/api/payments',
  [API_TYPE.BOOKINGS_API]: '/api/bookings',
  [API_TYPE.COMMENTS_API]: '/api/comments',
  [API_TYPE.LIKES_API]: '/api/likes',
}

export interface RoomFeatureProps {
  freeCancel?: boolean
  selfCheckIn?: boolean
  officeSpace?: boolean
  hasMountainView?: boolean
  hasShampoo?: boolean
  hasFreeLaundry?: boolean
  hasAirConditioner?: boolean
  hasWifi?: boolean
  hasBarbeque?: boolean
  hasFreeParking?: boolean
}

interface FieldProps {
  field: keyof RoomFeatureProps
  label: string
}

export const FeatureRegisterField: FieldProps[] = [
  { field: 'freeCancel', label: '무료 취소' },
  { field: 'selfCheckIn', label: '셀프 체크인' },
  { field: 'officeSpace', label: '사무시설' },
  { field: 'hasMountainView', label: '마운틴 뷰' },
  { field: 'hasShampoo', label: '욕실 용품' },
  { field: 'hasFreeLaundry', label: '무료 세탁' },
  { field: 'hasAirConditioner', label: '에어컨' },
  { field: 'hasWifi', label: '무료 와이파이' },
  { field: 'hasBarbeque', label: '바베큐 시설' },
  { field: 'hasFreeParking', label: '무료 주차' },
]

export const RoomEditFields = [
  'title',
  'category',
  'desc',
  'bedroomDesc',
  'price',
  'address',
  'images',
  'imageKeys',
  'freeCancel',
  'selfCheckIn',
  'officeSpace',
  'hasMountainView',
  'hasShampoo',
  'hasFreeLaundry',
  'hasAirConditioner',
  'hasWifi',
  'hasBarbeque',
  'hasFreeParking',
]
