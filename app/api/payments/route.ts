import { NextResponse } from 'next/server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

import prisma from '@/db'

interface PaymentProps {
  bookingId: string
  amount: string
  orderId: string
  orderName: string
  status:
    | 'READY'
    | 'IN_PROGRESS'
    | 'WAITING_FOR_DEPOSIT'
    | 'DONE'
    | 'CANCELED'
    | 'PARTIAL_CANCELED'
    | 'ABORTED'
    | 'EXPIRED'
}

interface PaymentCompleteProps {
  orderId: string
  paymentKey: string
  amount: string
  method: string
  receiptUrl: string
  approvedAt: string
  status:
    | 'READY'
    | 'IN_PROGRESS'
    | 'WAITING_FOR_DEPOSIT'
    | 'DONE'
    | 'CANCELED'
    | 'PARTIAL_CANCELED'
    | 'ABORTED'
    | 'EXPIRED'
  bookingStatus: 'CANCEL' | 'SUCCESS' | 'PENDING' | 'FAILED'
  failureCode: string
  failureMessage: string
  cardNumber: string
  type: 'NORMAL' | 'BILLING' | 'BRANDPAY'
  mid: string
  requestedAt: string
  cardType: string
  checkoutUrl: string
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const formData = await req.json()

  const { bookingId, amount, status, orderId, orderName }: PaymentProps =
    formData

  if (!session?.user) {
    return NextResponse.json(
      { error: 'unauthorized user' },
      {
        status: 401,
      },
    )
  }

  const payment = await prisma.payment.create({
    data: {
      bookingId: bookingId,
      amount: parseInt(amount),
      status: status,
      orderId: orderId,
      orderName: orderName,
    },
  })

  return NextResponse.json(payment, {
    status: 200,
  })
}

export async function PATCH(req: Request) {
  // 데이터 수정을 처리한다 (환불)
  const formData = await req.json()
  const {
    orderId,
    paymentKey,
    amount,
    method,
    receiptUrl,
    approvedAt,
    bookingStatus,
    status,
    failureCode,
    failureMessage,
    cardNumber,
    type,
    mid,
    requestedAt,
    cardType,
    checkoutUrl,
  }: PaymentCompleteProps = formData

  const payment = await prisma.payment.update({
    where: {
      orderId: orderId,
    },
    data: {
      paymentKey: paymentKey,
      method: method,
      receiptUrl: receiptUrl,
      approvedAt: approvedAt,
      amount: parseInt(amount),
      failureCode: failureCode,
      status: status,
      cardNumber: cardNumber,
      failureMessage: failureMessage,
      type: type,
      mId: mid,
      requestedAt: requestedAt,
      cardType: cardType,
      checkoutUrl: checkoutUrl,
    },
  })

  await prisma.booking.update({
    where: {
      id: payment.bookingId,
    },
    data: {
      status: bookingStatus,
    },
  })

  return NextResponse.json(payment, {
    status: 200,
  })
}
