'use client'

import NextButton from '@/components/Form/NextButton'
import Stepper from '@/components/Form/Stepper'
import { useRouter } from 'next/navigation'

export default function RoomRegisterFeature() {
  const router = useRouter()
  return (
    <>
      <Stepper className="mt-10" count={4} />
      <NextButton onClick={() => router.push('/rooms/register/image')} />
    </>
  )
}
