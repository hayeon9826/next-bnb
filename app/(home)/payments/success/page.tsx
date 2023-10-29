import axios from 'axios'
import dayjs from 'dayjs'

import { redirect } from 'next/navigation'

// https://docs.tosspayments.com/reference#payment-객체
interface Payment {
  payment?: {
    orderName: string
    approvedAt: string
    receipt: {
      url: string
    }
    totalAmount: number
    method: '카드' | '가상계좌' | '계좌이체'
  }
  redirect?: {
    destination?: string
  }
}

interface ParamsProps {
  searchParams: { paymentKey: string; orderId: string; amount: string }
}

export default async function SuccessPage({ searchParams }: ParamsProps) {
  const paymentKey = searchParams.paymentKey
  const orderId = searchParams.orderId
  const amount = searchParams.amount
  const data: Payment = await getPayment({
    paymentKey,
    orderId,
    amount,
  })

  if (data?.redirect) {
    redirect(data.redirect?.destination || '/')
  }
  return (
    <div className="max-w-2xl mx-auto py-20 px-4">
      <div className="flex flex-col gap-6 border-b pb-8">
        <h2 className="text-lg md:text-2xl font-semibold">주문 내역</h2>
        <div className="rounded-md border-black p-4 border-2 cursor-pointer hover:bg-black/5">
          <h3 className="font-semibold">주문</h3>
          <div className="text-gray-800 text-sm mt-1">
            {data?.payment?.orderName}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 border-b pb-8 mt-8">
        <h2 className="text-lg md:text-2xl font-semibold">결제 내역</h2>
        <div className="rounded-md border-black p-4 border-2 cursor-pointer hover:bg-black/5">
          <h3 className="font-semibold">결제 수단</h3>
          <div className="text-gray-800 text-sm mt-1">
            {data?.payment?.method}
          </div>
        </div>
        <div className="rounded-md border-black p-4 border-2 cursor-pointer hover:bg-black/5">
          <h3 className="font-semibold">결제 금액</h3>
          <div className="text-gray-800 text-sm mt-1">
            {data?.payment?.totalAmount?.toLocaleString()}원
          </div>
        </div>
        <div className="rounded-md border-black p-4 border-2 cursor-pointer hover:bg-black/5">
          <h3 className="font-semibold">결제 일시</h3>
          <div className="text-gray-800 text-sm mt-1">
            {dayjs(data?.payment?.approvedAt)?.format('YYYY-MM-DD HH:MM:ss')}
          </div>
        </div>
        <div>
          <a
            href={data?.payment?.receipt?.url}
            target="_blank"
            className="bg-gray-800 hover:bg-gray-600 px-6 py-3 text-white rounded-md"
          >
            영수증 확인
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-6 border-b py-8">
        <a
          href="/users/bookings"
          className="bg-rose-600 hover:bg-rose-500 px-6 py-3 text-white rounded-md text-center"
        >
          예약 내역 확인
        </a>
      </div>
    </div>
  )
}

interface PaymentProps {
  paymentKey: string
  orderId: string
  amount: string
}

interface PaymentData {
  mId: string
  orderName: string
  approvedAt: string
  requestedAt: string
  status: string
  receipt?: {
    url: string
  }
  checkout: {
    url: string
  }
  card?: {
    number?: string
    cardType?: string
  }
  type?: string
  totalAmount: number
  method: '카드' | '가상계좌' | '계좌이체'
}

async function getPayment({ paymentKey, orderId, amount }: PaymentProps) {
  try {
    const { data: payment } = await axios.post<PaymentData>(
      'https://api.tosspayments.com/v1/payments/confirm',
      {
        paymentKey,
        orderId,
        amount,
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.TOSS_CLIENT_SECRET}:`,
          ).toString('base64')}`,
        },
      },
    )

    // 성공이면 Payment 및 Booking 데이터 생성

    if (payment) {
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments`, {
        orderId: orderId,
        paymentKey: paymentKey,
        amount: amount,
        status: payment.status,
        method: payment.method,
        receiptUrl: payment?.receipt?.url,
        approvedAt: payment?.approvedAt,
        bookingStatus: 'SUCCESS',
        cardNumber: payment?.card?.number,
        type: payment?.type,
        mid: payment?.mId,
        requestedAt: payment?.requestedAt,
        cardType: payment?.card?.cardType,
        checkoutUrl: payment?.checkout?.url,
      })
    }

    return {
      payment: payment,
    }
  } catch (err: any) {
    console.error('err', err)

    await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments`, {
      orderId: orderId,
      paymentKey: paymentKey,
      amount: amount,
      failureCode: err.code,
      failureMessage: err.message,
      bookingStatus: 'FAILED',
    })

    return {
      redirect: {
        destination: `/payments/fail?code=${err.code}&message=${err.message}`,
      },
    }
  }
}
