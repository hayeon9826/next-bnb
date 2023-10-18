'use client'

import CategoryList from '@/components/CategoryList'
import Loader from '@/components/Loader'
import { GridLayout, RoomItem } from '@/components/RoomGrid'
import { RoomType } from '@/interface'
import { useQuery } from 'react-query'

export default function Home() {
  const fetchRooms = async () => {
    const data = await fetch(`/api/rooms`)
    return data.json()
  }

  const { data, isError, isLoading, isSuccess } = useQuery('rooms', fetchRooms)

  if (isError) {
    return (
      <div className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold">
        다시 시도해주세요
      </div>
    )
  }

  if (isLoading) {
    return <Loader className="mb-40 mt-60" />
  }

  return (
    <>
      <CategoryList />
      <GridLayout>
        {data?.map((room: RoomType) => <RoomItem room={room} key={room.id} />)}
      </GridLayout>
    </>
  )
}
