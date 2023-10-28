export type DetailFilterType = 'location' | 'checkIn' | 'checkOut' | 'guest'
export interface FilterProps {
  location?: string
  checkIn?: string
  checkOut?: string
  guest?: number
  category?: string
}

interface Like {
  id: number
  roomId: number
  userId: number
  createdAt: string
}

export interface RoomType {
  id: number
  images: string[]
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
