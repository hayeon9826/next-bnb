'use client'

import { roomFormState } from '@/atom'
import NextButton from '@/components/Form/NextButton'
import Stepper from '@/components/Form/Stepper'
import { useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'

export default function RoomRegisterAddress() {
  const router = useRouter()
  const [roomForm, setRoomForm] = useRecoilState(roomFormState)

  return (
    <>
      <Stepper className="mt-10" count={3} />
      <NextButton onClick={() => router.push('/rooms/register/feature')} />
    </>
  )
}
