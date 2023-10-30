'use client'

import {
  PaymentWidgetInstance,
  loadPaymentWidget,
} from '@tosspayments/payment-widget-sdk'
import { nanoid } from 'nanoid'
import { toast } from 'react-hot-toast'
import { useAsync } from 'react-use'

import { useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Loader } from '@/components/Loader'
import axios from 'axios'

/** @doc 토스 페이먼츠 결제 구현 참고: https://codesandbox.io/p/sandbox/payment-widget-nextjs-ts-sample-9yv4vx?file=%2Fpages%2Findex.tsx%3A14%2C43 **/

const clientKey = 'test_ck_ALnQvDd2VJxlmO25aWae8Mj7X41m'

export default function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session } = useSession()
  const price = searchParams.get('totalAmount') || '0'
  const totalDays = searchParams.get('totalDays') || '0'
  const roomTitle = searchParams.get('roomTitle') || 'nextBnB 숙박예약'
  const customerKey = searchParams.get('customerKey') || nanoid()
  const bookingId = searchParams.get('bookingId')
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null)
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance['renderPaymentMethods']
  > | null>(null)

  useAsync(async () => {
    // ------  결제위젯 초기화 ------
    // 비회원 결제에는 customerKey 대신 ANONYMOUS를 사용하세요.
    const paymentWidget = await loadPaymentWidget(clientKey, customerKey) // 회원 결제
    // ------  결제위젯 렌더링 ------
    // https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      '#payment-widget',
      { value: parseInt(price) },
      // 렌더링하고 싶은 멀티 결제 UI의 variantKey
      // 결제 수단 및 스타일이 다른 멀티 UI를 직접 만들고 싶다면 계약이 필요해요.
      // https://docs.tosspayments.com/guides/payment-widget/admin#멀티-결제-ui
      { variantKey: 'DEFAULT' },
    )

    // ------  이용약관 렌더링 ------
    // https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자
    paymentWidget.renderAgreement('#agreement')

    paymentWidgetRef.current = paymentWidget
    paymentMethodsWidgetRef.current = paymentMethodsWidget
  }, [])

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current
    if (paymentMethodsWidget == null) {
      return
    }

    // ------ 금액 업데이트 ------
    // https://docs.tosspayments.com/reference/widget-sdk#updateamount결제-금액
    paymentMethodsWidget.updateAmount(parseInt(price))
  }, [price])

  return (
    <div className="max-w-2xl mx-auto px-4 my-20">
      <div className="flex flex-col gap-2 mt-4">
        <h1 className="text-lg md:text-2xl font-semibold">확인 및 결제</h1>
        <div className="text-gray-600">
          결제 수단을 선택하고 결제를 진행해주세요. 환불금은 예약 취소 후 2~3일
          내에 결제한 카드로 입금됩니다. 동의하시는 경우에만 아래 버튼을 눌러
          예약을 결제하세요.
        </div>
        {(paymentWidgetRef === null || paymentMethodsWidgetRef === null) && (
          <Loader />
        )}
        <div id="payment-widget" className="w-full" />
        <div id="agreement" className="w-full" />
        <button
          onClick={async () => {
            const paymentWidget = paymentWidgetRef.current

            try {
              // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
              // https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보

              // ## Q. 결제 요청 후 계속 로딩 중인 화면이 보인다면?
              // 아직 결제 요청 중이에요. 이어서 요청 결과를 확인한 뒤, 결제 승인 API 호출까지 해야 결제가 완료돼요.
              // 코드샌드박스 환경에선 요청 결과 페이지(`successUrl`, `failUrl`)로 이동할 수가 없으니 유의하세요.
              const uniqueOrderId = nanoid()

              await paymentWidget
                ?.requestPayment({
                  orderId: uniqueOrderId,
                  orderName: `${roomTitle?.slice(0, 10)}_${totalDays}박`,
                  customerName: session?.user?.name || '익명',
                  customerEmail: session?.user?.email || '',
                  // successUrl: `${window.location.origin}/payments/success`,
                  // failUrl: `${window.location.origin}/payments/fail`,
                })
                .then(async function (data) {
                  // 성공 처리: 결제 승인 API를 호출하세요
                  // 결제창 입력 완료시 payment 데이터 생성
                  const res = await axios.post('/api/payments', {
                    bookingId: bookingId,
                    amount: price,
                    status: 'IN_PROGRESS',
                    orderId: uniqueOrderId,
                    orderName: `${roomTitle?.slice(0, 10)}_${totalDays}박`,
                  })

                  if (res?.status === 200 && data) {
                    router.replace(
                      `/payments/success?paymentKey=${data.paymentKey}&orderId=${data.orderId}&amount=${data.amount}`,
                    )
                  }
                })
                .catch(function (error) {
                  // 에러 처리
                  toast.error(
                    error?.message || '문제가 생겼습니다. 다시 시도해주세요.',
                  )
                })
            } catch (error) {
              // 에러 처리하기
              console.error(error)
            }
          }}
          className="mt-8 bg-rose-600 hover:bg-rose-500 text-white rounded-md px-5 py-2.5"
        >
          결제하기
        </button>
      </div>
    </div>
  )
}
