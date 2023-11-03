export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/users/mypage',
    '/users/info',
    '/users/edit',
    '/users/likes',
    '/users/bookings',
    '/users/bookings/:id',
    '/payments',
    '/payments/success',
    '/payments/fail',
    '/rooms/register/:path*',
  ],
}
