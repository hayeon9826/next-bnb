export default function Footer() {
  return (
    <footer className="bg-gray-50 py-2">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between border-b-gray-200 border-b">
        <span className="text-xs text-gray-800 sm:text-center">
          © 2023 <span className="hover:underline">nextbnb</span>. All Rights
          Reserved.
        </span>
        <ul className="flex flex-wrap items-center text-xs text-gray-800 mt-2 sm:mt-0">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              개인정보 처리방침
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              이용약관
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              공지사항
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              회사 세부정보
            </a>
          </li>
        </ul>
      </div>
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between border-b-gray-200 border-b">
        <span className="text-xs text-gray-800 sm:text-center font-semibold">
          자주찾는 메뉴
        </span>
        <ul className="flex flex-wrap items-center text-xs text-gray-800 mt-2 sm:mt-0">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              로그인
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              회원가입
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              FAQ
            </a>
          </li>
        </ul>
      </div>
      <div className="text-[10px] text-gray-400 mx-auto max-w-screen-xl p-4">
        웹사이트 제공자: NextBnb | 이사: Next Bnb | 사업자 등록 번호: 없음 |
        연락처: test@nextbnb.com, 웹사이트 | 호스팅 서비스 제공업체: vercel |
        nextbnb는 통신판매 중개자로 nextbnb 플랫폼을 통하여 게스트와 호스트
        사이에 이루어지는 통신판매의 당사자가 아닙니다. nextbnb 플랫폼을 통하여
        예약된 숙소, 체험, 호스트 서비스에 관한 의무와 책임은 해당 서비스를
        제공하는 호스트에게 있습니다.
      </div>
    </footer>
  )
}
