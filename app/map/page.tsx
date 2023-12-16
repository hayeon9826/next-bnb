'use client'

import Map, { ListButton } from '@/components/Map'
import { useRouter } from 'next/navigation'
import SelectedRoom from '@/components/Map/SelectedRoom'

export default function MapPage() {
  const router = useRouter()

  const goToMainPage = () => {
    router.replace('/')
  }

  return (
    <>
      <Map />
      <SelectedRoom />
      <ListButton onClick={goToMainPage} />
    </>
  )
}
