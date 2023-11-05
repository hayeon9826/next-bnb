export type DetailFilterType = 'location' | 'checkIn' | 'checkOut' | 'guest'
export interface FilterProps {
  location?: string
  checkIn?: string
  checkOut?: string
  guest?: number
  category?: string
}

export interface SearchProps {
  q: string | null
}

export interface Like {
  id: number
  roomId: number
  userId: number
  createdAt: string
  room: RoomType
}

export interface LikeApiProps {
  totalCount: number
  data: Like[]
  page?: number
  totalPage?: number
}

export interface BookingType {
  id: number
  roomId: number
  userId: number
  checkIn: string
  checkOut: string
  guestCount: number
  totalAmount: number
  totalDays: number
  status: BookingStatus
  room: RoomType
  user: UserType
  createdAt: string
  updatedAt: string
}

export interface RoomType {
  id: number
  images: string[]
  imageKeys?: string[]
  title: string
  address: string
  lat: string
  lng: string
  category: string
  desc: string
  bedroomDesc?: string
  price: number
  freeCancel: boolean
  selfCheckIn: boolean
  officeSpace: boolean
  hasMountainView: boolean
  hasShampoo: boolean
  hasFreeLaundry: boolean
  hasAirConditioner: boolean
  hasWifi: boolean
  hasBarbeque: boolean
  hasFreeParking: boolean
  userId?: number
  user?: UserType
  likes?: Like[]
  comments?: CommentType[]
  bookings?: BookingType[]
  createdAt?: string
  updatedAt?: string
}

export interface RoomFormType {
  images?: string[]
  imageKeys?: string[]
  title?: string
  address?: string
  lat?: string
  lng?: string
  category?: string
  desc?: string
  bedroomDesc?: string
  price?: number
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
  userId?: number
}

interface Account {
  id: string
  provider: string
}

export interface UserType {
  id: number
  email: string
  name?: string
  image?: string
  desc?: string
  phone?: string
  address?: string
  rooms?: RoomType[]
  accounts: Account[]
  createdAt?: string
  comments?: CommentType[]
  bookings?: BookingType[]
}

export interface CommentType {
  id: number
  createdAt: string
  roomId: number
  userId: number
  body: string
  room: RoomType
  user: UserType
}

export interface BookingApiProps {
  totalCount: number
  data: BookingType[]
  page?: number
  totalPage?: number
}

export interface CommentApiProps {
  totalCount: number
  data: CommentType[]
  page?: number
  totalPage?: number
}

export interface FaqType {
  id: number
  title: string
  desc: string
}

export interface LocationType {
  lat?: string | null
  lng?: string | null
  zoom?: number
}

export enum BookingStatus {
  CANCEL = 'CANCEL',
  FAILED = 'FAILED',
  SUCCESS = 'SUCCESS',
  PENDING = 'PENDING',
}

export const bookingStatusMessage: { [key in BookingStatus]: string } = {
  [BookingStatus.CANCEL]: '취소된 여행',
  [BookingStatus.FAILED]: '결제 실패',
  [BookingStatus.SUCCESS]: '예약된 여행',
  [BookingStatus.PENDING]: '결제 대기중',
}

export enum PaymentStatus {
  READY = 'READY',
  IN_PROGRESS = 'IN_PROGRESS',
  WAITING_FOR_DEPOSIT = 'WAITING_FOR_DEPOSIT',
  DONE = 'DONE',
  CANCELED = 'CANCELED',
  PARTIAL_CANCELED = 'PARTIAL_CANCELED',
  ABORTED = 'ABORTED',
  EXPIRED = 'EXPIRED',
}

export const paymentStatusMessage: { [key in PaymentStatus]: string } = {
  [PaymentStatus.READY]: '결제 준비중',
  [PaymentStatus.IN_PROGRESS]: '결제 진행중',
  [PaymentStatus.WAITING_FOR_DEPOSIT]: '입금 대기중',
  [PaymentStatus.DONE]: '결제 완료',
  [PaymentStatus.CANCELED]: '결제 취소',
  [PaymentStatus.PARTIAL_CANCELED]: '부분 취소',
  [PaymentStatus.ABORTED]: '결제 승인 실패',
  [PaymentStatus.EXPIRED]: '결제 시간 만료',
}

export interface ModalProps {
  isOpen: boolean
  closeModal: () => void
}

export interface Payment {
  id: string
  paymentKey: string
  bookingId: string
  amount: number
  status: PaymentStatus
  orderId: string
  orderName: string
  approvedAt: string
  mId?: string
  receiptUrl?: string
  cardNumber?: string
  method?: string
}
