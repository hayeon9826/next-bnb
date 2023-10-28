import { RoomType } from '@/interface'
import { BsShieldFillCheck, BsShieldLockFill } from 'react-icons/bs'
import { BiSolidMedal } from 'react-icons/bi'
import { AiFillStar } from 'react-icons/ai'
import Link from 'next/link'

export default function HostInfoSection({ data }: { data: RoomType }) {
  return (
    <div className="border-b border-gray-300 py-8 px-4 text-gray-800">
      <div className="flex gap-4 items-center">
        <img
          src={data?.user?.image || '/images/logo.png'}
          alt="logo"
          width={50}
          height={50}
          className="rounded-full shadow"
        />
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-xl">
            호스트: {data?.user?.name || '사용자'}님
          </h1>
          <div className="text-gray-500 text-sm">
            회원 가입일: {data?.user?.createdAt}
          </div>
        </div>
      </div>
      <div className="mt-4 flex gap-4 items-center">
        <div className="flex gap-3 items-center">
          <AiFillStar />
          후기 100개
        </div>
        <div className="flex gap-3 items-center">
          <BsShieldFillCheck />
          본인 인증 완료
        </div>
        <div className="flex gap-3 items-center">
          <BiSolidMedal />
          슈퍼호스트
        </div>
      </div>
      <div className="mt-8">
        <h1 className="font-semibold">
          {data?.user?.name || '사용자'}님은 슈퍼호스트입니다.
        </h1>
        <div className="max-w-lg mt-2">
          슈퍼호스트는 풍부한 경험과 높은 평점을 자랑하며 게스트가 숙소에서
          편안히 머무를 수 있도록 최선을 다하는 호스트입니다.
        </div>
        <div className="mt-8">응답률: 100%</div>
        <div className="mt-4">응답 시간: 1시간 이내</div>
      </div>
      <div className="mt-8">
        <button className="border border-gray-700 font-semibold rounded-lg px-6 py-4 flex items-center gap-4 hover:bg-black/5">
          <Link href={`mailto:${data?.user?.email}`}>호스트에게 연락하기</Link>
        </button>
      </div>
      <div className="mt-4 flex gap-4 items-center max-w-xs">
        <BsShieldLockFill className="text-xl md:text-3xl text-rose-500" />
        <div className="text-gray-500 text-xs ">
          안전한 결제를 위해 nextBnb 웹사이트나 앱 외부에서 송금하거나 대화를
          나누지 마세요.
        </div>
      </div>
    </div>
  )
}
