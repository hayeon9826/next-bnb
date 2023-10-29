'use client'

import axios from 'axios'
import dayjs from 'dayjs'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

// https://docs.tosspayments.com/reference#payment-객체
interface Payment {
  orderName: string
  approvedAt: string
  receipt: {
    url: string
  }
  totalAmount: number
  method: '카드' | '가상계좌' | '계좌이체'
}

export default function SuccessPage() {
  const [paymentData, setPaymentData] = useState<Payment | null>(null)
  const searchParams = useSearchParams()
  const paymentKey = searchParams.get('paymentKey')
  const orderId = searchParams.get('orderId')
  const amount = searchParams.get('amount')

  const getPaymentData = async () => {
    try {
      const { data: payment } = await axios.post<Payment>(
        'https://api.tosspayments.com/v1/payments/confirm',
        {
          paymentKey,
          orderId,
          amount,
        },
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              `test_sk_PBal2vxj81yQwB2qb7oK85RQgOAN:`,
            ).toString('base64')}`,
          },
        },
      )
      console.log(payment)
      setPaymentData(payment)
    } catch (err: any) {
      console.error('err', err)

      return {
        redirect: {
          destination: `/fail?code=${err.code}&message=${err.message}`,
          permanent: false,
        },
      }
    }
  }

  //   useEffect(() => {
  //     async function getdata() {
  //       await getPaymentData()
  //     }
  //     getdata()
  //   }, [])

  return (
    <main>
      <h1>결제 성공</h1>
      <p>주문: {paymentData?.orderName}</p>
      <p>결제 수단: {paymentData?.method}</p>
      <p>결제 금액: {paymentData?.totalAmount.toLocaleString()}원</p>
      <p>
        결제 일시:{' '}
        {dayjs(paymentData?.approvedAt).format('YYYY-MM-DD HH:MM:ss')}
      </p>
      <p>
        <a href={paymentData?.receipt.url}>영수증</a>
      </p>
    </main>
  )
}
