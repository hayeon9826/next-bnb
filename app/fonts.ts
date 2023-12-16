import { Noto_Sans_KR, Roboto } from 'next/font/google'

export const roboto = Roboto({
  subsets: ['latin'], // preload에 사용할 subsets
  weight: ['100', '400', '700'],
  variable: '--roboto', // CSS 변수 방식으로 스타일을 지정할 경우에 사용
})

export const noto_sans = Noto_Sans_KR({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], // 가변 폰트가 아닌 경우, 사용할 fontWeight 배열
})
