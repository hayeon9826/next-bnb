import SubmitButton from '@/components/Booking/SubmitButton'
import { BLUR_DATA_URL } from '@/constants'
import { RoomType } from '@/interface'
import Image from 'next/image'

export interface BookingParamsProps {
  params: { id: string }
  searchParams: {
    checkIn: string
    checkOut: string
    guestCount: string
    totalAmount: string
    totalDays: string
  }
}

export default async function BookingPage({
  params,
  searchParams,
}: BookingParamsProps) {
  const { id } = params
  const { checkIn } = searchParams
  const { checkOut } = searchParams
  const { guestCount } = searchParams
  const { totalAmount } = searchParams
  const { totalDays } = searchParams
  const data: RoomType = await getData(id)

  return (
    <div className="my-28 max-w-6xl mx-auto px-4">
      <div className="mt-32 relative">
        <h1 className="font-semibold text-xl md:text-3xl">확인 및 결제</h1>
        <div className="grid md:grid-cols-2 gap-20">
          <div className="flex flex-col gap-6 mt-8 pb-8">
            <div className="flex flex-col gap-6 border-b">
              <h2 className="text-lg md:text-2xl font-semibold">예약 정보</h2>
              <div className="flex justify-between items-center">
                <div>
                  <h3>날짜</h3>
                  <div className="text-gray-800 text-sm mt-1">
                    {checkIn} ~{checkOut}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center pb-6">
                <div>
                  <h3>게스트</h3>
                  <div className="text-gray-800 text-sm mt-1">
                    게스트 {guestCount}명
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6 border-b pb-8">
              <h2 className="text-lg md:text-2xl font-semibold">
                결제 방식 확인하기
              </h2>
              <div className="rounded-md border-black p-4 border-2 cursor-pointer hover:bg-black/5">
                <h3 className="font-semibold">전액결제</h3>
                <div className="text-gray-800 text-sm mt-1">
                  {`총액 ₩${parseInt(
                    totalAmount,
                  ).toLocaleString()}를 결제하세요.`}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6 border-b pb-8">
              <h2 className="text-lg md:text-2xl font-semibold">결제 수단</h2>
              <div className="rounded-md border-black p-4 border-2 cursor-pointer hover:bg-black/5">
                신용/체크카드, 네이버페이, 카카오페이, 페이코, 토스페이,
                가상계좌, 휴대폰, 퀵계좌이체, 삼성페이, 쓱페이, 엘페이,
                문화상품권
              </div>
            </div>
            <div className="flex flex-col gap-6 border-b pb-8">
              <h2 className="text-lg md:text-2xl font-semibold">환불 정책</h2>
              <div>
                <b>숙박 7일 전까지 무료로 취소하실 수 있습니다.</b> 그 후에
                취소하면 예약 대금이 환불되지 않습니다.
              </div>
            </div>
            <div className="flex flex-col gap-6 border-b pb-8">
              <h2 className="text-lg md:text-2xl font-semibold">기본 규칙</h2>
              <div>
                훌륭한 게스트가 되기 위한 몇 가지 간단한 규칙을 지켜주실 것을
                모든 게스트에게 당부드리고 있습니다.
                <ul className="list-disc mt-4 px-4">
                  <li>숙소 이용규칙을 준수하세요.</li>
                  <li>호스트의 집도 자신의 집처럼 아껴주세요.</li>
                </ul>
              </div>
            </div>
            <div className="text-xs text-gray-600">
              아래 버튼을 선택하면{' '}
              <span className="underline font-semibold">
                호스트가 설정한 숙소 이용규칙, 게스트에게 적용되는 기본 규칙,
                nextBnb 재예약 및 환불 정책
              </span>
              에 동의하며, 피해에 대한 책임이 본인에게 있을 경우 nextBnb가
              <span className="underline font-semibold">
                {' '}
                결제 수단으로 청구
              </span>
              의 조치를 취할 수 있다는 사실에 동의하는 것입니다.
            </div>
            <SubmitButton roomTitle={data.title} />
          </div>
          <div className="rounded-md border border-gray-300 p-6 max-h-[480px]">
            <div className="flex border-b gap-4 pb-6">
              <Image
                src={data?.images?.[0] || '/images/logo.png'}
                width={100}
                height={100}
                alt="room img"
                className="rounded-md"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-xs text-gray-500">{data?.bedroomDesc}</p>
                  <h1 className="text-sm">{data?.title}</h1>
                </div>
                <div className="text-xs text-gray-500">
                  후기 {data?.comments?.length}개
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 border-b pb-6">
              <h1 className="text-lg md:text-xl mt-4">요금 세부정보</h1>
              <div className="flex justify-between gap-4 text-gray-600">
                <div>
                  {`₩${data?.price?.toLocaleString()}`} x{totalDays}박 (
                  {guestCount}명)
                </div>
                <div>{`₩${parseInt(totalAmount).toLocaleString()}`}</div>
              </div>
              <div className="flex justify-between gap-4 text-gray-600">
                <div className="underline">nextBnb 서비스 수수료</div>
                <div>₩0</div>
              </div>
            </div>
            <div className="flex justify-between gap-4 border-b py-6">
              <div>총 합계 (KRW)</div>
              <div>{`₩${parseInt(totalAmount).toLocaleString()}`}</div>
            </div>
            <div className="py-6 text-sm text-gray-600">
              해외에서 결제가 처리되기 때문에 카드 발행사에서 추가 수수료를
              부과할 수 있습니다.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

async function getData(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/rooms?id=${id}`,
      {
        cache: 'no-store',
      },
    )

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    return res.json()
  } catch (e) {
    console.log(e)
  }
}
