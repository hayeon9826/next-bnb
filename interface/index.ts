export type DetailFilterType = 'location' | 'checkIn' | 'checkOut' | 'guest'
export interface FilterProps {
  location?: string
  checkIn?: string
  checkOut?: string
  guest?: number
  category?: string
}

export interface RoomType {
  id: number
  images: string[]
  title: string
  address: string
  price: number
}
