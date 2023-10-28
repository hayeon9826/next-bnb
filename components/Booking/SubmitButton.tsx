'use client'

import { useSearchParams } from 'next/navigation'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

import axios from 'axios'
import { toast } from 'react-hot-toast'

export default function SubmitButton() {
  const searchParams = useSearchParams()
  const params = useParams()
  const router = useRouter()
  const id = params?.id
  const checkIn = searchParams.get('checkIn')
  const checkOut = searchParams.get('checkOut')
  const guestCount = searchParams.get('guestCount')
  const totalAmount = searchParams.get('totalAmount')
  const totalDays = searchParams.get('totalDays')

  const handleSubmit = async () => {
    const res = await axios.post('/api/bookings', {
      roomId: id,
      checkIn: checkIn,
      checkOut: checkOut,
      guestCount: guestCount,
      totalAmount: totalAmount,
      totalDays: totalDays,
    })

    if (res.status === 200) {
      toast.success('예약을 완료했습니다.')
      router.replace(`/users/bookings/${res?.data?.id}`)
    } else {
      toast.error('다시 시도해주세요.')
    }
  }

  return (
    <div>
      <button
        onClick={handleSubmit}
        className="bg-rose-600 hover:bg-rose-500 px-6 py-3 text-white rounded-md"
      >
        확인 및 결제
      </button>
    </div>
  )
}
