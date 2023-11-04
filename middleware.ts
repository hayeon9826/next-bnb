export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/users/mypage',
    '/users/info',
    '/users/edit',
    '/users/likes',
    '/users/rooms',
    '/users/bookings/:path*',
    '/payments/:path*',
    '/rooms/register/:path*',
  ],
}
