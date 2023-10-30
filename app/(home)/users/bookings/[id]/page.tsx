import { BLUR_DATA_URL } from '@/constants'
import Image from 'next/image'

import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import BackButton from '@/components/BackButton'
import RefundButton from '@/components/Booking/RefundButton'
import { Payment, paymentStatusMessage } from '@/interface'

export default async function BookingPage({
  params,
}: {
  params: { id: string }
}) {
  const id = params.id
  const booking = await getData(id)
  const canRefund =
    dayjs(booking?.checkIn).diff(dayjs(), 'days') > 7 ||
    booking?.payments?.[0]?.status === 'DONE'

  return (
    <div className="max-w-5xl mx-auto px-4 pt-10 pb-20">
      <h1 className="text-xl md:text-3xl font-semibold relative">
        <BackButton className="absolute -top-4 -left-16" />
        예약 상세 내역
      </h1>
      <div className="rounded-md border border-gray-300 p-6 mt-10">
        <div className="flex border-b gap-4 pb-6">
          <Image
            src={booking?.room?.images?.[0] || '/images/logo.png'}
            width={100}
            height={100}
            alt="room img"
            className="rounded-md"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-xs text-gray-500">
                {booking?.room?.bedroomDesc}
              </p>
              <h1 className="text-sm">{booking?.room?.title}</h1>
            </div>
            <div className="text-xs text-gray-500">
              후기 {booking?.room?.comments?.length || 0}개
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-b pb-6">
          <h1 className="text-lg md:text-xl mt-4">여행 일정정보</h1>
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">날짜</h3>
            <div className="text-gray-800">
              {dayjs(booking?.checkIn)?.format('YYYY-MM-DD')} ~{' '}
              {dayjs(booking?.checkOut)?.format('YYYY-MM-DD')}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">게스트</h3>
            <div className="text-gray-800">게스트 {booking?.guestCount}명</div>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-b pb-6">
          <h1 className="text-lg md:text-xl mt-4">요금 세부정보</h1>
          <div className="flex justify-between gap-4 text-gray-600">
            <div>
              {`₩${booking?.room?.price?.toLocaleString()}`} x{' '}
              {booking?.totalDays}박
            </div>
            <div>{`₩${booking?.totalAmount?.toLocaleString()}`}</div>
          </div>
          <div className="flex justify-between gap-4 text-gray-600">
            <div className="underline">nextBnb 서비스 수수료</div>
            <div>{`₩0`}</div>
          </div>
        </div>
        <div className="flex justify-between gap-4 border-b py-6">
          <div>총 합계 (KRW)</div>
          <div>{`₩${booking?.totalAmount.toLocaleString()}`}</div>
        </div>
        <div className="flex justify-between gap-4 pt-6 items-center">
          <RefundButton canRefund={canRefund} booking={booking} />
          <div className="text-sm text-gray-600">
            여행 출발 7일전까지만 환불이 가능합니다.
          </div>
        </div>
      </div>
      <h1 className="text-xl md:text-3xl font-semibold mt-16">
        결제 상세 내역
      </h1>
      {booking?.payments?.length > 0 ? (
        booking?.payments
          .slice(0)
          .reverse()
          ?.map((payment: Payment) => (
            <div
              className="rounded-md border border-gray-300 p-6 mt-10"
              key={payment.id}
            >
              <div className="flex flex-col gap-6 border-b pb-8">
                <h2 className="text-lg md:text-2xl font-semibold">
                  결제 내역 확인하기
                </h2>
                <div className="rounded-md border-black p-4 border-2 cursor-pointer hover:bg-black/5">
                  <h3 className="font-semibold">
                    {paymentStatusMessage?.[payment?.status]}
                  </h3>
                  <div className="text-gray-500 text-sm mt-1">
                    {dayjs(payment?.approvedAt)?.format('YYYY-MM-DD HH:MM:ss')}
                  </div>
                  <div className="text-gray-500 text-sm mt-1">
                    상점아이디(MID) {payment?.mId || '-'}
                  </div>
                  <div className="text-gray-500 text-sm mt-1">
                    결제 방식: {payment?.method || '-'}
                  </div>
                  <div className="text-gray-500 text-sm mt-1">
                    {payment?.cardNumber || '카드 정보가 없습니다.'}
                  </div>
                  {payment?.status === 'DONE' && (
                    <div className="text-gray-800 text-sm mt-1">
                      {`총액 ₩${booking?.totalAmount?.toLocaleString()}를 결제했습니다.`}
                    </div>
                  )}
                </div>
                <div>
                  <a
                    href={payment?.receiptUrl}
                    target="_blank"
                    className="px-4 py-2.5 rounded-md bg-rose-500 hover:bg-rose-600 text-white"
                  >
                    영수증 확인하기
                  </a>
                </div>
              </div>
              <div className="flex flex-col gap-4 border-b pb-6">
                <h1 className="text-lg md:text-xl mt-4">요금 세부정보</h1>
                <div className="flex justify-between gap-4 text-gray-600">
                  <div>
                    {`₩${booking?.room?.price?.toLocaleString()}`} x{' '}
                    {booking?.totalDays}박
                  </div>
                  <div>{`₩${booking?.totalAmount?.toLocaleString()}`}</div>
                </div>
                <div className="flex justify-between gap-4 text-gray-600">
                  <div className="underline">nextBnb 서비스 수수료</div>
                  <div>{`₩0`}</div>
                </div>
              </div>
              <div className="flex justify-between gap-4 border-b py-6">
                <div>총 합계 (KRW)</div>
                <div>{`₩${booking?.totalAmount.toLocaleString()}`}</div>
              </div>
              <div className="pt-6 text-sm text-gray-600">
                해외에서 결제가 처리되기 때문에 카드 발행사에서 추가 수수료를
                부과할 수 있습니다.
              </div>
            </div>
          ))
      ) : (
        <div className="rounded-md border border-gray-300 p-6 mt-10 text-gray-600">
          결제 내역이 없습니다.
        </div>
      )}
    </div>
  )
}

async function getData(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/bookings?id=${id}`,
    {
      cache: 'no-store',
    },
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
