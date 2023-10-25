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

type FEATURE_DESC_TYPE =
  | 'FREE_CANCEL'
  | 'PAID_CANCEL'
  | 'SELF_CHECKIN'
  | 'SELF_CHECKIN_DISALLOWED'
  | 'HAS_OFFICE_SPACE'
  | 'NO_OFFICE_SPACE'

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
