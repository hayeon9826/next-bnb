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
  { title: '전망좋은', Icon: IoPartlySunnyOutline },
  { title: '자연', Icon: GiHolyOak },
  { title: '동굴', Icon: GiCaveEntrance },
  { title: '캠핑장', Icon: GiCampingTent },
  { title: '방', Icon: MdOutlineBedroomChild },
  { title: '한옥', Icon: FaHouseUser },
  { title: '해변', Icon: FaUmbrellaBeach },
  { title: '국립공원', Icon: BiSolidTree },
  { title: '인기', Icon: AiOutlineStar },
  { title: '수영장', Icon: TbSwimming },
  { title: '농장', Icon: GiBarn },
  { title: '스키', Icon: GiSkier },
  { title: '호수', Icon: BiWater },
  { title: '키즈', Icon: TbMoodKid },
  { title: '신규', Icon: GiStarKey },
  { title: '서핑', Icon: MdOutlineSurfing },
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
